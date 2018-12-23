import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = (initialState) => {
	const middleware = applyMiddleware(thunk);

	return createStore(rootReducer, initialState, middleware);
};

const store = configureStore({});

export default store;
