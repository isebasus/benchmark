import {
    SERVER_SUBMISSION_PAGE_UNLOADED,
    SERVER_SUBMITTED,
    SERVER_SAVED,
    PING_PAGE_UNLOADED,
    PING_SERVER,
    CHANGE_SERVER,
    ASYNC_START
} from '../constants/actionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case SERVER_SUBMITTED:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            }
        case SERVER_SUBMISSION_PAGE_UNLOADED:
        case PING_PAGE_UNLOADED:
            return {}; 
        case ASYNC_START:
            return {
                ...state,
                inProgress: true
            };
        case CHANGE_SERVER:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state
    }
}