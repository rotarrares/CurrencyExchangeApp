import {itemsHaveError} from "../actions/actions";


/**
 * Reducer that adds a selected currency to the selected currency list
 * @param state
 * @param action {{type:string, selectedCurrency:Currency}|{type:string, rates:{...number}}|{type:string,rate:Currency}}
 * @returns {*[]|{rate: *}[]}
 */
export const selectCurrency = (state = [{symbol:"EUR",name:"European Euro",rate:1}], action) => {
    switch (action.type) {
        case 'CURRENCY_SELECTED':
            if((state.findIndex((currency)=>currency.symbol===action.selectedCurrency.symbol) !== -1))
                return [...state].filter(currencies => currencies.symbol !== action.selectedCurrency.symbol)
            else
                return [...state, action.selectedCurrency];
        case 'GET_RATES':
            return [...state].map(selectedCurrency => ({...selectedCurrency, rate: action.rates[selectedCurrency.symbol]}))
        case 'GET_RATE':
            return [...state].map((selectedCurrency) => (selectedCurrency.symbol === action.rate.symbol)?{...selectedCurrency,rate:action.rate[selectedCurrency.symbol]}:selectedCurrency)

        default:
            return state;
    }
}
itemsHaveError()
