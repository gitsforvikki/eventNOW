import { combineReducers } from "redux"; 
import * as alertReducer from '../redux/alert/alert.reducer';
import * as userReducer from '../redux/user/user.reducer';
import * as eventReducer from '../redux/events/event.reducer';

export const rootReducer = combineReducers({
    [alertReducer.alertFeatureKey] : alertReducer.reducer,
    [userReducer.userFeaturesKey]:userReducer.reducer,
    [eventReducer.eventFeaturesKey] : eventReducer.reducer
});
