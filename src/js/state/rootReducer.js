import { combineReducers } from 'redux';
import tabsReducer from './tabsSlice';
import expertiseReducer from './expertiseReducer';
import modalReducer from './modalReducer';
import filterReducer from './filterReducer';
import baloonsReducer from './baloonsReducer';

const rootReducer = combineReducers({
  tabs: tabsReducer,
  expertise: expertiseReducer,
  modal:  modalReducer,
  filter: filterReducer,
  unsurvivalBaloons: baloonsReducer
});

export default rootReducer;