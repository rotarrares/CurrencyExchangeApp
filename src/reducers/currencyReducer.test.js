
import {ACTIONS} from "../actions/actionTypes";
import {currencyFetchDataSuccess, errorMessage, itemsAreLoading, itemsHaveError} from "./currencyReducer";

test("Should return initial state" , ()=>{
    expect(itemsHaveError(undefined,{})).toEqual(false)
})

test("Should handle ITEMS_HAVE_ERROR", ()=> {
    const action ={
        type:ACTIONS.ITEMS_HAVE_ERROR,
        hasError:true,
    }
    expect(itemsHaveError({},action)).toEqual(true)
})

test("Should return initial state" , ()=>{
    expect(errorMessage(undefined,{})).toEqual("")
})

test("Should handle ERROR MESSAGE", ()=> {
    const action ={
        type:ACTIONS.ERROR_MESSAGE,
        message:"Hey boy, it's me, mario"
    }
    expect(errorMessage({},action)).toEqual("Hey boy, it's me, mario")
})

test("Should return initial state" , ()=>{
    expect(itemsAreLoading(undefined,{})).toEqual(false)
})

test("Should handle ITEMS_LOADING", ()=> {
    const action ={
        type:ACTIONS.ITEMS_LOADING,
        isLoading:true,
    }
    expect(itemsAreLoading({},action)).toEqual(true)
})

test("Should return initial state" , ()=>{
    expect(currencyFetchDataSuccess(undefined,{})).toEqual([])
})

test("Should handle CURRENCY_FETCH_DATA_SUCCESS", ()=> {
    const action ={
        type:ACTIONS.CURRENCY_FETCH_DATA_SUCCESS,
        currencies:[{symbol:"bean", name:"Rajiv"}]
    }
    expect(currencyFetchDataSuccess({},action)).toEqual([{symbol:"bean", name:"Rajiv"}])
})
