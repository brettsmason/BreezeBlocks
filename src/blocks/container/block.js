/**
 * BLOCK: breezeblocks
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
registerBlockType( 'breezeblocks/container', {
	title: __( 'Container' ),
	description: __( 'A container with background options for nesting other blocks.' ),
	icon: 'align-center',
	category: 'layout',
	keywords: [
		__( 'Container' ),
		__( 'Section' ),
	],
	attributes: {
		align: {
			type: 'string',
			default: 'full',
		},
		backgroundColor: {
			type: 'string',
			default: '',
		},
		textColor: {
			type: 'string',
			default: '',
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
	edit: withColors( 'backgroundColor', 'textColor' )(
		function( props ) {
			const { attributes: { align }, className, setAttributes, backgroundColor, textColor, setBackgroundColor, setTextColor } = props;

			const classes = classnames( className, {
				'has-background': backgroundColor.value,
				[ backgroundColor.class ]: backgroundColor.class,
				[ textColor.class ]: textColor.class,
				[ `align${ align }` ]: align,
			} );

			return (
				<Fragment>
					<BlockControls>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ align => setAttributes( { align } ) }
							controls={ [ 'wide', 'full' ] }
						/>
					</BlockControls>

					<InspectorControls>
						<PanelColor
							colorValue={ backgroundColor.value }
							title={ __( 'Background Color' ) }
							onChange={ setBackgroundColor }
						/>
						<PanelColor
							colorValue={ textColor.value }
							title={ __( 'Text Color' ) }
							onChange={ setTextColor }
						/>
					</InspectorControls>

					<div className={ classes }>
						<div className={ 'wp-block-breezeblocks-container__content' }>
							<InnerBlocks />
						</div>
					</div>
				</Fragment>
			);
		}
	),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { attributes: { align, backgroundColor, textColor }, className } = props;
		const backgroundClass = getColorClass( 'background-color', backgroundColor );
		const textClass = getColorClass( 'color', textColor );
		const classes = classnames( className, {
			[ `align${ align }` ]: align,
			'has-background': backgroundColor.value,
			[ backgroundClass ]: backgroundClass,
		} );
		const contentClasses = classnames( 'wp-block-breezeblocks-container__content', {
			[ textClass ]: textClass,
		} );

		return (
			<div className={ classes }>
				<div className={ contentClasses }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
