/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const { selectedTaxonomySlug, selectedTerms } = attributes;

	return (
		<form id='profile-search-form' role="search" method="get" action="/">
			<label for="profile-search" className='visually-hidden'>Search profiles</label>
			<input type="search" id="profile-search" name="s" />
			{ 'post_tag' === selectedTaxonomySlug ? <input className='visually-hidden' type="text" name="tag" value={ selectedTerms.join(',') } /> : null }
			{ 'category' === selectedTaxonomySlug ? <input className='visually-hidden' type="text" name="cat" value={ selectedTerms.join(',') } /> : null }
			{ '' !== selectedTaxonomySlug ? <input type="text" className='visually-hidden' name="profilesearch" value="1" /> : null }
			<input value="Submit" type="submit" className="btn" />
		</form>
	);
}
