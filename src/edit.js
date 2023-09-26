/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { PanelBody, SelectControl } from '@wordpress/components';
import { useTaxonomies, TaxonomyItem } from './components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { selectedTaxonomySlug, selectedTerms } = attributes;
	const blockProps = useBlockProps();

	let taxonomies = useTaxonomies( 'post' );

	if( ! taxonomies ) {
		return null;
	}

	// We do not support custom taxonomies at the moment.
	taxonomies = taxonomies.filter( ( taxonomy ) => {
		return 'post_tag' === taxonomy.slug || 'category' === taxonomy.slug;
	});

	taxonomies = taxonomies.map( (taxonomy ) => {
		return { label: taxonomy.name, value: taxonomy.slug };
	})

	const getTaxonomyLabelBySlug = slug => {
		const taxonomy_slug = taxonomies.filter( tax => {
			return tax.value === slug;
		});

		return 1 === taxonomy_slug.length ? taxonomy_slug[0].label : '';
	}

	return (
		<div { ...blockProps }>
			<input
				className='btn btn-large btn-primary'
				type='search'
				placeholder='Search Profiles'
			/>
			<button>Search</button>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<SelectControl
						label="Select a Taxonomy"
						value={ selectedTaxonomySlug }
						options={ [
							{ label: '', value: '' },
							...taxonomies
						] }
						onChange={ ( newTaxonomy ) => {
							setAttributes( {
								selectedTaxonomySlug: newTaxonomy,
								selectedTerms: []
							} );
						} }
						help={ __(
							'Currently only support built-in taxonomies such as category and tag.'
						) }
						__nextHasNoMarginBottom
					/>
					<TaxonomyItem
						key={ selectedTaxonomySlug }
						taxonomy_label={ getTaxonomyLabelBySlug( selectedTaxonomySlug ) }
						taxonomy_slug={ selectedTaxonomySlug }
						value={ selectedTerms }
						term_value_type={ 'post_tag' === selectedTaxonomySlug ? 'slug' : 'id' }
						onChange={ terms => {
							setAttributes({
								selectedTerms: terms
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}