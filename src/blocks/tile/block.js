/**
 * BLOCK: Tile
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
const {
	getColorClass,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	PanelColor,
	withColors,
	UrlInput,
} = wp.editor;
const { Fragment } = wp.element;
const {
	IconButton,
	Toolbar,
	Dashicon,
	PanelBody,
	SelectControl,
} = wp.components;

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
registerBlockType( 'breezeblocks/tile', {
	title: __( 'Tile' ),
	icon: 'screenoptions',
	category: 'layout',
	keywords: [
		__( 'Tile' ),
	],
	attributes: {
		backgroundType: {
			type: 'string',
			default: 'color',
		},
		link: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
		url: {
			type: 'string',
		},
		id: {
			type: 'number',
		},
		ratio: {
			type: 'string',
			default: 'square',
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

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: withColors( 'backgroundColor', { textColor: 'color' } )(
		function( props ) {
			const { attributes: { url, id, link, ratio, backgroundType }, className, setAttributes, backgroundColor, textColor, setBackgroundColor, setTextColor, isSelected } = props;

			const classes = classnames( className, {
				'has-background': backgroundColor.value,
				[ backgroundColor.class ]: backgroundColor.class,
				[ textColor.class ]: textColor.class,
				[ `is-ratio-${ ratio }` ]: ratio,
			} );

			const onSelectImage = ( media ) => {
				if ( ! media || ! media.url ) {
					setAttributes( { url: undefined, id: undefined } );
					return;
				}
				setAttributes( { url: media.url, id: media.id } );
			};

			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Background Settings' ) }>
							<SelectControl
								label={ __( 'Background Type' ) }
								value={ backgroundType }
								options={ [
									{ value: 'color', label: __( 'Color' ) },
									{ value: 'image', label: __( 'Image' ) },
								] }
								onChange={ backgroundType => setAttributes( { backgroundType } ) }
							/>
						</PanelBody>

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

						<PanelBody title={ __( 'Layout Settings' ) }>
							<SelectControl
								label={ __( 'Ratio' ) }
								value={ ratio }
								options={ [
									{ value: 'square', label: __( 'Square' ) },
									{ value: '16by9', label: __( 'Widescreen' ) },
								] }
								onChange={ ratio => setAttributes( { ratio } ) }
							/>
						</PanelBody>
					</InspectorControls>

					<BlockControls>
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImage }
								type="image"
								value={ id }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit image' ) }
										icon="edit"
										onClick={ open }
									/>
								) }
							/>
						</Toolbar>
					</BlockControls>

					<div
						className={ classes }
						data-url={ url }
						style={ { backgroundImage: 'url(' + url + ')' } }
					>
						<div
							className={ 'wp-block-breezeblocks-tile__link' }
						>
							<div className={ 'wp-block-breezeblocks-tile__content' }>
								<InnerBlocks
									allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button', 'core/list' ] }
									template={ [
										[ 'core/heading' ],
										[ 'core/paragraph' ],
									] }
									templateLock={ false }
								/>
							</div>
						</div>
					</div>

					{ isSelected && (
						<form
							className={ 'core-blocks-button__inline-link' }
							onSubmit={ ( event ) => event.preventDefault() }
						>
							<Dashicon icon="admin-links" />
							<UrlInput
								className="editor-url-input"
								value={ link }
								onChange={ link => setAttributes( { link } ) }
							/>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
					) }
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
		const { attributes: { link, url, backgroundColor, textColor }, className } = props;

		const backgroundClass = getColorClass( 'background-color', backgroundColor );
		const textClass = getColorClass( 'color', textColor );
		const classes = classnames( className, {
			'has-background': backgroundColor.value,
			[ backgroundClass ]: backgroundClass,
			[ textClass ]: textClass,
		} );

		return (
			<div
				className={ classes }
				style={ { backgroundImage: 'url(' + url + ')' } }
			>
				<a
					className={ 'wp-block-breezeblocks-tile__link' }
					href={ link }
				>
					<div className={ 'wp-block-breezeblocks-tile__content' }>
						<InnerBlocks.Content />
					</div>
				</a>
			</div>
		);
	},
} );
