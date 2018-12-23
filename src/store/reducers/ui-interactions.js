import { TOGGLE_DRAWER } from '../actions/ui-interactions';

const initialState = {
	isDrawerOpen: false,
};

const uiInteractionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_DRAWER: {
			return {
				isDrawerOpen: !state.isDrawerOpen,
			};
		}

		default: {
			return state;
		}
	}
};

export default uiInteractionsReducer;
