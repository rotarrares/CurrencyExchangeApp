import ReactDOM from "react-dom";
import {render} from "@testing-library/react";
import React from "react";
import CurrencyCard from "./CurrencyCard";
import {Provider} from "react-redux";
import {store} from "../../app/store";
import {AppThemeProvider} from "../../app/theme";

test('renders without crashing', () => {
    const selectedCurrencyMap = {"EUR":0}
    const currency = {symbol:"EUR", name:"EURO DOLLAR"}

    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyCard selectedCurrencyMap={selectedCurrencyMap} currency={currency}/>
            </AppThemeProvider>
        </Provider>
        , div)
    ReactDOM.unmountComponentAtNode(div)
});

test('renders card correctly', () => {
    const currency = {symbol:"EUR", name:"ANGULAR DEVELOPMENT IS WORSE"}
    const selectedCurrencyMap = {"EUR":0}
    const { getByText,getByTestId } = render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyCard selectedCurrencyMap={selectedCurrencyMap} currency={currency}/>
            </AppThemeProvider>
        </Provider>
    );
    expect(getByTestId("CardContent"))
    expect(getByText("EUR - ANGULAR DEVELOPMENT IS WORSE")).toBeInTheDocument();
})
