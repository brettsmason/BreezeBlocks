/**
 * BLOCK: Button Group
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import external dependencies.
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const {
	BlockControls,
	BlockAlignmentToolbar,
	getColorClass,
	InnerBlocks,
	InspectorControls,
	PanelColor,
	withColors,
} = wp.editor;

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
registerBlockType( 'breezeblocks/button-group', {
	title: __( 'Button Group' ),
	description: __( 'A container for buttons to allow inline groups of buttons.' ),
	icon: 'align-center',
	category: 'layout',
	keywords: [
		__( 'Button' ),
		__( 'Button Group' ),
	],
	attributes: {
		align: {
			type: 'string',
			default: 'center',
		},
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
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
		const { attributes: { align }, className, setAttributes } = props;

		const classes = classnames( className, {
			[ `is-align-${ align }` ]: align,
		} );

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ align => setAttributes( { align } ) }
						controls={ [ 'left', 'center', 'right' ] }
					/>
				</BlockControls>

				<div className={ classes }>
				<InnerBlocks
					allowedBlocks={ [ 'core/button' ] }
					template={ [
						[ 'core/button' ],
						[ 'core/button' ],
					] }
					templateLock={ false }
				/>
				</div>
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
		const { attributes: { align }, className } = props;
		const classes = classnames( className, {
			[ `is-align-${ align }` ]: align,
		} );

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
