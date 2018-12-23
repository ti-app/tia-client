import { combineReducers } from 'redux';
import uiInteractionsReducer from './ui-interactions';

// Root Reducer
const rootReducer = combineReducers({
	ui: uiInteractionsReducer,
});

export default rootReducer;
