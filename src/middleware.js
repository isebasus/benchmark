import agent from './agent'

import {
    ASYNC_START,
    ASYNC_END,
    SERVER_SUBMITTED,
    CHANGE_SERVER,
    STATUS_PAGE_RELOAD
} from './constants/actionTypes'

const apiMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        console.log(action.payload);
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then(
            res => {                
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action)
            },
            error => {
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            }
        );

        return;
    }
    next(action)
}

const localStorageMiddleware = store => next => action => {
    if (action.type === SERVER_SUBMITTED || action.type === STATUS_PAGE_RELOAD)  {
        if (!action.error) {
            window.localStorage.setItem('server', action.payload)
            agent.setServer(action.payload)
        }
    } else if (action.type === CHANGE_SERVER) {
        window.localStorage.setItem('server', '');
        agent.setServer(null)
    }
    next(action);
}

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export { apiMiddleware, localStorageMiddleware }