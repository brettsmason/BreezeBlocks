/**
 * BLOCK: split-panel
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
	MediaPlaceholder,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
} = wp.editor;
const { Fragment } = wp.element;
const {
	IconButton,
	PanelBody,
	PanelRow,
	FormToggle,
	Toolbar,
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
registerBlockType( 'breezeblocks/block-split-panel', {
	title: __( 'Split Panel' ),
	icon: 'image-flip-horizontal',
	category: 'layout',
	keywords: [
		__( 'split panel' ),
	],
	attributes: {
		align: {
			type: 'string',
		},
		reversed: {
			type: 'boolean',
			default: false,
		},
		url: {
			type: 'string',
		},
		id: {
			type: 'number',
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
	edit( { attributes, setAttributes, className } ) {
		const { align, id, url, reversed } = attributes;

		const classes = classnames(
			className,
			'split-panel',
			reversed ? 'split-panel--reversed' : null,
			{ [ `align${ align }` ]: align }
		);

		const updateAlignment = ( nextAlign ) => setAttributes( { align: nextAlign } );

		const toggleReversed = () => setAttributes( { reversed: ! reversed } );

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
					<PanelBody>
						<PanelRow>
							<label
								htmlFor="reversed-form-toggle"
								className="blocks-base-control__label"
							>
								{ __( 'Reverse Layout' ) }
							</label>
							<FormToggle
								id="reversed-form-toggle"
								label={ __( 'Reverse Layout' ) }
								checked={ !! reversed }
								onChange={ toggleReversed }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ updateAlignment }
						controls={ [ 'wide', 'full' ] }
					/>

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

				<div className={ classes }>
					<div
						data-url={ url }
						className={ 'split-panel__image' }
						style={ { backgroundImage: 'url(' + url + ')' } }
					>
						{
							! url && (
								<MediaPlaceholder
									icon="format-image"
									labels={ {
										title: __( 'Image' ),
										name: __( 'an image' ),
									} }
									className={ className }
									onSelect={ onSelectImage }
									accept="image/*"
									type="image"
								/>
							)
						}
					</div>
					<div className={ 'split-panel__box' }>
						<div className={ 'split-panel__content' }>
							<InnerBlocks
								allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button' ] }
							/>
						</div>
					</div>
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
		const { align } = props.attributes;

		const classes = classnames(
			props.className,
			'split-panel',
			props.attributes.reversed ? 'split-panel--reversed' : null,
			{ [ `align${ align }` ]: align }
		);

		return (
			<div className={ classes }>
				<div
					className={ 'split-panel__image' }
					style={ { backgroundImage: 'url(' + props.attributes.url + ')' } }
				>
				</div>
				<div className={ 'split-panel__box' }>
					<div className={ 'split-panel__content' }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
