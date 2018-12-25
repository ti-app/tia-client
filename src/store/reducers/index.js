import { combineReducers } from 'redux';
import uiInteractionsReducer from './ui-interactions';
import locationReducer from './location';

// Root Reducer
const rootReducer = combineReducers({
	ui: uiInteractionsReducer,
	location: locationReducer,
});

export default rootReducer;
