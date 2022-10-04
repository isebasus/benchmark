import {
    APP_LOAD,
    ASYNC_END
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case APP_LOAD:
            return {
                ...state,
                server: action.server || null,
                appLoaded: true
            };
        case ASYNC_END:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            }
        default:
            return state;
    }
};