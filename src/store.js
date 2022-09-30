import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { apiMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';

import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const benchmarkRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV == 'production') {
        return applyMiddleware(benchmarkRouterMiddleware, apiMiddleware, localStorageMiddleware);
    } else {
        return applyMiddleware(benchmarkRouterMiddleware, apiMiddleware, localStorageMiddleware, createLogger())
    }
}

export const store = createStore(
    reducer, composeWithDevTools(getMiddleware())
)