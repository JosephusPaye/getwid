/**
 * Block dependencies
 */
import edit from './edit';
import attributes from './attributes';

import './style.scss';
import { noop } from 'lodash';
import classnames from "classnames";

import render_style from 'GetwidUtils/render-style';
const {
	prepareGradientStyle,
	prepareBackgroundImageStyles,
	convertHorizontalAlignToStyle,
	convertVerticalAlignToStyle
} = render_style;

const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	BlockControls,
	AlignmentToolbar,
	InnerBlocks,
	getColorClassName
} = wp.editor;

const {
	Toolbar
} = wp.components;

const { Fragment } = wp.element;

/**
 * Register static block example block
 */
export default registerBlockType(
	'getwid/media-text-slider-slide-content',
	{
		title: __('Slide - Content', 'getwid'),
		category: 'getwid-blocks',
		parent: [ 'getwid/media-text-slider-slide' ],
		icon: {	
			src: 'format-image',
		},
		keywords: [
			__('Getwid', 'getwid')
		],
		supports: {
			html: false,
		},
		attributes,

		edit,

		save: props => {

			const {
				attributes: {
					mediaAlt,
					mediaType,
					mediaUrl,
					mediaWidth,
					mediaId,
					innerParent
				}
			} = props;

			const className = 'wp-block-getwid-media-text-slider-slide-content'

			const mediaTypeRenders = {
				image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
				video: () => <video controls src={ mediaUrl } />,
			};

			const overlayStyle = {
				backgroundColor : (typeof innerParent != 'undefined' && typeof innerParent.attributes.overlayColor != 'undefined' ? innerParent.attributes.overlayColor : null),
				opacity : (typeof innerParent != 'undefined' && typeof innerParent.attributes.overlayOpacity != 'undefined' ? innerParent.attributes.overlayOpacity / 100 : null)
			};

			const wrapperStyle = {
				maxWidth : (typeof innerParent != 'undefined' && typeof innerParent.attributes.contentMaxWidth != 'undefined' ? innerParent.attributes.contentMaxWidth : null),				
			};

			const contentStyle = {
				color : (typeof innerParent != 'undefined' && typeof innerParent.attributes.textColor != 'undefined' ? innerParent.attributes.textColor : null),				
			};

			return (
				<div style={wrapperStyle} className={ className }>
					<figure className={`${className}__media`} >
						{ ( mediaTypeRenders[ mediaType ] || noop )() }
						<div style={overlayStyle} className={`${className}__media-overlay`}></div>				
					</figure>
					<div style={contentStyle} className={`${className}__content`}>
						<div className={`${className}__content-wrapper`}>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},

	},
);