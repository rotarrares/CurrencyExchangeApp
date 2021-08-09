import {createTheme, makeStyles} from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import PropTypes from "prop-types";
import React from "react";

/**
 * Global styles applied on the body
 * @type {(props?: any) => ClassNameMap<"@global">}
 */
const useGlobalStyles = makeStyles((theme)=>({
    "@global":{
        body:{
            border:0,
            background:theme.palette.background.paper,
            margin:0,
            padding:0,
        }
    }
}))

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
    useGlobalStyles();
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

/**
 * Validation of props for AppThemeProvider
 * @type {{children: Validator<NonNullable<any>>}}
 */
AppThemeProvider.propTypes = {
    children: PropTypes.any.isRequired,
}
