import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './components/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { RootReducer } from './reducers'
import Thunk from 'redux-thunk'

export const store = createStore(
  RootReducer,
  applyMiddleware(Thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
