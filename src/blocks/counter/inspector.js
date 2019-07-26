import { __ } from 'wp.i18n';

const { Component } = wp.element;

const {
	InspectorControls,
	PanelColorSettings

} = wp.editor;

const {
	CheckboxControl,
	TextControl,
	PanelBody,
	SelectControl,

} = wp.components;

class Inspector extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				start,
				end,
				decimalPlaces,
				duration,

				useEasing,
				useGrouping,
				separator,
				decimal,
				easing,
				numerals
			},
			setAttributes,

			textColor,
			setTextColor
			
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'getwid' ) } initialOpen={ true }>
					<TextControl
						type={ 'number' }
						label={__('Start', 'getwid')}						
						value={ isNaN(start) ? 0 : parseFloat(start) }
						onChange={ value => {
							setAttributes({ start: value.toString() })
						}}
					/>
					<TextControl
						type={ 'number' }
						label={__('End', 'getwid')}						
						value={ isNaN(end) ? 100 : parseFloat(end) }
						onChange={ value => { 
							setAttributes({ end: value.toString() })
						}}
					/>
					<TextControl
						type={ 'number' }
						label={__('Animation Duration', 'getwid')}						
						value={ isNaN(duration) ? 3 : parseInt(duration) }
						onChange={ value => {
							setAttributes({ duration: value.toString() })
						}}
					/>
					<PanelBody title={ __( 'Advanced Settings', 'getwid' ) } initialOpen={ false }>
						<CheckboxControl
							label={__('Smooth Animation', 'getwid')}
							checked={ useEasing === 'true' ? true : false }
							onChange={ value => {
								setAttributes({ useEasing: value ? 'true' : 'false' })
							}}
						/>
						<SelectControl
							label={__('Animation Effect', 'getwid')}
							value={ easing === undefined ? 'outExpo' : easing }
							onChange={easing => {
								setAttributes({ easing })
							}}
							options={[
								{ value: 'outExpo',    label: 'OutExpo' },
								{ value: 'outQuintic', label: 'OutQuintic' },
								{ value: 'outCubic',   label: 'OutCubic' }
							]}
						/>
						<CheckboxControl
							label={__('Display Thousands Separator', 'getwid')}
							checked={ useGrouping === 'true' ? true : false }
							onChange={ value => { 
								setAttributes({ useGrouping: value ? 'true' : 'false' })
							}}
						/>
						<TextControl
							label={__('Thousands Separator', 'getwid')}
							value={ separator === undefined ? _x(',', 'Thousands separator', 'getwid') : separator }
							onChange={ separator => {
								setAttributes({ separator })
							}}
						/>
						<TextControl
							type={ 'number' }
							label={__('Decimal Places', 'getwid')}						
							value={ isNaN(decimalPlaces) ? 0 : parseInt(decimalPlaces) }
							onChange={ value => {
								setAttributes({ decimalPlaces: value.toString() })
							}}
						/>
						<TextControl
							label={__('Decimal Separator', 'getwid')}
							value={ decimal === undefined ? _x('.', 'Decimal separator', 'getwid') : decimal }
							onChange={ decimal => {
								setAttributes({ decimal })
							}}
						/>
						<SelectControl
							label={__('Numerals', 'getwid')}
							value={ numerals === undefined ? 'default' : numerals }
							onChange={numerals => {
								setAttributes({ numerals })
							}}
							options={[
								{ value: 'default', 	   label: __('Default', 	   'getwid') },
								{ value: 'eastern_arabic', label: __('Eastern Arabic', 'getwid') },
								{ value: 'farsi', 		   label: __('Farsi', 		   'getwid') }
							]}
						/>
					</PanelBody>
					<PanelColorSettings
						title={__('Color', 'getwid')}
						colorSettings={[{
								value: textColor.color,
								onChange: setTextColor,
								label: __('Color', 'getwid')
							}]
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}	
}

export default Inspector;