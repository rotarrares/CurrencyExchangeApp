import {setBaseCurrency} from "./baseCurrencyReducer";
import {ACTIONS} from "../actions/actionTypes";

test("Should return initial state" , ()=>{
    expect(setBaseCurrency(undefined,{})).toEqual({symbol:"EUR",value:1})
})

test("Should handle SET_BASE_CURRENCY", ()=> {
    const action ={
        type:ACTIONS.SET_BASE_CURRENCY,
        baseCurrency:{}
    }
    expect(setBaseCurrency({},action)).toEqual({})

})
