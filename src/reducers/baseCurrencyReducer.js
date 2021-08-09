/**
 * Reducer that sets the base currency
 * @param state
 * @param action {{type:string, baseCurrency:BaseCurrency}}
 * @returns {{}|Validator<NonNullable<Object>>|(function(*=, *): (*))}
 */
export const setBaseCurrency = (state = {symbol:"EUR",value:1}, action) => {
    switch (action.type) {
        case 'SET_BASE_CURRENCY':
            return action.baseCurrency;
        default:
            return state;
    }
}
