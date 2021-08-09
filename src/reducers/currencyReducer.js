/**
 * Reducer used for reporting errors on API calls
 * @param state
 * @param action {{type:string,hasError: boolean}}
 * @returns {boolean|*}
 */
export const itemsHaveError = (state = false, action) => {
    switch (action.type) {
        case 'ITEMS_HAVE_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

/**
 * Reducer used for reporting errors on API calls
 * @param state
 * @param action {{type:string, message:string}}
 * @returns {string}
 */
export const errorMessage = (state = "", action) => {
    switch (action.type) {
        case 'ERROR_MESSAGE':
            return action.message;

        default:
            return state;
    }
}

/**
 * Reducer used for reporting loading on API calls
 * @param state
 * @param action
 * @returns {boolean|*}
 */
export const itemsAreLoading = (state = false, action) => {
    switch (action.type) {
        case 'ITEMS_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


/**
 * Reducer that sets the available currencies received from API
 * @param state
 * @param action
 * @returns {{symbol: *, name: *}[]|*[]}
 */
export const currencyFetchDataSuccess = (state = [], action) => {
    switch (action.type) {
        case 'CURRENCY_FETCH_DATA_SUCCESS':
            return action.currencies;

        default:
            return state;
    }
}


