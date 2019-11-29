/**
* External dependencies
*/
import GetwidCustomTabsControl from 'GetwidControls/custom-tabs-control';
import attributes from './attributes';
import GetwidStyleLengthControl from 'GetwidControls/style-length-control';
import GetwidAnimationSelectControl from 'GetwidControls/animation-select-control';

import { renderPaddingsPanel } from 'GetwidUtils/render-inspector';

import { times } from 'lodash';

/**
* WordPress dependencies
*/
import { __ } from 'wp.i18n';
const {jQuery: $} = window;
const {
	Component,
	Fragment,
} = wp.element;
const {
	InspectorControls,
	PanelColorSettings
} = wp.editor;
const {
	Button,
	BaseControl,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	RadioControl,
	TextControl,
} = wp.components;


/**
* Create an Inspector Controls
*/
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );	

		this.changeState = this.changeState.bind(this);

		this.state = {
			tabName: 'general',
		};			
	}

	hasSliderSettings(){
		const {
			attributes: {
				sliderAnimationEffect,
				sliderAutoplay,
				pauseOnHover,
				sliderAutoplaySpeed,
				sliderAnimationSpeed,
			}
		} = this.props;

		return sliderAnimationEffect != undefined ||
			sliderAutoplay != attributes.sliderAutoplay.default ||
			pauseOnHover != attributes.pauseOnHover.default ||
			sliderAutoplaySpeed != attributes.sliderAutoplaySpeed.default ||
			sliderAnimationSpeed != attributes.sliderAnimationSpeed.default;
	}

	changeState (param, value) {
		this.setState({[param]: value});
	}
	
	getState (value) {
		return this.state[value];
	}	

	render() {
		const {
			attributes: {
				imageSize,
				slideCount,
				contentMaxWidth,
				minHeight,
				verticalAlign,
				horizontalAlign,
				textColor,
				overlayColor,
				overlayOpacity,
				contentAnimation,
				contentAnimationDuration,
				contentAnimationDelay,
				sliderAnimationEffect,
				sliderAutoplay,
				pauseOnHover,
				sliderAutoplaySpeed,
				sliderAnimationSpeed,
				sliderArrays,
			},
			setAttributes
		} = this.props;

		const {
			tabName,
		} = this.state;
		
		const changeState = this.changeState;

		const resetSliderSettings = () => {
			setAttributes({
				sliderAnimationEffect: undefined,
				sliderAutoplay: attributes.sliderAutoplay.default,
				pauseOnHover: attributes.pauseOnHover.default,
				sliderAutoplaySpeed: attributes.sliderAutoplaySpeed.default,
				sliderAnimationSpeed: attributes.sliderAnimationSpeed.default
			})
		};

		//*********RENDER PARTS*********
		const renderSliderSettings = () => {		
			return (
				<Fragment>
					<RadioControl
					    label={__('Animation Effect', 'getwid')}
					    selected={ sliderAnimationEffect !== undefined ? sliderAnimationEffect : '' }
					    options={ [
							{value: '', label: __('Slide', 'getwid')},
							{value: 'fade', label: __('Fade', 'getwid')},
					    ] }
					    onChange={sliderAnimationEffect => setAttributes({sliderAnimationEffect}) }
					/>

					<ToggleControl
					    label={__('Enable Slideshow', 'getwid')}
					    checked={ sliderAutoplay }
					    onChange={ () => setAttributes({sliderAutoplay: !sliderAutoplay}) }
					/>
					{sliderAutoplay &&
						(
							<Fragment>
								<ToggleControl
								    label={__('Pause On Hover', 'getwid')}
								    checked={ pauseOnHover }
								    onChange={ () => setAttributes({pauseOnHover: !pauseOnHover}) }
								/>					
								<TextControl
									label={__('Slideshow Speed', 'getwid')}
									type={'number'}
									value={sliderAutoplaySpeed !== undefined ? sliderAutoplaySpeed : ''}
									min={0}
									onChange={sliderAutoplaySpeed => setAttributes({sliderAutoplaySpeed})}
								/>
							</Fragment>
						)
					}
					
					<TextControl
						label={__('Animation Speed', 'getwid')}
						type={'number'}
						value={sliderAnimationSpeed !== undefined ? sliderAnimationSpeed : ''}
						min={0}
						onChange={sliderAnimationSpeed => setAttributes({sliderAnimationSpeed})}
					/>

					<BaseControl>
						<Button isLink
							onClick={resetSliderSettings}
							disabled={ !this.hasSliderSettings() }>
							{__('Reset', 'getwid')}
						</Button>
					</BaseControl>					
				</Fragment>
			);
		};

		const renderOverlaySettings = () => {		
			return (
				<Fragment>
					<PanelColorSettings
						title={__('Overlay Color', 'getwid')}
						colorSettings={[
							{
								value: overlayColor,
								onChange: overlayColor => setAttributes({overlayColor}),
								label: __('Overlay Color', 'getwid')
							}
						]}
						initialOpen={true}
					/>
					<RangeControl
						label={__('Overlay Opacity', 'getwid')}
						value={overlayOpacity !== undefined ? overlayOpacity : 0}
						onChange={overlayOpacity => setAttributes({overlayOpacity})}
						min={0}
						max={100}
						step={1}
					/>
				</Fragment>
			);
		};

		const hascontentAnimation = () => {
			return contentAnimation !== attributes.contentAnimation.default ||
				contentAnimationDelay !== attributes.contentAnimationDelay.default ||
				contentAnimationDuration !==  attributes.contentAnimationDuration.default;
		};
		const resetcontentAnimation = () => {
			setAttributes({
				contentAnimation: attributes.contentAnimation.default,
				contentAnimationDelay: attributes.contentAnimationDelay.default,
				contentAnimationDuration:  attributes.contentAnimationDuration.default
			})
		};

		const renderAnimationSettings = () => {		
			return (
				<Fragment>
					<GetwidAnimationSelectControl
						label={__('Animation Effect', 'getwid')}
						allowAnimation={['Entrance','Seeker']}
						value={contentAnimation !== undefined ? contentAnimation : ''}
						onChange={contentAnimation => setAttributes({contentAnimation})}
					/>
					<SelectControl
						label={__('Duration', 'getwid')}
						value={contentAnimationDuration !== undefined ? contentAnimationDuration : ''}
						onChange={contentAnimationDuration => setAttributes({contentAnimationDuration})}
						options={[
							{value: '3000ms', label: __('Very Slow', 'getwid')},
							{value: '2000ms', label: __('Slow', 'getwid')},
							{value: '1500ms', label: __('Normal', 'getwid')},
							{value: '800ms', label: __('Fast', 'getwid')},
							{value: '400ms', label: __('Very Fast', 'getwid')},
						]}
					/>
					<TextControl
						label={__('Delay, ms', 'getwid')}
						value={contentAnimationDelay !== undefined ? contentAnimationDelay.replace('ms', '') : ''}
						type={'number'}
						min={0}
						onChange={contentAnimationDelay => {
							contentAnimationDelay = parseInt(contentAnimationDelay);
							if (isNaN(contentAnimationDelay)) {
								contentAnimationDelay = undefined;
							} else {
								contentAnimationDelay = `${contentAnimationDelay}ms`;
							}
							setAttributes({contentAnimationDelay})
						}}
					/>
					<BaseControl>
						<Button isLink
							onClick={resetcontentAnimation}
							disabled={ !hascontentAnimation() }>
							{__('Reset', 'getwid')}
						</Button>
					</BaseControl>
				</Fragment>
			);
		};

		//*********/RENDER PARTS*********
		const addNewSlide = ( nextSlide ) => {
			
			const sliderArraysParsed = JSON.parse(sliderArrays);

			const newSlides = sliderArraysParsed;

			if ( newSlides.length < nextSlide ) {
				const amount = Math.abs( nextSlide - newSlides.length );
				{ times( amount, n => {
					const slideNumber = nextSlide - n;
					newSlides.push(
						sprintf( __( 'Slide %d', 'getwid' ), slideNumber ),
					);
				} ); }
				setAttributes( {

					sliderArrays: JSON.stringify(newSlides),
					slideCount: nextSlide
				} );
			} else {
				setAttributes( {

					sliderArrays: JSON.stringify(newSlides.slice(0, nextSlide)),
					slideCount: nextSlide
				} );
			}
		};

		return (
			<InspectorControls key="inspector">
				<GetwidCustomTabsControl
					state={tabName}
					stateName={'tabName'}
					onChangeTab={changeState}
					tabs={['general','style','layout','advanced']}
				/>

				{ tabName === 'general' && (
					<Fragment>	
						<PanelBody title={ __( 'Settings', 'getwid' ) } initialOpen={true}>
							<RangeControl
								label={ __( 'Number of slides', 'getwid' ) }
								value={ slideCount }
								onChange={ ( nextSlide ) => {
									addNewSlide(nextSlide);
								}}
								min={ 1 }
								max={ 12 }
							/>
							<SelectControl
								label={__('Image Size', 'getwid')}
								help={__('For images from Media Library only.', 'getwid')}
								value={imageSize}
								onChange={imageSize => {
									setAttributes({imageSize});
								}}
								options={Getwid.settings.image_sizes}
							/>


						</PanelBody>

						<PanelBody title={__( 'Slider Settings', 'getwid' )} initialOpen={false}>
							{ renderSliderSettings() }
						</PanelBody>						
					</Fragment>
				)}

				{ tabName === 'style' && (
					<Fragment>	
						<PanelColorSettings
							title={__('Text Color', 'getwid')}
							colorSettings={[
								{
									value: textColor,
									onChange: textColor => setAttributes({textColor}),
									label: __('Text Color', 'getwid')
								}
							]}
						/>
						{ renderOverlaySettings() }							
					</Fragment>
				)}	

				{ tabName === 'layout' && (
					<Fragment>	
						<BaseControl
							label={__('Slider Height', 'getwid')}
						>
							<GetwidStyleLengthControl
								value={minHeight}
								units={[
									{label: 'px', value: 'px'},
									{label: 'vh', value: 'vh'},
									{label: 'vw', value: 'vw'},
									{label: '%', value: '%'}
								]}
								onChange={minHeight => setAttributes({minHeight})}
							/>
						</BaseControl>
					
						<RangeControl
							label={__('Content Width', 'getwid')}
							value={contentMaxWidth !== undefined ? contentMaxWidth : ''}
							onChange={contentMaxWidth => {
								setAttributes({contentMaxWidth});
							}}
							allowReset
							min={0}
							max={2000}
							step={1}
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

						<PanelBody title={__( 'Padding', 'getwid' )} initialOpen={false}>
							{ renderPaddingsPanel( this ) }					
						</PanelBody>		
					</Fragment>
				)}

				{ tabName === 'advanced' && (
					<Fragment>	
						<PanelBody title={__( 'Text Animation', 'getwid' )} initialOpen={false}>
							{ renderAnimationSettings() }
						</PanelBody>	
					</Fragment>
				)}
			</InspectorControls>
		);
	}

}

export default ( Inspector );