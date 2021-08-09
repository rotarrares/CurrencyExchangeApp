import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../app/store";
import {AppThemeProvider} from "../../app/theme";
import {render} from "@testing-library/react";
import React from "react";
import CurrencyList from "./CurrencyList";

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyList/>
            </AppThemeProvider>
        </Provider>, div)
    ReactDOM.unmountComponentAtNode(div)

});

test('renders grid correctly', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyList/>
            </AppThemeProvider>
        </Provider>
    );
    expect(getByTestId("CurrencyList"))
})
