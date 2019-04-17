const attributes = {
	align: {
		type: 'string'
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	fillAmount: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-getwid-linear-progress-bar .wp-block-getwid-linear-progress-bar__wrapper',
		attribute: 'data-fill-amount',
		default: '75'
	},
	title: {
		type: 'string',
		source: 'html',
		selector: 'h5',
	},
	isAnimated: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-getwid-linear-progress-bar .wp-block-getwid-linear-progress-bar__wrapper',
		attribute: 'data-is-animated',
		default: 'false'
	}
};

export default attributes;