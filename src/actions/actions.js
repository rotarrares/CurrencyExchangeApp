
import {Api} from "../app/api";
import {ACTIONS} from "./actionTypes";

/**
 * Action creator of type ITEMS_HAVE_ERROR
 * Returns an action that sets the itemsHaveError state to the provided boolean value
 * @param bool {boolean} - Boolean there is an error
 * @returns {{hasError: boolean, type: string}}
 */
export function itemsHaveError(bool) {
    return {
        type: ACTIONS.ITEMS_HAVE_ERROR,
        hasError: bool
    };
}



/**
 * Action creator of type ERROR_MESSAGE
 * Returns an action that sets the error message of the response in the store
 * @param message: string
 * @returns {{message: string, type: string}}
 */
export function errorMessage(message) {
    return {
        type: ACTIONS.ERROR_MESSAGE,
        message
    };
}
/**
 * Action creator of type ITEMS_ARE_LOADING
 * Returns an action that sets the itemsAreLoading state to the provided boolean value
 * @param bool
 * @returns {{isLoading: *, type: string}}
 */

export const itemsAreLoading = (bool) => {
    return {
        type: ACTIONS.ITEMS_LOADING,
        isLoading: bool
    };
}

/**
 * Action creator of type CURRENCY_FETCH_DATA_SUCCESS
 * Returns an action that sets the available currency list in the state
 * @returns {{type: string, currencies: {symbol: *, name: *}[]}}
 * @param currency Available currency list an object where keys are currencySymbols and values are currencyName
 */

export const currencyFetchDataSuccess = (currency) => {
    return {
        type: ACTIONS.CURRENCY_FETCH_DATA_SUCCESS,
        currencies:Object.keys(currency).map(key=>({symbol:key, name:currency[key]}))
    };
}

/**
 * Action creator of type CURRENCY_SELECTED
 * Returns an action that adds a selected currency to the list
 * @param selectedCurrency of type {symbol:string, name:string}
 * @returns {{selectedCurrency: {symbol:string, name:string}, type: string}}
 */

export const selectCurrency = (selectedCurrency) => {
    return{
        type: ACTIONS.CURRENCY_SELECTED,
        selectedCurrency
    }
}

/**
 * Action creator of type SET_BASE_CURRENCY
 * Returns an action that sets the base currency to a new currency
 * @param baseCurrency of type {symbol:string, value:number}
 * @returns {{type: string, baseCurrency: *}}
 */

export const setBaseCurrency = (baseCurrency) => ({
    type:ACTIONS.SET_BASE_CURRENCY,
    baseCurrency,
})


/**
 *
 * Action creator of type GET_RATES
 * Returns an action that sets the new rates for currencies
 * @param rates The rates object received from the API CALL
 * @returns {{rates: *, type: string}}
 */
export const ratesFetchDataSuccess = (rates) => ({
    type: ACTIONS.GET_RATES,
    rates
});

/**
 * Dispatcher calls API to get the rates for selected currencies. Will dispatch errors and loading state.
 * @returns {function(*): void}
 * @param api
 * @param baseCurrency
 * @param selectedCurrency
 */
export const getExchangeRatesForSelected = (api,baseCurrency,selectedCurrency) => (dispatch) => {
    dispatch(itemsAreLoading(true));
    dispatch(itemsHaveError(false));
    /*setTimeout(()=> {
        dispatch(itemsAreLoading(false));
        dispatch(ratesFetchDataSuccess({
            "AED": 1.566015,
            "AFN": 1.560132,
            "ALL": 1.154727,
            "AMD": 7.827874,
            "EUR": 1,
            "JPY": 132.360679,
            "USD": 1.23396,
            "BAM": 12,
        }))

    }, 1000)*/
    const symbolList = selectedCurrency.map(selected=>selected.symbol).sort().join(",");
    Api.get(`latest${api}&base=${baseCurrency.symbol}&symbols=${symbolList}`)
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response);
            }

            return response;
        })
        .then((response) =>
            dispatch(ratesFetchDataSuccess(response.data.rates)))
        .catch((error) =>
        {
            dispatch(itemsHaveError(true))
            if(error.response.status === 400){
               dispatch(errorMessage("Base Currency Not Supported in subscription plan"))
            }
            else {
                dispatch(errorMessage(error.response.data.error.message))
            }

        })
        .finally(()=>{
            dispatch(itemsAreLoading(false))
        });
}

/**
 * Dispatcher calls API to get the available currencies. Will dispatch errors and loading state.
 * @param url
 * @returns {function(*): void}
 */
export const currencyFetchData = (url) => (dispatch) => {
        dispatch(itemsHaveError(false));
        dispatch(itemsAreLoading(true));

        /*setTimeout(()=> {
            dispatch(itemsAreLoading(false));
            dispatch(currencyFetchDataSuccess({
                "AED": "United Arab Emirates Dirham",
                "AFN": "Afghan Afghani",
                "ALL": "Albanian Lek",
                "AMD": "Armenian Dram",
                "ANG": "Netherlands Antillean Guilder",
                "AOA": "Angolan Kwanza",
                "ARS":"Argentine Peso",
                "AUD":"Australian Dollar",
                "AWG":"Aruban Florin",
                "AZN":"Azerbaijani Manat",
                "BAM":"Bosnia-Herzegovina Convertible Mark",
                "BBD":"Barbadian Dollar",
                "BDT":"Bangladeshi Taka",
                "JPY": "Japanese Yen",
                "USD": "United States Dollar",
                "EUR": "Eurpoean Euro",
            }))},4000
        )
*/
        Api.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response);
                }
                return response;
            })
            .then((response) => dispatch(currencyFetchDataSuccess(response.data.symbols)))
            .catch((err) => {
                dispatch(itemsHaveError(true))
                dispatch(errorMessage(err.response.data.error.message))
                dispatch(itemsAreLoading(false))
            })
            .finally(()=>{
                dispatch(itemsAreLoading(false));
            });
    };

