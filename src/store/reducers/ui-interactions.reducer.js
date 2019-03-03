import {
	TOGGLE_DRAWER,
	TOGGLE_FILTER,
	TOGGLE_SPOT_DETAILS,
	SET_LOADING,
} from '../actions/ui-interactions.action';

const initialState = {
	isDrawerOpen: false,
	isFilterOpen: false,
	isSpotDetailsOpen: false,
	loading: false,
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

		case TOGGLE_SPOT_DETAILS: {
			return {
				isSpotDetailsOpen: !state.isSpotDetailsOpen,
			};
		}

		case SET_LOADING: {
			return {
				loading: action.flag,
			};
		}
		default: {
			return state;
		}
	}
};

export default uiInteractionsReducer;
