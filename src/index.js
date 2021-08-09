import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './app/serviceWorker';
import {Provider} from "react-redux";
import "@fontsource/roboto";
import {store} from "./app/store";
import {AppThemeProvider} from "./app/theme";


ReactDOM.render(
    <Provider store={store}>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
    </Provider>
    ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
