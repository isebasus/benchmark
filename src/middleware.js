import agent from './agent'

import {
    ASYNC_START,
    ASYNC_END,
    SERVER_SUBMITTED,
    CHANGE_SERVER,
    STATUS_PAGE_RELOAD,
    SERVER_SET
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
            var data = JSON.parse(action.payload);

            window.localStorage.setItem('server', data)
            agent.setServer(action.payload)

            const hostname = data.hostname;
            store.dispatch({ type: SERVER_SET, hostname})
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