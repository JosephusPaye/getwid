import GetwidStyleLengthControl from 'GetwidControls/style-length-control';

/**
 * Internal block libraries
 */
const {__} = wp.i18n;
const {Component} = wp.element;

const {
	InspectorControls,
	ColorPalette,
	FontSizePicker,
	PanelColorSettings
} = wp.editor;

const {
	IconButton,
	PanelBody,
	RangeControl,
	ToggleControl,
	Toolbar,
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor() {
		super(...arguments);
	}

	render() {

		const {
			attributes: {
				backgroundId,
				backgroundUrl,
				backgroundType,
				title,
				text,
				link,
				align,
				minHeight,
				verticalAlign,
				horizontalAlign,
				textColor,
				overlayColor,
				backgroundOpacity,
				blockAnimation,
				textAnimation,
			},
			setAttributes
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title={__('Alignment', 'getwid')} initialOpen={false}>
					<GetwidStyleLengthControl
						label={__('Min Height', 'getwid')}
						value={minHeight}
						units={[
							{label: 'px', value: 'px'},
							{label: 'vh', value: 'vh'},
							{label: 'vw', value: 'vw'},
							{label: '%', value: '%'}
						]}
						onChange={minHeight => setAttributes({minHeight})}
					/>
					<SelectControl
						label={__('Vertical Alignment', 'getwid')}
						value={verticalAlign !== undefined ? verticalAlign : 'center'}
						onChange={verticalAlign => setAttributes({verticalAlign})}
						options={[
							{value: 'top', label: __('Top', 'getwid')},
							{value: 'center', label: __('Middle', 'getwid')},
							{value: 'bottom', label: __('Bottom', 'getwid')},
						]}
					/>
					<SelectControl
						label={__('Horizontal Alignment', 'getwid')}
						value={horizontalAlign !== undefined ? horizontalAlign : 'center'}
						onChange={horizontalAlign => setAttributes({horizontalAlign})}
						options={[
							{value: 'left', label: __('Left', 'getwid')},
							{value: 'center', label: __('Center', 'getwid')},
							{value: 'right', label: __('Right', 'getwid')},
						]}
					/>
				</PanelBody>

				<PanelBody title={ __( 'Banner Settings', 'getwid' ) }>
					<PanelColorSettings
						title={ __( 'Colors', 'getwid' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: overlayColor,
								onChange: overlayColor => setAttributes({overlayColor}),
								label: __( 'Text Color', 'getwid' ),
							},
							{
								value: overlayColor,
								onChange: overlayColor => setAttributes({overlayColor}),
								label: __( 'Overlay Color', 'getwid' ),
							}
						] }
					>
						<RangeControl
							label={ __( 'Background Opacity', 'getwid' ) }
							value={ backgroundOpacity }
							onChange={backgroundOpacity => setAttributes({backgroundOpacity})}
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
					</PanelColorSettings>
				</PanelBody>

				<PanelBody title={__('Animation', 'getwid')} initialOpen={false}>
					<SelectControl
						label={__('Block animation', 'getwid')}
						value={blockAnimation}
						onChange={blockAnimation => setAttributes({blockAnimation})}
						options={[
							{value: 'style1', label: __('Style 1', 'getwid')},
							{value: 'style2', label: __('Style 2', 'getwid')},
							{value: 'style3', label: __('Style 3', 'getwid')},
							{value: 'style4', label: __('Style 4', 'getwid')},
							{value: 'style5', label: __('Style 5', 'getwid')},
							{value: 'style6', label: __('Style 6', 'getwid')},
						]}
					/>
					<SelectControl
						label={__('Text animation', 'getwid')}
						value={textAnimation}
						onChange={textAnimation => setAttributes({textAnimation})}
						options={[
							{value: 'none', label: __('None', 'getwid')},
							{value: 'text-opacity', label: __('Text opacity', 'getwid')},
							{value: 'text-opacity-top', label: __('Text opacity top', 'getwid')},
							{value: 'text-opacity-bottom', label: __('Text opacity bottom', 'getwid')},
							{value: 'text-opacity-left', label: __('Text opacity left', 'getwid')},
							{value: 'text-opacity-right', label: __('Text opacity right', 'getwid')},
							{value: 'text-opacity-zoom-in', label: __('Text opacity zoom-in', 'getwid')},
							{value: 'text-opacity-zoom-out', label: __('Text opacity zoom-out', 'getwid')},
						]}
					/>
				</PanelBody>				
			</InspectorControls>
		);
	}
}