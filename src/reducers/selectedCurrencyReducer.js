import {itemsHaveError} from "../actions/actions";
import {ACTIONS} from "../actions/actionTypes";
import {symbol} from "prop-types";

/**
 * Reducer that adds a selected currency to the selected currency list
 * @param state
 * @param action {{type:string, selectedCurrency:Currency}|{type:string, rates:{...number}}|{type:string,rate:Currency}}
 * @returns {*[]|{rate: *}[]}
 */
export const selectCurrency = (state = [{symbol:"EUR",name:"European Euro",rate:1}], action) => {
    switch (action.type) {

        case ACTIONS.CURRENCY_SELECTED:
            if(action.selectedCurrency.index !== undefined)
                return state.filter((currencies,index) => index !== action.selectedCurrency.index)
            else
                return [...state, {symbol:action.selectedCurrency.symbol,name: action.selectedCurrency.name, rate:action.selectedCurrency.rate}];

        case ACTIONS.GET_RATES:
            return state.map(selectedCurrency => ({symbol:selectedCurrency.symbol,name:selectedCurrency.name, rate: action.rates[selectedCurrency.symbol]}))

        default:
            return state;
    }
}
itemsHaveError()
