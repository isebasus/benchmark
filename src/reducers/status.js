import {
    STATUS_PAGE_LOADED,
    STATUS_PAGE_RELOAD,
    PING_SERVER,
    ASYNC_START
} from '../constants/actionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case STATUS_PAGE_LOADED:
            return {
                ...state,
                server: action.server || null,
                statusLoaded: true
            };
        case STATUS_PAGE_RELOAD:
            return {
                ...state,
                statusLoaded: true
            };
        case PING_SERVER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            return {
                ...state,
                inProgress: true
            };
        default:
            return state
    }
}