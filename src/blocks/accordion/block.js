/**
 * BLOCK: Timeline
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import external dependencies.
import classnames from 'classnames';
import times from 'lodash/times';
import memoize from 'memize';

const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;

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
registerBlockType( 'breezeblocks/accordion', {
	title: __( 'Accordion' ),
	icon: 'editor-justify',
	category: 'layout',
	keywords: [
		__( 'Accordion' ),
	],

	attributes: {
		accordionItems: {
			type: 'number',
			default: 2,
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { attributes: { accordionItems }, className, setAttributes } = props;
		const classes = classnames( className, 'accordion badger-accordion js-badger-accordion' );

		const getAccordionItemsTemplate = memoize( ( accordionItems ) => {
			return times( accordionItems, () => [ 'breezeblocks/accordion-item' ] );
		} );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Items' ) }
							value={ accordionItems }
							onChange={ ( accordionItems ) => {
								setAttributes( {
									accordionItems: accordionItems,
								} );
							} }
							min={ 2 }
							max={ 10 }
						/>
					</PanelBody>
				</InspectorControls>

				<dl className={ classes }>
					<InnerBlocks
						template={ getAccordionItemsTemplate( accordionItems ) }
						allowedBlocks={ [ 'galvblocks/accordion-item' ] }
					/>
				</dl>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { className } = props;
		const classes = classnames( className, 'accordion' );

		return (
			<dl className={ classes }>
				<InnerBlocks.Content />
			</dl>
		);
	},
} );
