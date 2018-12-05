const attributes = {
	backgroundId: {
		type: 'number',
	},
	backgroundUrl: {
		type: 'string',
	},	
	backgroundType: {
		type: 'string',
		default: 'image',
	},	
	title: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
	text: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},	
	link: {
		type: 'string',
	},
	align: {
		type: 'string',
	},
	minHeight: {
		type: 'string',
	},	
	verticalAlign: {
		type: 'string',
		default: 'center',
	},
	horizontalAlign: {
		type: 'string',
		default: 'center',
	},

	textColor: {
		type: 'string',
	},
	overlayColor: {
		type: 'string',
	},
	backgroundOpacity: {
		type: 'number',
		default: 50,
	},

	blockAnimation: {
		type: 'string',
	},
	textAnimation: {
		type: 'string',
		default: 'none',
	},
};

export default attributes;