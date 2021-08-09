import React, {useState} from 'react';
import CurrencyGrid from "../components/currency/CurrencyGrid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {getExchangeRatesForSelected, itemsHaveError} from "../actions/actions";
import PropTypes from "prop-types";
import {Header} from "../components/Header";
import {makeStyles, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {CurrencyModal} from "../components/currency/CurrencyModal";
import {ApiKey} from "./api";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";

/**
 * Creates styles for APP Component
 * @type {(props?: any) => ClassNameMap<"floatingError"|"appContainer"|"floatingButton">}
 */
const useStyles = makeStyles((theme) => ({
    floatingButton: {
        position:"fixed",
        zIndex:9999,
        bottom:20,
        left:"50%",
        margin:0,
        transform: "translate(-50%,-50%)",
        msTransform: "translate(-50%, -50%)"
    },
    floatingError: {
        zIndex:10000,
        color:theme.palette.error.light,
    },
    appContainer:{
        minHeight:"100vh",
        padding:0,
    },

}))

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
        },
    }

}))
/**
 *
 * @param baseCurrency {object} - Store base currency
 * @param getRates {func} - Store func. to get the rates for the current base currency
 * @param isError {bool} - When an api call fails an error is reported
 * @param isLoading {bool} - When an API call is executed the loading state is reported
 * @param selectedCurrency {array} - List of currencies that were selected
 * @param errorMessage {string} - If an error is reported, the error message to be displayed
 * @param setIsError {func} - Function that allows setting the isError report
 * @returns {JSX.Element}
 * @constructor
 */
const App = ({baseCurrency, getRates, isError, isLoading, selectedCurrency,errorMessage,setIsError}) => {
    const classes = useStyles();
    useGlobalStyles();
    const [modalOpen, setModalOpen] = useState(false);


    const toggleModal = (e) => {
        if(modalOpen && Object.keys(baseCurrency).length > 0) {
            getRates(ApiKey,baseCurrency,selectedCurrency)
        }

        setModalOpen((prevState => !prevState));
    }

    const handleClose = (e) => {
            setIsError(false);
    }

    return (
        <Container fixed className={classes.appContainer}>
            <Header/>
            <CurrencyGrid modalOpen={modalOpen}/>
            <CurrencyModal toggleModal={toggleModal} modalOpen={modalOpen}/>

            {(isLoading)?<div className={classes.floatingButton}><CircularProgress /></div>:
                <Button onClick={toggleModal}
                className={classes.floatingButton}
                variant={"contained"}
                color={(!modalOpen)?"primary":"secondary"}
                size={"large"}>
                Add Currency
                </Button>
            }
            <Collapse in={isError}>
                <Alert
                    className={classes.floatingButton}
                    action={<IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <Close fontSize={"inherit"}></Close>
                    </IconButton>}
                    severity="error">
                    <Typography className={classes.floatingError}>{errorMessage}</Typography>
                </Alert>
            </Collapse>
        </Container>
    );
}

/**
 * Validation for APP props
 * @type {{isLoading: Validator<NonNullable<boolean>>, setIsError: Validator<NonNullable<(...args: any[]) => any>>, isError: Validator<NonNullable<boolean>>, selectedCurrency: Validator<NonNullable<any[]>>, errorMessage: Validator<NonNullable<string>>, getRates: Validator<NonNullable<(...args: any[]) => any>>, baseCurrency: Validator<NonNullable<object>>}}
 */
App.propTypes = {
    getRates:PropTypes.func.isRequired,
    selectedCurrency:PropTypes.array.isRequired,
    baseCurrency: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    setIsError: PropTypes.func.isRequired,
}

/**
 *
 * @param state
 * @returns {{isLoading: (function(*=, *): (boolean|*)), isError: (function(*=, *): (boolean|*)), selectedCurrency: Validator<NonNullable<any[]>> | (function(*=, *): (*[]|{rate: *}[])), errorMessage: Validator<NonNullable<string>> | (function(*=, *): string) | string, baseCurrency: Validator<NonNullable<Object>> | (function(*=, *): ({}|Validator<NonNullable<Object>>|(function(*=, *): *)))}}
 */
const mapStateToProps = (state) => ({
    selectedCurrency: state.selectedCurrency,
    baseCurrency: state.baseCurrency,
    errorMessage: state.errorMessage,
    isLoading: state.itemsAreLoading,
    isError: state.itemsHaveError,
})

/**
 *
 * @param dispatch
 * @returns {{setIsError: (function(*=): *), getRates: (function(*=, *=, *=): *)}}
 */
const mapDispatchToProps = (dispatch) => ({
    /**
     * Retrieves the Rates for the currently selected base currency from the API
     * @param api - The Api Key url parameter in the ?access_key=*key format
     * @param base {@param symbol{string} @param name{string}}- The Base Currency
     * @param selected {array} List of selected currencies that are used in operation
     * @returns {*}
     */
    getRates : (api,base,selected) => dispatch(getExchangeRatesForSelected(api,base,selected)),
    setIsError : (bool) => dispatch(itemsHaveError(bool))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
