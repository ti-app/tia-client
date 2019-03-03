import { combineReducers } from 'redux';
import uiInteractionsReducer from './ui-interactions.reducer';
import locationReducer from './location.reducer';
import authReducer from './auth.reducer';

// Root Reducer
const rootReducer = combineReducers({
	ui: uiInteractionsReducer,
	location: locationReducer,
	auth: authReducer,
});

export default rootReducer;
