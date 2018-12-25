/**
 * Block dependencies
 */
import Inspector from './inspector';
import Edit from './edit';
import attributes from './attributes';

import '../scss/style.scss'
import classnames from "classnames";

const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	BlockControls,
	AlignmentToolbar
} = wp.editor;

function prepareWrapperStyle(attributes){
	const {
		iconStyle,
		secondaryColor, iconSize,
		padding, borderWidth, borderRadius,
	} = attributes;

	return {
		// wrapper
		fontSize: iconSize !== undefined ? `${iconSize}px` : undefined,
		padding: padding !== undefined ? `${padding}px` : undefined,
		// wrapper
		backgroundColor: 'stacked' === iconStyle ? secondaryColor : undefined,
		borderColor: 'framed' === iconStyle ? secondaryColor : undefined,
		borderWidth: 'framed' === iconStyle ? borderWidth : undefined,
		borderRadius: 'framed' === iconStyle ? borderRadius : undefined,
	};
}

/**
 * Register static block example block
 */
export default registerBlockType(
	'getwid/icon',
	{
		title: __('Getwid Icon', 'getwid'),
		description: __('Getwid Icon', 'getwid'),
		category: 'common',
		icon: {
			foreground: '#bf3737',		
			src: 'star-filled',
		},	

		keywords: [
			__('Getwid', 'getwid'),
			__('Icon', 'getwid'),
		],
		supports: {
			align: true,
		},
		attributes,

		edit: props => {
			const {setAttributes} = props;

			if (!props.attributes.id) {
				props.attributes.id = props.clientId;
			}

			return [
				<Inspector {...{ setAttributes, ...props }} key='inspector'/>,
				<Edit {...{ setAttributes, prepareWrapperStyle, ...props }} key='edit'/>
			];
		},

		save: props => {
			const {
				attributes: {
					// id,
					icon,
					iconStyle,
					link,
					hoverAnimation,
					primaryColor
				},
			} = props;
			const className = 'wp-block-getwid-icon';

			const iconHtml = <i
				className={icon}
				style={{
					color: primaryColor,
				}}
			></i>;

			const wrapperProps = {
				className: classnames('wp-block-getwid-icon__wrapper', {
					'getwid-animated': !! hoverAnimation
				}),
				style: prepareWrapperStyle(props.attributes),
				'data-animation': hoverAnimation ? hoverAnimation : undefined
			};

			return (
				<div className={classnames({
					[`${className}--stacked`]: iconStyle === 'stacked',
					[`${className}--framed`]: iconStyle === 'framed',
					// [`${className}-${id}`]: true
				})}
				>
					{link && (
						<a href={link}
						   {...wrapperProps}
						>
							{iconHtml}
						</a>
					)}
					{!link && (
						<div {...wrapperProps}>
							{iconHtml}
						</div>
					)}
				</div>
			);
		},
	},
);

// /**
//  *
//  * @param {string} className
//  * @param {Object} attributes
//  * @return {string}
//  */
// function prepareCSS(className, attributes) {
// 	const {
// 		id, style, primaryColor, secondaryColor, iconSize, padding, borderWidth, borderRadius,
// 		alignment, hoverPrimaryColor, hoverSecondaryColor
// 	} = attributes;
//
// 	let css = '';
//
// 	// Icon Size
// 	if (typeof iconSize !== 'undefined') {
// 		css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 		        font-size: ${iconSize}px;
// 		    }`;
// 	}
//
// 	// Wrapper Padding
// 	if (typeof padding !== 'undefined') {
// 		css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 		        padding: ${padding}px;
// 		    }`;
// 	}
//
// 	// Icon Color
// 	if (primaryColor) {
// 		css += `.${className}-${id} .wp-block-getwid-icon__wrapper i{
// 		        color: ${primaryColor};
// 		    }`;
// 	}
//
// 	// Hover Icon Color
// 	if (hoverPrimaryColor) {
// 		css += `.${className}-${id} .wp-block-getwid-icon__wrapper:hover i{
// 		        color: ${hoverPrimaryColor};
// 		    }`;
// 	}
//
// 	// Alignment
// 	if (alignment){
// 		css += `.${className}-${id}{
// 		        text-align: ${alignment};
// 		    }`;
// 	}
//
// 	// Background Colors
// 	if ('stacked' === style) {
// 		if (secondaryColor) {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 			        background-color: ${secondaryColor};
// 			    }`;
// 		}
// 		if (hoverSecondaryColor) {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper:hover{
// 			        background-color: ${hoverSecondaryColor};
// 			    }`;
// 		}
// 	}
//
// 	// Border Styles
// 	if ('framed' === style) {
// 		if (secondaryColor) {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 			        border-color: ${secondaryColor};
// 			    }`;
// 		}
// 		if (hoverSecondaryColor) {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper:hover{
// 			        border-color: ${hoverSecondaryColor};
// 			    }`;
// 		}
// 		if (typeof borderWidth !== 'undefined') {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 			        border-width: ${borderWidth}px;
// 			    }`;
// 		}
// 		if (typeof borderRadius !== 'undefined') {
// 			css += `.${className}-${id} .wp-block-getwid-icon__wrapper{
// 			        border-radius: ${borderRadius}%;
// 			    }`;
// 		}
// 	}
//
// 	return css;
// }