import { 
    HOME_PAGE_LOADED, 
    HOME_PAGE_UNLOADED, 
    SERVER_SAVED, 
    SERVER_SUBMITTED, 
    ASYNC_START,
    UPDATE_FIELD_EVENT
} from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                hostname: '',
                port: 0
            };
        case HOME_PAGE_UNLOADED:
            return {};
        case SERVER_SUBMITTED:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            if (action.subtype == SERVER_SUBMITTED) {
                return {...state, inProgress: true};
            }
            return state;
        case UPDATE_FIELD_EVENT:
            return { ...state, [action.key]: action.value };
        default:
            return state
    }
}