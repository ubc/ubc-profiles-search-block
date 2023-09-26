import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { FormTokenField } from '@wordpress/components';
import { __, _n } from '@wordpress/i18n';

const MAX_FETCHED_TERMS = 100;

// Folked from https://github.com/WordPress/gutenberg/blob/d623dc1195a4499134f51fc713215174a4e669a6/packages/block-library/src/query/edit/inspector-controls/taxonomy-controls.js#L15
// Helper function to get the term id based on user input in terms `FormTokenField`.
const getTermIdByTermValue = ( terms, termValue ) => {
	// First we check for exact match by `term.id` or case sensitive `term.name` match.
	const termId =
		termValue?.id || terms.find( ( term ) => term.name === termValue )?.id;
	if ( termId ) {
		return termId;
	}

	/**
	 * Here we make an extra check for entered terms in a non case sensitive way,
	 * to match user expectations, due to `FormTokenField` behaviour that shows
	 * suggestions which are case insensitive.
	 *
	 * Although WP tries to discourage users to add terms with the same name (case insensitive),
	 * it's still possible if you manually change the name, as long as the terms have different slugs.
	 * In this edge case we always apply the first match from the terms list.
	 */
	const termValueLower = termValue.toLocaleLowerCase();
	return terms.find(
		( term ) => term.name.toLocaleLowerCase() === termValueLower
	)?.id;
};

/**
 * Folked from https://github.com/WordPress/gutenberg/blob/e9ac336f71596f2da44a73b0dcf04d495c9f7fb9/packages/block-library/src/query/utils.js#L120
 * @param {string} postType post type
 * @returns {array} 
 */
export const useTaxonomies = ( postType ) => {
	const taxonomies = useSelect(
		( select ) => {
			const { getTaxonomies } = select( coreStore );
			const filteredTaxonomies = getTaxonomies( {
				type: postType,
				per_page: -1,
				context: 'view',
			} );
			return filteredTaxonomies;
		},
		[ postType ]
	);
	return taxonomies;
};  

//Folked from https://github.com/WordPress/gutenberg/blob/d623dc1195a4499134f51fc713215174a4e669a6/packages/block-library/src/query/edit/inspector-controls/taxonomy-controls.js#L84
export const TaxonomyItem = ( { taxonomy_label, taxonomy_slug, value, onChange, term_value_type } ) => {
	const { terms } = useTaxonomyTerms( taxonomy_slug );

	if ( ! terms?.length ) {
		return null;
	}

	const onTermsChange = ( newTermValues ) => {
		const termIds = new Set();
        const termValues = new Set();
		for ( const termValue of newTermValues ) {
			const termId = getTermIdByTermValue( terms, termValue );

			if ( termId ) {
				termIds.add( termId );
                // The FormTokenField on change event is doing some strange thing. All the values inside the array other than the last one are returned as object.
                termValues.add( termValue.value ? termValue.value : termValue );
			}
		}
        
		'id' === term_value_type ? onChange( Array.from( termIds ) ) : onChange( Array.from( termValues ) );
	};

    // Selects only the existing term ids in proper format to be
	// used in `FormTokenField`. This prevents the component from
	// crashing in the editor, when non existing term ids were provided.
	const inputValue = value
    .map( ( termId ) => terms.find( ( t ) => 'id' === term_value_type ? t.id === termId : t.name === termId ) )
    .filter( Boolean )
    .map( ( term ) => ( { id: term.id, value: term.name } ) );

	return (
		<div className="block-library-query-inspector__taxonomy-control">
			<FormTokenField
				label={ taxonomy_label }
				value={ inputValue }
				suggestions={ terms.map( ( t ) => t.name ) }
				onChange={ onTermsChange }
			/>
		</div>
	);
}

//Folked from https://github.com/WordPress/gutenberg/blob/d623dc1195a4499134f51fc713215174a4e669a6/packages/block-library/src/query/edit/inspector-controls/taxonomy-controls.js#L38
const useTaxonomyTerms = ( slug ) => {
	return useSelect(
		( select ) => {
			const terms = select( coreStore ).getEntityRecords(
				'taxonomy',
				slug,
				{ context: 'view', per_page: MAX_FETCHED_TERMS }
			);
			return { terms };
		},
		[ slug ]
	);
};