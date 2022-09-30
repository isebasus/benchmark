import {
    APP_LOAD,
    CHANGE_SERVER,
    SERVER_SUBMITTED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case APP_LOAD:
            return {
                ...state,
                server: action.server || null,
                appLoaded: true
            };
        case SERVER_SUBMITTED:
            var data = JSON.parse(action.payload)
            const redirectURL = action.error ? null : `/status/${data.hostname}`;
            return { ...state, redirectTo: redirectURL, server: data}
        case CHANGE_SERVER:
            const redirecURL = action.error ? null : '/';
            return { ...state, redirectTo: redirecURL };
        default:
            return state;
    }
};