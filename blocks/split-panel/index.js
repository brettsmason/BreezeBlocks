/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';
import classnames from 'classnames';

/**
 * Internal block libraries
 */
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
    MediaPlaceholder,
	MediaUpload,
} = wp.editor;
const {
	IconButton,
	PanelBody,
	PanelRow,
	FormToggle,
	Toolbar,
} = wp.components;

/**
 * Register block
 */
registerBlockType(
    'breezeblocks/split-panel',
    {
        title: __( 'Split Panel' ),
        description: __( 'A container with background options for nesting other blocks.' ),
        category: 'layout',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'image-flip-horizontal',
        },   
        keywords: [
            __( 'Split Panel' ),
            __( 'Half' ),
        ],
        attributes: {
            align: {
                type: 'string',
                default: 'full',
            },
            backgroundColor: {
                type: 'string',
            },
            textColor: {
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

        edit: withColors( 'backgroundColor', 'textColor' )(
            function( props ) {
                const { attributes: { align, reversed, url, id }, className, setAttributes, backgroundColor, textColor, setBackgroundColor, setTextColor } = props;

                const classes = classnames( className, {
                    'wp-block-breezeblocks-split-panel--reversed': reversed,
                    [ `align${ align }` ]: align,
                    'has-background': backgroundColor.value,
                    [ backgroundColor.class ]: backgroundColor.class,
                    [ textColor.class ]: textColor.class,
                } );

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
                        <BlockControls>
                            <BlockAlignmentToolbar
                                value={ align }
                                onChange={ align => setAttributes( { align } ) }
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

                        <div className={ classes }>
                            <div
                                data-url={ url }
                                className={ 'wp-block-breezeblocks-split-panel__image' }
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
                            <div className={ 'wp-block-breezeblocks-split-panel__box' }>
                                <div className={ 'wp-block-breezeblocks-split-panel__content' }>
                                    <InnerBlocks
                                        allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button' ] }
                                        // template={ [ 'core/heading', {} ] }
                                    />
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            }
        ),
        save: props => {
            const { attributes: { align, backgroundColor, textColor, url }, className } = props;
            const backgroundClass = getColorClass( 'background-color', backgroundColor );
            const textClass = getColorClass( 'color', textColor );
            const classes = classnames( className, {
                'split-panel--reversed': reversed,
                [ `align${ align }` ]: align,
                'has-background': backgroundColor.value,
                [ textClass ]: textClass,
                [ backgroundClass ]: backgroundClass,
            } );

            return (
                <div className={ classes }>
                    <div
                        className={ 'split-panel__image' }
                        style={ { backgroundImage: 'url(' + url + ')' } }
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
    },
);
