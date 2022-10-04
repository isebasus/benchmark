import {
    STATUS_PAGE_LOADED,
    STATUS_PAGE_UNLOADED,
    PING_SERVER,
    ASYNC_START,
    ASYNC_END
} from '../constants/actionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case STATUS_PAGE_LOADED:
            return {
                ...state,
                server: action.server || null,
                hostname: action.host || null,
                port: action.port || null,
                statusLoaded: true,
                inProgress: false
            };
        case STATUS_PAGE_UNLOADED:
            return {};
        case PING_SERVER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            if (action.subtype == PING_SERVER) {
                return {...state, inProgress: true};
            }
            return state;
        default:
            return state
    }
}