/**
 * BLOCK: Timeline Item
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InnerBlocks, RichText } = wp.editor;
const { Fragment } = wp.element;
const { Component } = wp.element;

class accordionItem extends Component {

	componentDidMount() {
		const { attributes: { id }, setAttributes } = this.props;

		if ( id === undefined ) {
			setAttributes( { id: Math.random().toString( 36 ).substr( 2, 9 ) } );
		}
	}

	componentDidUpdate() {
		const { attributes: { id }, setAttributes } = this.props;

		// Init accordion here
	}

	render() {
		const { attributes: { title, id }, setAttributes } = this.props;

		return (
			<Fragment>
				<dt className={ 'accordion__heading' }>
					<div
						className={ 'accordion__trigger js-badger-accordion-header' }
					>
						<RichText
							className={ 'accordion__title' }
							tagName="div"
							placeholder={ __( 'Add title...' ) }
							onChange={ ( title ) => setAttributes( { title } ) }
							value={ title }
							formattingControls={ [] }
							keepPlaceholderOnFocus
						/>
					</div>
				</dt>

				<dd
					className={ 'accordion__panel' }
				>
					<div className={ 'accordion__panel-inner' }>
						<InnerBlocks
							// template={ [ [ 'core/paragraph', {} ] ] }
							allowedBlocks={ [
								'core/paragraph',
							] }
						/>
					</div>
				</dd>
			</Fragment>
		);
	}
}

export default accordionItem;
