/**
 * Getwid Icon Picker
 */

import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import './editor.scss';

const { iconList } = Getwid.settings;

export default class GetwidIconPicker extends FontIconPicker {
}

GetwidIconPicker.defaultProps = {
	...GetwidIconPicker.defaultProps,
	icons: iconList
};