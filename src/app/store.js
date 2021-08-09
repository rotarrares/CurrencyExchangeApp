import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const configureStore = (initialState) =>{

  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  //             // options like actionSanitizer, stateSanitizer
  }) : compose;


  const enhancer = composeEnhancers(
      applyMiddleware(thunk)
  );


  return createStore(
      rootReducer,
      initialState,
      enhancer
  );
}

/**
 * Instance of a Redux Store configuration
 * @type {Store<EmptyObject, AnyAction>}
 */
export const store = configureStore()
