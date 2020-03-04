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
        accent1Color:       color.blueA200,
        accent2Color:       color.grey800,
        accent3Color:       color.grey500,
        textColor:          color.fullWhite,
        secondaryTextColor: (0, fade)(color.fullWhite, 0.7),
        alternateTextColor: color.white,
        canvasColor:        '#303030',
        borderColor:        color.grey300,
        disabledColor:      fade(color.darkBlack, 0.3),
        pickerHeaderColor:  color.green500,
        clockCircleColor:   fade(color.darkBlack, 0.07),
        shadowColor:        color.fullBlack,
    },
};
