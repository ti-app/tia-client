import { UPDATE_USER_STATUS } from '../actions/auth.action';

const initialState = {
	user: null,
	isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_STATUS: {
			const { user, isLoggedIn } = action.payload;
			return { user, isLoggedIn };
		}

		default: {
			return state;
		}
	}
};

export default authReducer;
