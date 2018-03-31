import * as color from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing,
    fontFamily: 'Roboto, sans-serif',
    palette:    {
        primary1Color:      color.green500,
        primary2Color:      color.green700,
        primary3Color:      color.grey400,
        accent1Color:       color.pinkA200,
        accent2Color:       color.grey100,
        accent3Color:       color.grey500,
        textColor:          color.darkBlack,
        alternateTextColor: color.white,
        canvasColor:        color.white,
        borderColor:        color.grey300,
        disabledColor:      fade(color.darkBlack, 0.3),
        pickerHeaderColor:  color.green500,
        clockCircleColor:   fade(color.darkBlack, 0.07),
        shadowColor:        color.fullBlack
    }
};
