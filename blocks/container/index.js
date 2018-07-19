/**
 * Block dependencies
 */
import './style.scss';
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
} = wp.editor;

/**
 * Register block
 */
registerBlockType(
    'breezeblocks/container',
    {
        title: __( 'Container' ),
        description: __( 'A container with background options for nesting other blocks.' ),
        category: 'layout',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'align-center',
        },   
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
            },
            textColor: {
                type: 'string',
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
                const { attributes: { align }, className, setAttributes, backgroundColor, textColor, setBackgroundColor, setTextColor } = props;

                const classes = classnames( className, {
                    'has-background': backgroundColor.value,
                    [ backgroundColor.class ]: backgroundColor.class,
                    [ textColor.class ]: textColor.class,
                    [ `align${ align }` ]: align
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
        save: props => {
            const { attributes: { align, backgroundColor, textColor }, className } = props;
            const backgroundClass = getColorClass( 'background-color', backgroundColor );
            const textClass = getColorClass( 'color', textColor );
            const classes = classnames( className, {
                [ `align${ align }` ]: align,
                'has-background': backgroundColor.value,
                [ textClass ]: textClass,
                [ backgroundClass ]: backgroundClass,
            } );

            return (
                <div className={ classes }>
                    <div className={ 'wp-block-breezeblocks-container__content' }>
                        <InnerBlocks.Content />
                    </div>
			    </div>
            );
        },
    },
);
