import { withStyles } from '@mui/material/styles';

const DemoStyles = withStyles((theme) => ({
    muiOverrideClass: {
        "& .css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button":
        {
            padding: "0px !important",
        },

        "& .css-cyfsxc-MuiPickersCalendarHeader-labelContainer": {
            marginLeft: "auto !important",
        },

        "& .css-nk89i7-MuiPickersCalendarHeader-root": {
            flexDirection: "row-reverse !important",
            position: "relative",
        },

        "& .css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button":
        {
            position: "absolute",
            right: "25px",
            padding: "0px",
        },
    },
}));

export default DemoStyles;