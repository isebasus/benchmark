import agent from './agent'

import {
    ASYNC_START,
    ASYNC_END
} from './constants/actionTypes'

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then(
            res => {
                const currentState = store.getState()
                
                // TODO check currentStates
                
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action)
            },
            error => {
                const currentState = store.getState()
                
                // TODO check currentState

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

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export { promiseMiddleware }