import { combineReducers } from 'redux';
import tabsReducer from './tabsSlice';
import expertiseReducer from './expertiseReducer';

const rootReducer = combineReducers({
  tabs: tabsReducer,
  expertise: expertiseReducer
});

export default rootReducer;