import { TOGGLE_DRAWER, TOGGLE_FILTER, TOGGLE_SPOT_DETAILS } from '../actions/ui-interactions';

const initialState = {
	isDrawerOpen: false,
	isFilterOpen: false,
	isSpotDetailsOpen: false,
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
		case TOGGLE_SPOT_DETAILS: {
			return {
				isSpotDetailsOpen: !state.isSpotDetailsOpen,
			};
		}
		default: {
			return state;
		}
	}
};

export default uiInteractionsReducer;
