import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import {CardContent, CardHeader, CardMedia, IconButton, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Close} from "@material-ui/icons";
import {makeStyles, useTheme} from "@material-ui/styles";
import {connect} from "react-redux";
import {getExchangeRatesForSelected, selectCurrency, setBaseCurrency} from "../../actions/actions";
import getSymbolFromCurrency from "currency-symbol-map";
import CurrencyFlag from 'react-currency-flags';
import {ApiKey} from "../../app/api";

/**
 * Styles applied to the Currency Card
 * @type {(props?: any) => ClassNameMap<"flag"|"form"|"currencyName"|"root"|"actions"|"multilineColor"|"textField">}
 */
const useStyles = makeStyles((theme) => ({
    root: {
        background:theme.palette.background.paper,
        [theme.breakpoints.up('sm')]:{
            minHeight: 208
        },
        [theme.breakpoints.between('md','lg')]:{
            minHeight: 188
        },
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%',
    },
    flag: {
        width: 60,
    },
    multilineColor:{
        background:theme.palette.background.paper,
        marginBottom:16,
    },
    currencyName: {
        minHeight : '46px',
    },
    textField: {
        background:theme.palette.background.paper ,
        textAlign: 'right'
    }
}));

/**
 * A Currency Object
 * @typedef {Object} Currency
 * @property {string} symbol - Symbol of the currency
 * @property {string} name - Full name of the currency
 * @property {number} rate - Currency Exchange Rate (optional)
 */

/**
 * A Base Currency Object
 * @typedef {Object} BaseCurrency
 * @property {string} symbol - Symbol of the currency
 * @property {number} value - Currency value of the base currency in the store
 */

/**
 *  A card that displays information for the selected currencies. Allows the user to input a value for currency.
 * @param currency {Currency} - Current currency to be displayed
 * @param baseCurrency {BaseCurrency} - Base currency of the store
 * @param setBaseCurrency {function} - Sets the baseCurrency in the store
 * @param getRates {function} - Retrieves the exchange rates from the API
 * @param selectedCurrency {Currency[]} - List of currencies selected
 * @param selectCurrency - {function} - Adds or removes a new currency selected from the list
 * @returns {JSX.Element}
 * @constructor
 */
const CurrencyCard = ({currency,baseCurrency,setBaseCurrency,getRates,selectedCurrency,selectCurrency,}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState( currency.value|" ");
    const [error, setError] = useState(false);
    const isBase = currency.symbol === baseCurrency.symbol;

    /**
     * Selects the whole input field
     * @param e {Event} - Event handler
     */
    const handleClick = (e) => {
        (e.target.localName === "input")&&e.target.select()
    }

    /**
     * Closes the card by removing the currency from the selected list
     * @param e {Event} - Event Handler
     */
    const handleClose = e => {selectCurrency(currency)};

    /**
     *  Updates the base currency to this field and gets new rates when a new base is selected, then Validates and adds new value to the input field.
     * @param e {Event} - Event Handler
     */
    const handleChange = e => {
        if (!(currency.symbol === baseCurrency.symbol))
        {
            getRates(ApiKey,currency,selectedCurrency)
        }
        setBaseCurrency(currency.symbol, e.target.value);
        setError(isNaN(e.target.value));
        setValue(e.target.value);
    }

    /**
     * On state change of base currency or selected currency, if element does not belong to base currency calculate the field value
     * If element belongs to base currency then set the value as the value of the base field.
     */
    useEffect(() => {
        if(!isBase && baseCurrency != undefined && currency.rate !=undefined){

            setValue((isNaN(baseCurrency.value)?"0":baseCurrency.value * currency.rate))
        }
        if(isBase && value!= baseCurrency) {
            setValue(baseCurrency.value)
        }
    },[selectedCurrency, baseCurrency])


    return(

        <Card className={classes.root}
              raised={isBase}
              style={{
                  background:(isBase)&&theme.palette.background.default,
              }}
        >
            <CardHeader
                avatar={
                    <CurrencyFlag
                        className={classes.flag}
                        currency={currency.symbol}
                        width={60}/>
                }
                action={
                    <IconButton size={"small"} onClick={handleClose} color={"secondary"} aria-label={"Close"}>
                        <Close/>
                    </IconButton>
                }
                title={currency.symbol + " - " + currency.name}
                subheader={ (currency.rate!=undefined)&&"1 " + baseCurrency.symbol + " = " + 1*currency.rate + " " + currency.symbol}
            >
                 </CardHeader>

            <CardContent data-testid={"CardContent"}>
                <form className={classes.form}>
                    <TextField
                        error={error}
                        style={{
                            width:'100%',}}
                        inputProps={{inputMode: 'numeric',className: classes.textField}} // the change is here
                        InputProps={{className:classes.multilineColor,startAdornment: (currency.symbol)&&<InputAdornment position="start">{getSymbolFromCurrency(currency.symbol)}</InputAdornment>}}
                        variant="outlined"
                        label={(error)&&"Insert a valid number"}
                        onChange={handleChange}
                        onClick={handleClick}
                        value={value}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size={"small"}
                    />
                </form>
            </CardContent>
        </Card>
    )
}

/**
 * Validation of Currency Card
 * @type {{selectCurrency: Validator<NonNullable<(...args: any[]) => any>>, selectedCurrency: Validator<NonNullable<any[]>>, currency: Validator<NonNullable<object>>, setBaseCurrency: Validator<NonNullable<(...args: any[]) => any>>, getRates: Validator<NonNullable<(...args: any[]) => any>>, baseCurrency: Validator<NonNullable<object>>}}
 */
CurrencyCard.propTypes = {
    currency:PropTypes.object.isRequired,
    baseCurrency: PropTypes.object.isRequired,
    setBaseCurrency: PropTypes.func.isRequired,
    getRates:PropTypes.func.isRequired,
    selectedCurrency:PropTypes.array.isRequired,
    selectCurrency: PropTypes.func.isRequired,
};

/**
 * Maps store state to the Currency Card props
 * @param state
 * @returns {{selectedCurrency: Validator<NonNullable<any[]>> | (function(*=, *): (*[]|{rate: *}[])), baseCurrency: Validator<NonNullable<Object>> | (function(*=, *): ({}|Validator<NonNullable<Object>>|(function(*=, *): *)))}}
 */
const mapStateToProps = (state) => {
    return {
        selectedCurrency: state.selectedCurrency,
        baseCurrency: state.baseCurrency,
    };
};

/**
 * Maps dispatch functions to the Currency Card Props
 * @param dispatch
 * @returns {{selectCurrency: (function(*=): *), getRates: (function(*=, *=, *=): *), setBaseCurrency: (function(*, *): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        getRates : (api,base,selected) => dispatch(getExchangeRatesForSelected(api,base,selected)),
        setBaseCurrency : (symbol, value) => dispatch(setBaseCurrency({symbol,value})),
        selectCurrency : (currencySelected) => dispatch(selectCurrency(currencySelected)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CurrencyCard)
