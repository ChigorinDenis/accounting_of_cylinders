import { combineReducers } from 'redux';
import tabsReducer from './tabsSlice';
import expertiseReducer from './expertiseReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  tabs: tabsReducer,
  expertise: expertiseReducer,
  modal:  modalReducer
});

export default rootReducer;