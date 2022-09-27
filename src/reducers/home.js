import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, SERVER_SAVED, SERVER_SUBMITTED,  } from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case SERVER_SUBMITTED:
            return {
                ...state,
                server: action.payload.server,

            }
    }
}z