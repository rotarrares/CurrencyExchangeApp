
import React, {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {currencyFetchData, selectCurrency} from "../../actions/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import CurrencyFlag from "react-currency-flags";
import {ApiKey} from "../../app/api";

/**
 *
 * @param selectCurrency {function} - Function to select or deselect a currency
 * @param currency {Currency[]} - List of currencies
 * @param fetchData {function} - Fetch the available currency list
 * @param selectedCurrency {Currency[]} - List of selected Currencies
 * @returns {JSX.Element}
 * @constructor
 */
const CurrencyList = ({selectCurrency,currency,fetchData,selectedCurrency}) => {

    /**
     * Handles the List Item Click event. Dispatches an action to add or subtract the selected item from the list of selected currencies
     * @param currencySelected - A currency object that was selected by clicking on the List Item
     * @returns {function(*): void}
     */
    const handleClick = (currencySelected) => (e) =>{
        selectCurrency(currencySelected);
    }

    useEffect(()=>{
        if(currency.length === 0) fetchData('/symbols' + ApiKey );
    },[])

    return(
            <Paper >
                <List data-testid={"CurrencyList"}>
                {currency.map((currency,index) => {
                        return (
                            <ListItem button onClick={handleClick(currency)} selected={selectedCurrency.findIndex((curr) => (curr.symbol == currency.symbol)) != -1} key={currency.symbol}>
                                <ListItemIcon>
                                    <CurrencyFlag width={40} currency={currency.symbol}></CurrencyFlag>
                                </ListItemIcon>
                                <ListItemText primary={currency.symbol } secondary={currency.name}/>
                            </ListItem>)
                    }
                )}
                </List>
            </Paper>
    )
}

/**
 * Currency List Props Validation
 * @type {{fetchData: Validator<NonNullable<(...args: any[]) => any>>, selectCurrency: Validator<NonNullable<(...args: any[]) => any>>, selectedCurrency: Validator<NonNullable<any[]>>, currency: Validator<NonNullable<any[]>>}}
 */
CurrencyList.propTypes = {
    selectedCurrency: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    currency: PropTypes.array.isRequired,
};

/**
 * Mapping state to props of Currency List
 * @param state
 * @returns {{isLoading: (function(*=, *): (boolean|*)), selectedCurrency: Validator<NonNullable<any[]>> | (function(*=, *): (*[]|{rate: *}[])) | Validator<NonNullable<*[]>>, currency: Validator<NonNullable<any[]>> | string | Validator<NonNullable<Object>> | (function(*=, *): ({symbol: *, name: *}[]|*[])), hasError: (function(*=, *): (boolean|*))}}
 */
const mapStateToProps = (state) => {
    return {
        currency: state.currency,
        selectedCurrency: state.selectedCurrency,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

/**
 * Mapping dispatchers to props of Currency List
 * @param dispatch
 * @returns {{fetchData: (function(*=): *), selectCurrency: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(currencyFetchData(url)),
        selectCurrency : (currencySelected) => dispatch(selectCurrency(currencySelected))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
