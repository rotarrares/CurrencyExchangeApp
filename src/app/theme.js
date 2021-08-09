import {createTheme, makeStyles} from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import PropTypes from "prop-types";
import React from "react";



/**
 * Instance of Material-UI Theme
 * @type {Theme}
 */
const theme = createTheme({
    palette:{
        type:'light'
    }
});

/**
 * Theme Provider that uses the default theme already passed and with global styles
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const AppThemeProvider = (props) => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

/**
 * Validation of props for AppThemeProvider
 * @type {{children: Validator<NonNullable<any>>}}
 */
AppThemeProvider.propTypes = {
    children: PropTypes.any.isRequired,
}
