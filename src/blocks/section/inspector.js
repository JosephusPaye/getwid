/**
 * Inspector Controls
 */

import GetwidStyleLengthControl from './../../controls/style-length-control';
import GetwidAnimationSelectControl from './../../controls/animation-select-control'
import {pick} from "lodash";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const {
	InspectorControls,
	MediaUpload,
	MediaPlaceholder,
	PanelColorSettings
} = wp.editor;

const {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	CheckboxControl,
	withNotices
} = wp.components;

const ALLOWED_SLIDER_MEDIA_TYPES = [ 'image' ];
const ALLOWED_IMAGE_MEDIA_TYPES = ['image'];

/**
 * Create an Inspector Controls wrapper Component
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.onSelectSliderImages = this.onSelectSliderImages.bind( this );
	}

	render() {

		const {
			attributes: {
				paddingTop, paddingRight, paddingBottom, paddingLeft,
				marginTop, marginBottom, marginLeft, marginRight,
			},
			setAttributes
		} = this.props;

		return (
		<InspectorControls key="inspector">
			<PanelBody title={__('Padding', 'getwid')} initialOpen={false}>
				{
					this.hasPadding() &&
					<Button isLink isDestructive onClick={() => setAttributes({
						paddingTop: undefined,
						paddingBottom: undefined,
						paddingLeft: undefined,
						paddingRight: undefined
					})} >
						{__('reset', 'getwid')}
					</Button>
				}
				<GetwidStyleLengthControl
					label={__('Top', 'getwid')}
					value={paddingTop}
					onChange={paddingTop => {
						setAttributes({paddingTop});
					}}
				/>
				<GetwidStyleLengthControl
					label={__('Bottom', 'getwid')}
					value={paddingBottom}
					onChange={paddingBottom => {
						setAttributes({paddingBottom});
					}}
				/>
				<GetwidStyleLengthControl
					label={__('Left', 'getwid')}
					value={paddingLeft}
					onChange={paddingLeft => {
						setAttributes({paddingLeft});
					}}
				/>
				<GetwidStyleLengthControl
					label={__('Right', 'getwid')}
					value={paddingRight}
					onChange={paddingRight => {
						setAttributes({paddingRight});
					}}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Margin', 'getwid' ) } initialOpen={false}>
				{
					this.hasMargin() &&
					<Button isLink isDestructive onClick={() => setAttributes({
						marginTop: undefined,
						marginBottom: undefined,
						marginLeft: undefined,
						marginRight: undefined
					})} >
						{__('reset', 'getwid')}
					</Button>
				}
				<GetwidStyleLengthControl
					label={__('Top', 'getwid')}
					value={marginTop}
					onChange={marginTop => {
						setAttributes({marginTop});
					}}
					allowNegative
					allowAuto
				/>
				<GetwidStyleLengthControl
					label={__('Bottom', 'getwid')}
					value={marginBottom}
					onChange={marginBottom => {
						setAttributes({marginBottom});
					}}
					allowNegative
					allowAuto
				/>
				<GetwidStyleLengthControl
					label={__('Left', 'getwid')}
					value={marginLeft}
					onChange={marginLeft => {
						setAttributes({marginLeft});
					}}
					allowNegative
					allowAuto
				/>
				<GetwidStyleLengthControl
					label={__('Margin Right', 'getwid')}
					value={marginRight}
					onChange={marginRight => {
						setAttributes({marginRight});
					}}
					allowNegative
					allowAuto
				/>
			</PanelBody>
			{this.renderAlignmentSettings()}
			<PanelBody title={__('Background', 'getwid')} initialOpen={false}>
				{this.renderBackgoundColors()}
				{this.renderBackgroundImage()}
				{this.renderSliderSettings()}
				{this.renderVideoSettings()}
			</PanelBody>
			{this.renderForegroundSettings()}
			{this.renderDividersSettings()}
			{this.renderAnimationSettings()}
		</InspectorControls>
		);
	}

	hasPadding() {
		const {attributes: {paddingTop, paddingBottom, paddingLeft, paddingRight}} = this.props;
		return paddingTop !== undefined ||
			paddingBottom !== undefined ||
			paddingRight !== undefined ||
			paddingLeft !== undefined;
	}

	hasMargin() {
		const {attributes: {marginTop, marginBottom, marginLeft, marginRight}} = this.props;
		return marginTop !== undefined ||
			marginBottom !== undefined ||
			marginRight !== undefined ||
			marginLeft !== undefined;
	}

	hasAnimation(){
		const {attributes: {entranceAnimation, entranceAnimationDelay, entranceAnimationDuration}} = this.props;
		return entranceAnimation !== undefined ||
			entranceAnimationDelay !== undefined ||
			entranceAnimationDuration !== undefined;
	}

	renderBackgroundImage(){
		// Setup the attributes
		const {
			attributes: {
				backgroundImage, backgroundImagePosition,
				backgroundImageAttachment, backgroundImageRepeat, backgroundImageSize
			}, setAttributes
		} = this.props;

		return(
			<PanelBody title={__('Background Image', 'getwid')} initialOpen={false}>
				<MediaUpload
					onSelect={ backgroundImage => {
						setAttributes({
							backgroundImage: backgroundImage !== undefined ? pick(backgroundImage, ['alt', 'id', 'url']) : {}
						});
					} }
					value={ backgroundImage !== undefined ? backgroundImage.id : ''}
					allowedTypes={ALLOWED_IMAGE_MEDIA_TYPES}
					render={ ( { open } ) => (
						<BaseControl>
							<Button
								isDefault
								onClick={ open }
							>
								{__('Select Image', 'getwid')}
							</Button>
							{ !!backgroundImage &&
								<Fragment>
									<br />
									<Button onClick={ () => { setAttributes({backgroundImage: undefined}) } } isLink isDestructive>
										{ __( 'Remove', 'getwid' ) }
									</Button>
								</Fragment>
							}
						</BaseControl>
					) }
				/>
				{!!backgroundImage &&
					<Fragment>
						<SelectControl
							label={__('Position', 'getwid')}
							value={backgroundImagePosition !== undefined ? backgroundImagePosition : ''}
							onChange={backgroundImagePosition => setAttributes({backgroundImagePosition})}
							options={[
								{value: '', label: __('Center', 'getwid')},
								{value: 'top left', label: __('Top Left', 'getwid')},
								{value: 'top center', label: __('Top', 'getwid')},
								{value: 'top right', label: __('Top Right', 'getwid')},
								{value: 'center left', label: __('Left', 'getwid')},
								{value: 'center right', label: __('Right', 'getwid')},
								{value: 'bottom left', label: __('Bottom Left', 'getwid')},
								{value: 'bottom center', label: __('Bottom Center', 'getwid')},
								{value: 'bottom right', label: __('Bottom Right', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Attachment', 'getwid')}
							value={backgroundImageAttachment !== undefined ? backgroundImageAttachment : ''}
							onChange={backgroundImageAttachment => setAttributes({backgroundImageAttachment})}
							options={[
								/*Inherit*/
								{value: '', label: __('-', 'getwid')},
								{value: 'scroll', label: __('Scroll', 'getwid')},
								{value: 'fixed', label: __('Fixed', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Repeat', 'getwid')}
							value={backgroundImageRepeat !== undefined ? backgroundImageRepeat : ''}
							onChange={backgroundImageRepeat => setAttributes({backgroundImageRepeat})}
							options={[
								/*Inherit*/
								{value: '', label: __('-', 'getwid')},
								{value: 'no-repeat', label: __('No Repeat', 'getwid')},
								{value: 'repeat', label: __('Repeat', 'getwid')},
								{value: 'repeat-x', label: __('Repeat X', 'getwid')},
								{value: 'repeat-y', label: __('Repeat Y', 'getwid')},
								{value: 'space', label: __('Space', 'getwid')},
								{value: 'round', label: __('Round', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Size', 'getwid')}
							value={backgroundImageSize !== undefined ? backgroundImageSize : ''}
							onChange={backgroundImageSize => setAttributes({backgroundImageSize})}
							options={[
								/*Auto*/
								{value: '', label: __('-', 'getwid')},
								{value: 'cover', label: __('Cover', 'getwid')},
								{value: 'contain', label: __('Contain', 'getwid')},
							]}
						/>
					</Fragment>
				}
			</PanelBody>
		);
	}

	renderBackgoundColors(){
		// Setup the attributes
		const {
			attributes: {
				backgroundColor,
				backgroundGradientType, backgroundGradientFirstColor, backgroundGradientFirstColorLocation,
				backgroundGradientSecondColor,  backgroundGradientSecondColorLocation, backgroundGradientAngle,
			}, setAttributes
		} = this.props;

		return (
			<Fragment>
				<PanelColorSettings
					title={__('Background Color', 'getwid')}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: backgroundColor => setAttributes({backgroundColor}),
							label: __('Background Color', 'getwid')
						}
					]}
					initialOpen={false}
				/>
				<PanelBody title={__('Gradient', 'getwid')} initialOpen={false}>
					<SelectControl
						value={backgroundGradientType !== undefined ? backgroundGradientType : ''}
						onChange={backgroundGradientType => setAttributes({backgroundGradientType})}
						options={[
							{value: '', label: __('-', 'getwid')},
							{value: 'linear', label: __('Linear', 'getwid')},
							{value: 'radial', label: __('Radial', 'getwid')},
						]}
					/>
					{ backgroundGradientType &&
						<Fragment>
							<Button isLink isDestructive onClick={() => {
								setAttributes({
									backgroundGradientType: undefined,
									backgroundGradientFirstColor: undefined,
									backgroundGradientFirstColorLocation: undefined,
									backgroundGradientSecondColor: undefined,
									backgroundGradientSecondColorLocation: undefined,
									backgroundGradientAngle: undefined,
								})
							}}>
								{__('Reset', 'getwid')}
							</Button>
							<PanelColorSettings
								title={__('Gradient Colors', 'getwid')}
								colorSettings={[
									{
										value: backgroundGradientFirstColor,
										onChange: backgroundGradientFirstColor => setAttributes({backgroundGradientFirstColor}),
										label: __('First Color', 'getwid')
									},
									{
										value: backgroundGradientSecondColor,
										onChange: backgroundGradientSecondColor => setAttributes({backgroundGradientSecondColor}),
										label: __('Second Color', 'getwid')
									}
								]}
							/>
							<RangeControl
								label={__('First Color Location', 'getwid')}
								value={backgroundGradientFirstColorLocation !== undefined ? backgroundGradientFirstColorLocation : ''}
								onChange={backgroundGradientFirstColorLocation => setAttributes({backgroundGradientFirstColorLocation})}
								placeholder={0}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__('Second Color Location', 'getwid')}
								value={backgroundGradientSecondColorLocation !== undefined ? backgroundGradientSecondColorLocation : ''}
								onChange={backgroundGradientSecondColorLocation => setAttributes({backgroundGradientSecondColorLocation})}
								placeholder={100}
								min={0}
								max={100}
								step={1}
							/>
							{backgroundGradientType === 'linear' &&
								<RangeControl
									label={__('Angle', 'getwid')}
									value={backgroundGradientAngle !== undefined ? backgroundGradientAngle : ''}
									onChange={backgroundGradientAngle => setAttributes({backgroundGradientAngle})}
									placeholder={180}
									min={0}
									max={360}
									step={1}
								/>
							}
						</Fragment>
					}
				</PanelBody>
			</Fragment>
		);
	}

	renderDividersSettings(){
		// Setup the attributes
		const {
			attributes: {
				dividerTop, dividerTopColor, dividerBottom, dividerBottomColor
			}, setAttributes
		} = this.props;
		
		const dividersOptions = [
			{value: '', label: __('-', 'getwid')},
			{value: 'arrow', label: __('Arrow', 'getwid')},
			{value: 'arrow-negative', label: __('Arrow Negative', 'getwid')},
			{value: 'book', label: __('Book', 'getwid')},
			{value: 'book-negative', label: __('Book Negative', 'getwid')},
			{value: 'clouds', label: __('Clouds', 'getwid')},
			{value: 'clouds-negative', label: __('Clouds Negative', 'getwid')},
			{value: 'curve', label: __('Curve', 'getwid')},
			{value: 'curve-asymmetrical', label: __('Curve Asymmetrical', 'getwid')},
			{value: 'curve-asymmetrical-negative', label: __('Curve Asymmetrical Negative', 'getwid')},
			{value: 'curve-negative', label: __('Curve Negative', 'getwid')},
			{value: 'drops-negative', label: __('Drops Negative', 'getwid')},
			{value: 'drops', label: __('Drops', 'getwid')},
			{value: 'mountains', label: __('Mountains', 'getwid')},
			{value: 'opacity-fan', label: __('Opacity Fan', 'getwid')},
			{value: 'opacity-tilt', label: __('Opacity Tilt', 'getwid')},
			{value: 'pyramids-negative', label: __('Pyramids Negative', 'getwid')},
			{value: 'pyramids', label: __('Pyramids', 'getwid')},
			{value: 'split-negative', label: __('Split Negative', 'getwid')},
			{value: 'split', label: __('Split', 'getwid')},
			{value: 'tilt', label: __('Tilt', 'getwid')},
			{value: 'triangle-asymmetrical-negative', label: __('Triangle Asymmetrical Negative', 'getwid')},
			{value: 'triangle-asymmetrical', label: __('Triangle Asymmetrical', 'getwid')},
			{value: 'triangle-negative', label: __('Triangle Negative', 'getwid')},
			{value: 'triangle', label: __('Triangle', 'getwid')},
			{value: 'wave-brush', label: __('Wave Brush', 'getwid')},
			{value: 'waves-negative', label: __('Waves Negative', 'getwid')},
			{value: 'waves-pattern', label: __('Waves Pattern', 'getwid')},
			{value: 'waves', label: __('Waves', 'getwid')},
			{value: 'zigzag', label: __('Zigzag', 'getwid')},
		];

		return (
			<PanelBody title={ __( 'Dividers', 'getwid' ) } initialOpen={false}>
				<SelectControl
					label={__('Divider Top', 'getwid')}
					value={dividerTop !== undefined ? dividerTop : ''}
					options={dividersOptions}
					onChange={dividerTop => setAttributes({dividerTop})}
				/>
				<SelectControl
					label={__('Divider Bottom', 'getwid')}
					value={dividerBottom !== undefined ? dividerBottom : ''}
					options={dividersOptions}
					onChange={dividerBottom => setAttributes({dividerBottom})}
				/>
				{
					( dividerTop || dividerBottom ) &&
					<PanelColorSettings
						title={__('Divider Color', 'getwid')}
						colorSettings={[
							...(dividerTop ? [{
								value: dividerTopColor,
								onChange: dividerTopColor => setAttributes({dividerTopColor}),
								label: __('Top', 'getwid')
							}] : []),
							...(dividerBottom ? [{
								value: dividerBottomColor,
								onChange: dividerBottomColor => setAttributes({dividerBottomColor}),
								label: __('Bottom', 'getwid')
							}] : []),
						]}
					/>
				}
			</PanelBody>
		);
	}

	renderAlignmentSettings() {
		// Setup the attributes
		const {
			contentMaxWidth, minHeight, verticalAlign, horizontalAlign
		} = this.props.attributes;
		const { setAttributes } = this.props;

		return (
			<PanelBody title={__('Alignment', 'getwid')} initialOpen={false}>
				<RangeControl
					label={__('Content Max Width (px)', 'getwid')}
					value={contentMaxWidth !== undefined ? contentMaxWidth : ''}
					onChange={contentMaxWidth => {
						setAttributes({contentMaxWidth});
					}}
					allowReset
					min={0}
					max={2000}
					step={1}
				/>
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
		);
	}

	renderSliderSettings(){
		// Setup the attributes
		const {
			attributes: {
				sliderImages, sliderAnimationEffect, sliderAnimationDuration, sliderAnimationSpeed
			},
			setAttributes,
			noticeOperations, noticeUI
		} = this.props;

		return (
			<Fragment>
				<PanelBody title={ __( 'Slider', 'getwid' ) } initialOpen={false}>
					{ sliderImages.length == 0 && (
						<MediaPlaceholder
							icon="format-gallery"
							// className={ className }
							labels={ {
								title: __( 'Slider', 'getwid' ),
								instructions: __( 'Drag images, upload new ones or select files from your library.', 'getwid' ),
							} }
							onSelect={ this.onSelectSliderImages }
							accept="image/*"
							allowedTypes={ALLOWED_SLIDER_MEDIA_TYPES}
							multiple
							notices={ noticeUI }
							onError={ noticeOperations.createErrorNotice }
						/>
					)}
					{ !!sliderImages.length && (
						<Fragment>
							<MediaUpload
								onSelect={ this.onSelectSliderImages }
								multiple
								allowedTypes={ALLOWED_SLIDER_MEDIA_TYPES}
								value={ sliderImages !== undefined ? sliderImages.map( ( img ) => img.id ) : [] }
								render={ ( { open } ) => (
									<BaseControl>
										<Button
											isDefault
											onClick={ open }
										>
											{__('Select Images', 'getwid')}
										</Button>
										<br />
										<Button onClick={ () => { setAttributes({sliderImages: []}) } } isLink isDestructive>
											{ __( 'Remove', 'getwid' ) }
										</Button>
									</BaseControl>
								) }
							/>
							<SelectControl
								label={__('Animation Effect', 'getwid')}
								value={sliderAnimationEffect !== undefined ? sliderAnimationEffect : ''}
								options={[
									{value: '', label: __('Slide', 'getwid')},
									{value: 'fade', label: __('Fade', 'getwid')},
								]}
								onChange={sliderAnimationEffect => setAttributes({sliderAnimationEffect})}
							/>
							<TextControl
								label={__('Animation Duration', 'getwid')}
								value={sliderAnimationDuration}
								type={'number'}
								min={0}
								onChange={sliderAnimationDuration => setAttributes({sliderAnimationDuration})}
							/>
							<TextControl
								label={__('Animation Speed', 'getwid')}
								value={sliderAnimationSpeed !== undefined ? sliderAnimationSpeed : ''}
								min={0}
								onChange={sliderAnimationSpeed => setAttributes({sliderAnimationSpeed})}
							/>
						</Fragment>
					)}
				</PanelBody>
			</Fragment>
		);
	}

	renderVideoSettings(){
		const {
			attributes: {
				backgroundVideoUrl,
				backgroundVideoMute,
				backgroundVideoLoop,
				backgroundVideoPoster,
			},
			setAttributes
		} = this.props;

		return (
			<PanelBody title={ __( 'Video', 'getwid' ) } initialOpen={false}>
					<TextControl
						type='url'
						label={__('Video Link (mp4)', 'getwid')}
						value={backgroundVideoUrl !== undefined ? backgroundVideoUrl : ''}
						onChange={backgroundVideoUrl => setAttributes({backgroundVideoUrl})}
					/>
					{backgroundVideoUrl &&
					<Fragment>
						<CheckboxControl
							label={__('mute', 'getwid')}
							checked={ backgroundVideoMute !== undefined ? backgroundVideoMute : false}
							onChange={backgroundVideoMute => setAttributes({backgroundVideoMute})}
						/>
						<CheckboxControl
							label={__('loop', 'getwid')}
							checked={ backgroundVideoLoop !== undefined ? backgroundVideoLoop : false}
							onChange={backgroundVideoLoop => setAttributes({backgroundVideoLoop})}
						/>
						<MediaUpload
							label={__('Poster Image', 'getwid')}
							onSelect={posterImageDetails => setAttributes({
								backgroundVideoPoster: posterImageDetails.url
							})}
							allowedTypes={ALLOWED_IMAGE_MEDIA_TYPES}
							value={ backgroundVideoPoster !== undefined ? backgroundVideoPoster : '' }
							render={ ( { open } ) => (
								<BaseControl>
									<Button
										isDefault
										onClick={ open }
									>
										{ ! backgroundVideoPoster &&  __('Select Poster', 'getwid') }
										{ !! backgroundVideoPoster &&  __('Replace Poster', 'getwid') }
									</Button>
								</BaseControl>
							) }
						/>
						{ !! backgroundVideoPoster &&
							<Button onClick={ () => { setAttributes({backgroundVideoPoster: undefined}) } } isLink isDestructive>
								{ __( 'Remove Poster Image', 'getwid' ) }
							</Button>
						}
					</Fragment>
					}
				</PanelBody>
		);
	}

	renderForegroundSettings(){
		// Setup the attributes
		const {
			attributes: {
				foregroundOpacity,
				foregroundColor,
				foregroundImage,
				foregroundImagePosition,
				foregroundImageAttachment,
				foregroundImageRepeat,
				foregroundImageSize,
				foregroundFilter,
				foregroundGradientType,
				foregroundGradientFirstColor,
				foregroundGradientFirstColorLocation,
				foregroundGradientSecondColor,
				foregroundGradientSecondColorLocation,
				foregroundGradientAngle,
			}, setAttributes
		} = this.props;

		return (
			<PanelBody title={__('Foreground', 'getwid')} initialOpen={false}>
				<RangeControl
					label={__('Opacity', 'getwid')}
					value={foregroundOpacity !== undefined ? foregroundOpacity : ''}
					onChange={foregroundOpacity => setAttributes({foregroundOpacity})}
					min={0}
					max={100}
					step={1}
				/>
				<SelectControl
					label={__('Filters', 'getwid')}
					value={foregroundFilter !== undefined ? foregroundFilter : ''}
					onChange={foregroundFilter => setAttributes({foregroundFilter})}
					options={[
						{value: '', label: __('-', 'getwid')},
						{value: 'normal', label: __('Normal', 'getwid')},
						{value: 'multiply', label: __('Multiply', 'getwid')},
						{value: 'screen', label: __('Screen', 'getwid')},
						{value: 'overlay', label: __('Overlay', 'getwid')},
						{value: 'darken', label: __('Darken', 'getwid')},
						{value: 'lighten', label: __('Lighten', 'getwid')},
						{value: 'color-dodge', label: __('Color Dodge', 'getwid')},
						{value: 'color-burn', label: __('Color Burn', 'getwid')},
						{value: 'hard-light', label: __('Hard Light', 'getwid')},
						{value: 'soft-light', label: __('Soft Light', 'getwid')},
						{value: 'difference', label: __('Difference', 'getwid')},
						{value: 'exclusion', label: __('Exclusion', 'getwid')},
						{value: 'hue', label: __('Hue', 'getwid')},
						{value: 'saturation', label: __('Saturation', 'getwid')},
						{value: 'color', label: __('Color', 'getwid')},
						{value: 'luminosity', label: __('Luminosity', 'getwid')},
					]}
				/>
				<PanelColorSettings
					title={__('Foreground Color', 'getwid')}
					colorSettings={[
						{
							value: foregroundColor,
							onChange: foregroundColor => setAttributes({foregroundColor}),
							label: __('Foreground Color', 'getwid')
						}
					]}
					initialOpen={false}
				/>
				<PanelBody title={__('Gradient', 'getwid')} initialOpen={false}>
					<SelectControl
						value={foregroundGradientType !== undefined ? foregroundGradientType : ''}
						onChange={foregroundGradientType => setAttributes({foregroundGradientType})}
						options={[
							{value: '', label: __('-', 'getwid')},
							{value: 'linear', label: __('Linear', 'getwid')},
							{value: 'radial', label: __('Radial', 'getwid')},
						]}
					/>
					{ foregroundGradientType &&
					<Fragment>
						<Button isSmall onClick={() => {
							setAttributes({
								foregroundGradientType: undefined,
								foregroundGradientFirstColor: undefined,
								foregroundGradientFirstColorLocation: undefined,
								foregroundGradientSecondColor: undefined,
								foregroundGradientSecondColorLocation: undefined,
								foregroundGradientAngle: undefined,
							})
						}}>
							{__('Reset', 'getwid')}
						</Button>
						<PanelColorSettings
							title={__('Gradient Colors', 'getwid')}
							colorSettings={[
								{
									value: foregroundGradientFirstColor,
									onChange: foregroundGradientFirstColor => setAttributes({foregroundGradientFirstColor}),
									label: __('First Color', 'getwid')
								},
								{
									value: foregroundGradientSecondColor,
									onChange: foregroundGradientSecondColor => setAttributes({foregroundGradientSecondColor}),
									label: __('Second Color', 'getwid')
								}
							]}
						/>
						<RangeControl
							label={__('First Color Location', 'getwid')}
							value={foregroundGradientFirstColorLocation !== undefined ? foregroundGradientFirstColorLocation : ''}
							onChange={foregroundGradientFirstColorLocation => setAttributes({foregroundGradientFirstColorLocation})}
							placeholder={0}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__('Second Color Location', 'getwid')}
							value={foregroundGradientSecondColorLocation !== undefined ? foregroundGradientSecondColorLocation : ''}
							onChange={foregroundGradientSecondColorLocation => setAttributes({foregroundGradientSecondColorLocation})}
							placeholder={100}
							min={0}
							max={100}
							step={1}
						/>
						{foregroundGradientType === 'linear' && (
							<RangeControl
								label={__('Angle', 'getwid')}
								value={foregroundGradientAngle !== undefined ? foregroundGradientAngle : ''}
								onChange={foregroundGradientAngle => setAttributes({foregroundGradientAngle})}
								placeholder={180}
								min={0}
								max={360}
								step={1}
							/>
						)}
					</Fragment>
					}
				</PanelBody>
				<PanelBody title={__('Foreground Image', 'getwid')} initialOpen={false}>
					<MediaUpload
						label={__('Image', 'getwid')}
						onSelect={ foregroundImage => {
							setAttributes({
								foregroundImage: foregroundImage.url
							});
						} }
						allowedTypes={ALLOWED_IMAGE_MEDIA_TYPES}
						value={ foregroundImage !== undefined ? foregroundImage : ''}
						render={ ( { open } ) => (
							<BaseControl>
								<Button
									isDefault
									onClick={ open }
								>
									{!foregroundImage && __('Select Image', 'getwid')}
									{!!foregroundImage && __('Replace Image', 'getwid')}
								</Button>
								{
									!!foregroundImage &&
									<Fragment>
										<br />
										<Button isLink isDestructive onClick={()=>setAttributes({
											foregroundImage: undefined,
											foregroundImagePosition: undefined,
											foregroundImageAttachment: undefined,
											foregroundImageRepeat: undefined,
											foregroundImageSize: undefined
										})}>
											{ __('Remove', 'getwid') }
										</Button>
									</Fragment>
								}
							</BaseControl>
						) }
					/>
					{foregroundImage &&
					<Fragment>
						<SelectControl
							label={__('Position', 'getwid')}
							value={foregroundImagePosition !== undefined ? foregroundImagePosition : ''}
							onChange={foregroundImagePosition => setAttributes({foregroundImagePosition})}
							options={[
								{value: '', label: __('Center', 'getwid')},
								{value: 'top left', label: __('Top Left', 'getwid')},
								{value: 'top center', label: __('Top', 'getwid')},
								{value: 'top right', label: __('Top Right', 'getwid')},
								{value: 'center left', label: __('Left', 'getwid')},
								{value: 'center right', label: __('Right', 'getwid')},
								{value: 'bottom left', label: __('Bottom Left', 'getwid')},
								{value: 'bottom center', label: __('Bottom Center', 'getwid')},
								{value: 'bottom right', label: __('Bottom Right', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Attachment', 'getwid')}
							value={foregroundImageAttachment !== undefined ? foregroundImageAttachment : ''}
							onChange={foregroundImageAttachment => setAttributes({foregroundImageAttachment})}
							options={[
								/*Inherit*/
								{value: '', label: __('-', 'getwid')},
								{value: 'scroll', label: __('Scroll', 'getwid')},
								{value: 'fixed', label: __('Fixed', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Repeat', 'getwid')}
							value={foregroundImageRepeat !== undefined ? foregroundImageRepeat : ''}
							onChange={foregroundImageRepeat => setAttributes({foregroundImageRepeat})}
							options={[
								/*Inherit*/
								{value: '', label: __('-', 'getwid')},
								{value: 'no-repeat', label: __('No Repeat', 'getwid')},
								{value: 'repeat', label: __('Repeat', 'getwid')},
								{value: 'repeat-x', label: __('Repeat X', 'getwid')},
								{value: 'repeat-y', label: __('Repeat Y', 'getwid')},
								{value: 'space', label: __('Space', 'getwid')},
								{value: 'round', label: __('Round', 'getwid')},
							]}
						/>
						<SelectControl
							label={__('Size', 'getwid')}
							value={foregroundImageSize !== undefined ? foregroundImageSize : ''}
							onChange={foregroundImageSize => setAttributes({foregroundImageSize})}
							options={[
								/*Auto*/
								{value: '', label: __('-', 'getwid')},
								{value: 'cover', label: __('Cover', 'getwid')},
								{value: 'contain', label: __('Contain', 'getwid')},
							]}
						/>
					</Fragment>
					}
				</PanelBody>
			</PanelBody>
		);
	}

	renderAnimationSettings(){
		// Setup the attributes
		const {
			attributes: {
				entranceAnimation,
				entranceAnimationDuration,
				entranceAnimationDelay,
			}, setAttributes
		} = this.props;

		return (
			<Fragment>
				<PanelBody title={__('Entrance Animation', 'getwid')} initialOpen={false}>
					{
						this.hasAnimation() &&
						<Fragment>
							<Button isLink isDestructive onClick={()=>setAttributes({
								entranceAnimation: undefined,
								entranceAnimationDelay: undefined,
								entranceAnimationDuration: undefined
							})}>
								{__('reset', 'getwid')}
							</Button>
						</Fragment>
					}
					<GetwidAnimationSelectControl
						label={__('Animation Effect', 'getwid')}
						allowExit={false}
						value={entranceAnimation !== undefined ? entranceAnimation : ''}
						onChange={entranceAnimation => setAttributes({entranceAnimation})}
					/>
					<SelectControl
						label={__('Duration', 'getwid')}
						value={entranceAnimationDuration !== undefined ? entranceAnimationDuration : ''}
						onChange={entranceAnimationDuration => setAttributes({entranceAnimationDuration})}
						options={[
							{value: '2000ms', label: __('Slow', 'getwid')},
							{value: '1500ms', label: __('Normal', 'getwid')},
							{value: '800ms', label: __('Fast', 'getwid')},
						]}
					/>
					<TextControl
						label={__('Delay (ms)', 'getwid')}
						value={entranceAnimationDelay !== undefined ? entranceAnimationDelay.replace('ms', '') : ''}
						type={'number'}
						min={0}
						placeholder={2000}
						onChange={entranceAnimationDelay => {
							entranceAnimationDelay = parseInt(entranceAnimationDelay);
							if (isNaN(entranceAnimationDelay)) {
								entranceAnimationDelay = undefined;
							} else {
								entranceAnimationDelay = `${entranceAnimationDelay}ms`;
							}
							setAttributes({entranceAnimationDelay})
						}}
					/>
				</PanelBody>
			</Fragment>
		);
	}

	onSelectSliderImages( images ) {
		this.props.setAttributes( {
			sliderImages: images !== undefined ? images.map( ( image ) => pick( image, [ 'alt', 'id', 'url' ] ) ) : [],
		} );
	}

}

export default withNotices(Inspector);