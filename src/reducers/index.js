
import { combineReducers } from 'redux';
import {
    currencyFetchDataSuccess,
    itemsHaveError,
    itemsAreLoading, errorMessage,
} from './currencyReducer';
import {selectCurrency} from "./selectedCurrencyReducer";
import {setBaseCurrency} from "./baseCurrencyReducer";

/**
 * Combines store reducers
 */
export default combineReducers({
    currency: currencyFetchDataSuccess,
    selectedCurrency: selectCurrency,
    baseCurrency:setBaseCurrency,
    itemsHaveError,
    itemsAreLoading,
    errorMessage,
});
