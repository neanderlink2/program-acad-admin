import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { rootReducer } from '../modules'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../modules/index';
import { configureStore } from '@reduxjs/toolkit';


export const history = createBrowserHistory()
const saga = createSagaMiddleware();

const enhancers = []
const middleware = [
    thunk,
    saga,
    routerMiddleware(history)
];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const reducers = rootReducer(history);

const store = configureStore({
    middleware: [...middleware],
    enhancers: [composedEnhancers],
    reducer: reducers
});

saga.run(rootSaga);

export default store;