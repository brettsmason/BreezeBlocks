/**
 * BLOCK: Timeline Item
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import accordionItem from './accordion-item';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;
const { Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'breezeblocks/accordion-item', {
	title: __( 'Accordion Item' ),
	icon: 'menu',
	category: 'layout',
	keywords: [
		__( 'Accordion Item' ),
	],
	parent: [ 'breezeblocks/accordion' ],
	attributes: {
		title: {
			type: 'string',
			source: 'children',
			selector: '.accordion__title',
		},
		id: {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: accordionItem,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { attributes: { title, id } } = props;

		return (
			<Fragment>
				<dt className={ 'accordion__heading' }>
					<button
						className={ 'accordion__trigger js-badger-accordion-header' }
					>
						<RichText.Content
							tagName="div"
							className={ 'accordion__title' }
							value={ title }
						/>
					</button>
				</dt>
				<dd
					className={ 'accordion__panel badger-accordion__panel js-badger-accordion-panel' }
				>
					<div className={ 'accordion__panel-inner js-badger-accordion-panel-inner' }>
						<InnerBlocks.Content />
					</div>
				</dd>
			</Fragment>
		);
	},
} );
