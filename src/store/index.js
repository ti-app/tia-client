import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = (initialState) => {
	const middleware = applyMiddleware(thunk);

	return createStore(rootReducer, initialState, composeWithDevTools(middleware));
};

const store = configureStore({});

export default store;
