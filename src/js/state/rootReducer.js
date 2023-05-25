import { combineReducers } from 'redux';
import tabsReducer from './tabsSlice';

const rootReducer = combineReducers({
  tabs: tabsReducer,
});

export default rootReducer;