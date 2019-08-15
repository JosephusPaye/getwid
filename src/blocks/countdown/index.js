/**
* Internal dependencies
*/
import attributes from './attributes';
import edit from './edit';
// import save from './save';

/**
* External dependencies
*/
import { __ } from 'wp.i18n';

const { registerBlockType, createBlock } = wp.blocks;


/**
* Register the block
*/
registerBlockType( 'getwid/countdown', {
	title: __( 'Countdown', 'getwid' ),
	// icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M5.22,12.67h1.87v6.01c0,0.53-0.06,1.07-0.18,1.58c-0.1,0.45-0.29,0.87-0.55,1.25c-0.24,0.34-0.56,0.62-0.94,0.81	c-0.42,0.2-0.89,0.3-1.36,0.29c-0.23,0.01-0.45-0.03-0.66-0.11c-0.17-0.07-0.32-0.16-0.46-0.28c-0.12-0.11-0.22-0.23-0.31-0.36	c-0.08-0.13-0.15-0.25-0.21-0.36c-0.05-0.1-0.11-0.2-0.18-0.29c-0.04-0.07-0.12-0.11-0.2-0.11c-0.12,0-0.24,0.03-0.33,0.1	c-0.1,0.07-0.18,0.16-0.25,0.26c-0.07,0.11-0.12,0.22-0.15,0.34c-0.03,0.12-0.05,0.25-0.05,0.37c0.01,0.18,0.09,0.34,0.22,0.46	c0.17,0.16,0.37,0.28,0.59,0.36c0.27,0.11,0.56,0.19,0.85,0.24c0.33,0.06,0.66,0.09,1,0.09c0.86,0.01,1.73-0.11,2.56-0.34	c0.75-0.2,1.46-0.55,2.08-1.03c0.59-0.46,1.06-1.05,1.39-1.73c0.35-0.76,0.53-1.59,0.51-2.43v-5.11h3.77v5.83	c0,0.26,0.03,0.52,0.08,0.77c0.05,0.25,0.16,0.48,0.31,0.68c0.18,0.22,0.41,0.38,0.67,0.49c0.36,0.14,0.74,0.2,1.13,0.18	c0.29,0,0.58-0.03,0.87-0.1c0.27-0.06,0.53-0.14,0.78-0.25c0.23-0.09,0.45-0.2,0.67-0.32c0.2-0.11,0.38-0.22,0.53-0.32l-0.17-0.38	c-0.12,0.06-0.27,0.13-0.43,0.19c-0.17,0.07-0.35,0.1-0.53,0.1c-0.15,0.01-0.3-0.06-0.4-0.18c-0.09-0.14-0.14-0.31-0.13-0.48v-6.23	h2.06v-0.9h-2.06V6.48c0-0.85,0.02-1.6,0.06-2.26c0.02-0.56,0.11-1.11,0.25-1.65c0.1-0.38,0.29-0.72,0.56-1	c0.27-0.24,0.63-0.36,1-0.34c0.16,0,0.32,0.04,0.46,0.11c0.13,0.08,0.25,0.17,0.35,0.28c0.1,0.11,0.2,0.24,0.28,0.37	c0.08,0.13,0.17,0.26,0.25,0.37c0.08,0.11,0.17,0.2,0.27,0.28c0.09,0.07,0.21,0.11,0.33,0.11c0.08,0,0.15-0.02,0.22-0.07	c0.07-0.05,0.14-0.11,0.19-0.18c0.11-0.16,0.17-0.35,0.17-0.54c0-0.23-0.08-0.44-0.24-0.61c-0.18-0.19-0.39-0.34-0.63-0.44	c-0.3-0.13-0.61-0.21-0.92-0.26c-0.37-0.06-0.74-0.09-1.11-0.09c-0.59,0-1.17,0.12-1.71,0.34c-0.6,0.24-1.13,0.62-1.56,1.1	c-0.5,0.57-0.89,1.23-1.14,1.94c-0.32,0.93-0.46,1.9-0.44,2.88v4.93h-3.77V5.72c0-0.14-0.02-0.27-0.04-0.41	c-0.04-0.18-0.13-0.35-0.26-0.47c-0.2-0.18-0.43-0.31-0.69-0.38C9.03,4.33,8.59,4.28,8.15,4.3c-0.51,0-1.02,0.04-1.52,0.12	C6.14,4.49,5.65,4.61,5.18,4.77c-0.45,0.15-0.89,0.35-1.3,0.59c-0.39,0.22-0.74,0.5-1.05,0.82C2.54,6.5,2.3,6.86,2.13,7.25	C1.96,7.66,1.87,8.1,1.87,8.55c0,0.29,0.05,0.58,0.14,0.85c0.09,0.26,0.23,0.5,0.42,0.7c0.19,0.2,0.42,0.36,0.67,0.47	c0.49,0.2,1.03,0.22,1.53,0.07c0.21-0.06,0.4-0.16,0.57-0.3c0.17-0.14,0.31-0.31,0.41-0.5c0.11-0.22,0.17-0.46,0.16-0.71	C5.79,8.96,5.76,8.79,5.7,8.64C5.65,8.52,5.59,8.41,5.5,8.31C5.43,8.24,5.34,8.18,5.24,8.14C5.16,8.1,5.07,8.08,4.98,8.08	c-0.1,0-0.19,0.03-0.27,0.09L4.46,8.35c-0.1,0.07-0.2,0.13-0.3,0.19C4.03,8.6,3.88,8.63,3.74,8.62c-0.06,0-0.11-0.01-0.17-0.02	C3.49,8.58,3.41,8.54,3.34,8.48C3.25,8.4,3.19,8.3,3.14,8.19C3.08,8.02,3.05,7.84,3.05,7.66c0-0.25,0.06-0.49,0.18-0.71	c0.13-0.22,0.29-0.42,0.48-0.6c0.2-0.18,0.43-0.35,0.67-0.48c0.24-0.14,0.49-0.25,0.74-0.35c0.23-0.09,0.46-0.16,0.7-0.22	C6.01,5.27,6.2,5.24,6.38,5.24c0.09,0,0.19,0.01,0.28,0.03c0.08,0.01,0.16,0.05,0.22,0.1C6.95,5.42,7,5.49,7.03,5.57	c0.04,0.12,0.06,0.24,0.05,0.36v5.83H5.22V12.67L5.22,12.67z"/></svg>,
	category: 'getwid-blocks',
	keywords: [
		__( 'timer', 'getwid' ),
	],
	supports: {
		alignWide: true,
		align: [ 'wide', 'full' ],
	},
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( [ 'wide', 'full' ].includes( align ) ) {
			return { 'data-align': align };
		}
	},	
	attributes,
	edit,
	save: () => {
		return null;
	},
} );