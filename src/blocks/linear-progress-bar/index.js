import attributes from './attributes';
import save from './save';

import visible from 'GetwidUtils/visible';

import './style.scss';
import Edit from './edit';

const {
    isInViewport,
    scrollHandler
} = visible;

const {
	registerBlockType,
} = wp.blocks;

export default registerBlockType(
    'getwid/linear-progress-bar',
    {
        title: __('Linear Progress Bar', 'getwid'),
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px"><g><path d="M13,14H0v6h13h11v-6H13z M22,18H12v-2h10V18z"/></g><path d="M12,12l4-2V4H8v6 M14,9l-2,1l-2-1V6h4V9z"/></svg>,
        category: 'getwid-blocks',
        supports: {
			align: [ 'wide', 'full' ],
		},
        getEditWrapperProps( attributes ) {
            const { align } = attributes;
            if ( [ 'wide', 'full' ].includes( align ) ) {
                return { 'data-align': align };
            }
        },
        attributes: attributes,
        edit: (props) => {
            return (
                <Edit {...{
                    ...props,
                    isInViewport,
                    scrollHandler
                }}/>
            )
        },
        save: save
    }
);