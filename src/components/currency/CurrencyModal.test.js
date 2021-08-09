import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../app/store";
import {AppThemeProvider} from "../../app/theme";
import {createTheme} from "@material-ui/core";
import {render} from "@testing-library/react";
import React from "react";
import {CurrencyModal} from "./CurrencyModal";

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyModal modalOpen={true}/>
            </AppThemeProvider>
        </Provider>, div)
    ReactDOM.unmountComponentAtNode(div)

});

test('renders Modal correctly', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <AppThemeProvider>
                <CurrencyModal modalOpen={true}/>
            </AppThemeProvider>
        </Provider>
    );

    expect(getByTestId("CurrencyList"))
})
