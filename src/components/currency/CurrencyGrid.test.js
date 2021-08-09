import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../app/store";
import {AppThemeProvider} from "../../app/theme";
import {render} from "@testing-library/react";
import React from "react";
import CurrencyGrid from "./CurrencyGrid";

test('Currency Grid renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyGrid modalOpen={false}/>
            </AppThemeProvider>
        </Provider>
      , div)
    ReactDOM.unmountComponentAtNode(div)

});

test('CurrencyGrid renders grid correctly', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyGrid modalOpen={false}/>
            </AppThemeProvider>
        </Provider>
    );
    expect(getByTestId("CurrencyGrid"))
})
