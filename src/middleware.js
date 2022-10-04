import agent from './agent'
import { push } from 'react-router-redux';

import {
    ASYNC_START,
    ASYNC_END,
    SERVER_SUBMITTED,
    CHANGE_SERVER,
    PING_SERVER,
    HOME_PAGE_LOADED
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
            }
        ).catch((error) => {
            console.log('ERROR', error);
            action.error = true;

            action.payload = error;
            store.dispatch({ type: ASYNC_END, promise: action.payload });
            store.dispatch(action);
        });

        return;
    }
    next(action)
}

const localStorageMiddleware = store => next => action => {
    if (action.type === SERVER_SUBMITTED || action.type === PING_SERVER)  {
        if (!action.error) {
            var data = JSON.parse(action.payload)
            var server = window.localStorage.getItem('server');
            
            if (server) {
                var parsedServer = JSON.parse(server);
                parsedServer.playerCount = data.playerCount;
                parsedServer.ping = data.ping;
                parsedServer.averagePing = data.averagePing;
                parsedServer.numberOfPings = data.numberOfPings;
                parsedServer.status = data.status;
                server = JSON.stringify(parsedServer);
            } else {
                server = action.payload
            }

            window.localStorage.setItem('server', server);
            agent.setServer(action.payload);

            if (action.type === SERVER_SUBMITTED) {
                const hostname = data.hostname;
                store.dispatch(push(`/status/${hostname}`));
                window.location.reload();
            }
        }
    } else if (action.type === CHANGE_SERVER || action.type === HOME_PAGE_LOADED) {
        window.localStorage.setItem('server', '');
        agent.setServer(null)

        if (action.type === CHANGE_SERVER) {
            store.dispatch(push('/'));
            window.location.reload();
        }
    }
    next(action);
}

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export { apiMiddleware, localStorageMiddleware }