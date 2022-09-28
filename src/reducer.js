import { combineReducers } from "redux";

import home from './reducers/home';
import status from './reducers/status';
import common from './reducers/common'

export default combineReducers({
    home,
    status,
    common
});