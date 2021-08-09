import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import {store} from "./store";
import {AppThemeProvider} from "./theme";

test('renders app', () => {
  render(
    <Provider store={store}>
        <AppThemeProvider>
            <App />
        </AppThemeProvider>
    </Provider>
  );

});
