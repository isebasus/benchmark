import {
    APP_LOAD,
    REDIRECT,
    SERVER_SET,
    CHANGE_SERVER
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case APP_LOAD:
            return {
                ...state,
                server: action.server || null,
                appLoaded: true
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case SERVER_SET:
            const redirectURL = action.error ? null : `/status/${action.hostname}`;
            return { ...state, redirectTo: redirectURL}
        case CHANGE_SERVER:
            const redirecURL = action.error ? null : '/';
            return { ...state, redirectTo: redirecURL };
        default:
            return state;
    }
};