import { combineReducers } from 'redux';
import uiInteractionsReducer from './ui-interactions.reducer';
import locationReducer from './location.reducer';
import authReducer from './auth.reducer';
import treeReducer from './tree.reducer';

// Root Reducer
const rootReducer = combineReducers({
	ui: uiInteractionsReducer,
	location: locationReducer,
	auth: authReducer,
	tree: treeReducer,
});

export default rootReducer;
