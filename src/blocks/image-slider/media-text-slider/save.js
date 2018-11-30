import classnames from 'classnames';
import times from 'lodash/times';
import './style.scss';
import prepareGradientStyle from 'GetwidUtils/gradient-style';

const {
	Component,
	Fragment,
} = wp.element;
const {
	InnerBlocks,
	RichText,
} = wp.editor;

import MyBlockContext from './../context';

/**
 *
 * @param {string} attrPrefix
 * @return {Object}
 */


class Save extends Component {
	stripStringRender( string ) {
		return string.toLowerCase().replace( /[^0-9a-z-]/g,'' );
	}
	render() {
		const {
			attributes: {
				uniqueID,
				slideCount,
				contentMaxWidth,
				minHeight,
				verticalAlign,
				horizontalAlign,
				paddingTop,
				paddingBottom,
				paddingLeft,
				paddingRight,
				titleColor,
				contentColor,
				backgroundColor,
				backgroundGradientFirstColor,
				backgroundGradientFirstColorLocation,
				backgroundGradientSecondColor,
				backgroundGradientSecondColorLocation,
				backgroundGradientType,
				backgroundGradientAngle,
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
				contentAnimation,
				contentAnimationDuration,
				contentAnimationDelay,
				sliderAnimationEffect,
				sliderAutoplay,
				sliderAutoplaySpeed,
				sliderAnimationSpeed,
				currentSlide,
				selectedSlide,
				slideAlignment,
				align,
				sliderArrays,
			}
		} = this.props;
		const className = 'wp-block-getwid-media-text-slider';
/*		console.info(this.props);
		console.log('++++++++++++')
console.warn(!!contentAnimation);*/



		const classId = ( ! uniqueID ? 'notset' : uniqueID );
		const wrapperClass = classnames( `${className}-tab-id${ classId } ${className}--current-slide-${ currentSlide }` );

		const wrapperStyle = {
			backgroundColor: backgroundColor,
			...prepareGradientStyle('background', this.props),
		}
		
		const animationData = !!contentAnimation ? {
			'data-animation':  contentAnimation !== undefined ? contentAnimation : '',
			'data-duration':  contentAnimationDuration !== undefined ? contentAnimationDuration : '2000ms',
			'data-delay': contentAnimationDelay !== undefined ? contentAnimationDelay : '500ms',
		} : {};

		const sliderData = {
			'data-slide-effect' : sliderAnimationEffect,
			'data-slide-autoplay' : sliderAutoplay,
			'data-slide-autoplay-speed' : sliderAutoplaySpeed,
			'data-slide-speed' : sliderAnimationSpeed,
			'data-infinite' : true,
		};



		// console.warn(slideCount);
		// console.log('SAVE slideCount');
		const renderSaveTitles = ( index ) => {

/*			console.log(index);
			console.log(sliderArrays);
			console.log(typeof sliderArrays[ index ]);*/
			if (typeof sliderArrays[ index ] !== 'undefined')
			return (
				<Fragment>
					<li id={ `tab-${ this.stripStringRender( sliderArrays[ index ].text.toString() ) }` } className={ `${className}__title-wrapper ${className}__title-wrapper-${ index } ${className}__title-wrapper--${ ( 1 + index === currentSlide ? 'active' : 'inactive' ) }` }>
						<a href={ `#tab-${ this.stripStringRender( sliderArrays[ index ].text.toString() ) }` } data-tab={ 1 + index } className={ `${className}__title ${className}__title-${ 1 + index } ` }>
							<RichText.Content
								tagName="span"
								value={ sliderArrays[ index ].text }
								className={`${className}__title_text`}
							/>
						</a>
					</li>
				</Fragment>
			);
		};

		return (
			<div className={ wrapperClass }
				style={wrapperStyle}
				{...animationData}
			>
				<div className={`${className}__slides-wrapper`}>
					<div className={`${className}__content`}
						{...sliderData}					     
					>

				<MyBlockContext.Consumer>
					{ ( value ) => {
						// console.log(arguments);
					/*	return (
						<div className='lolo4ka_parent'>The value is: ${ value }</div>
					);*/
					}

					 }
				</MyBlockContext.Consumer>


							<InnerBlocks.Content />

					
					</div>
				</div>
			</div>
		);

	}
}
export default Save;