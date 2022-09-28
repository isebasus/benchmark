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
            const redirectURL = action.error ? null : `/status/${action.payload.hostname}`;
            return { ...state, redirectTo: redirectURL}
        case CHANGE_SERVER:
            const redirecURL = action.error ? null : '/';
            return { ...state, redirectTo: redirecURL };
        default:
            return state;
    }
};