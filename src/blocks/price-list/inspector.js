/**
 * External dependencies
 */
import { __ } from 'wp.i18n';

/**
* WordPress dependencies
*/
const { Component } = wp.element;
const { SelectControl, PanelBody } = wp.components;
const { InspectorControls, PanelColorSettings } = wp.editor;

class Inspector extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const { titleTag } = this.props.attributes;
		const { textColor, setTextColor, setAttributes } = this.props;

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'getwid')} initialOpen={true}>
					<SelectControl
						label={__('Title Tag', 'getwid')}
						value={titleTag}
						options={[
							{ value: 'p',  label: __( 'Paragraph', 'getwid' ) },
							{ value: 'h2', label: __( 'Heading 2', 'getwid' ) },
							{ value: 'h3', label: __( 'Heading 3', 'getwid' ) },
							{ value: 'h4', label: __( 'Heading 4', 'getwid' ) },
							{ value: 'h5', label: __( 'Heading 5', 'getwid' ) },
							{ value: 'h6', label: __( 'Heading 6', 'getwid' ) },
						]}
						onChange={titleTag =>
							setAttributes({ titleTag })
						}
					/>
					<PanelColorSettings
						title={ __( 'Colors', 'getwid' ) }
						colorSettings={[
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color', 'getwid' )
							}
						]}
						initialOpen={true}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

export default Inspector;