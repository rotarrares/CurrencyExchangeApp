
import {ACTIONS} from "../actions/actionTypes";
import {selectCurrency} from "./selectedCurrencyReducer";

test("Should return initial state" , ()=>{
    expect(selectCurrency(undefined,{})).toEqual([{symbol:"EUR",name:"European Euro",rate:1}])
})

test("Should handle CURRENCY_SELECTED", ()=> {
    const action ={
        type:ACTIONS.CURRENCY_SELECTED,
        selectedCurrency:{symbol: "bean", name:"Rajiv"}
    }
    expect(selectCurrency([{symbol:"EUR",name:"European Euro",rate:1}],action)).toEqual([{symbol:"EUR",name:"European Euro",rate:1},{symbol:"bean", name:"Rajiv"}])
})

test("Should handle GET_RATES", ()=> {
    const action ={
        type:ACTIONS.GET_RATES,
        rates:[{symbol: "EUR",  rate:1.321}]
    }
    expect(selectCurrency([{symbol:"EUR",name:"European Euro",rate:1}],action)).toEqual([{symbol:"EUR",name:"European Euro"}])
})

