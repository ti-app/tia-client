import { TOGGLE_DRAWER, TOGGLE_FILTER } from '../actions/ui-interactions';

const initialState = {
	isDrawerOpen: false,
	isFilterOpen: false,
};

const uiInteractionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_DRAWER: {
			return {
				isDrawerOpen: !state.isDrawerOpen,
			};
		}
		case TOGGLE_FILTER: {
			return {
				isFilterOpen: !state.isFilterOpen,
			};
		}
		default: {
			return state;
		}
	}
};

export default uiInteractionsReducer;
