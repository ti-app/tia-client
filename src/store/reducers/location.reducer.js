import { FETCH_CURRENT_LOCATION_SUCCESS } from '../actions/location.action';

const initialState = {
	currentLocation: {
		latitude: 18.5740821,
		longitude: 73.7777393,
	},
};

const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CURRENT_LOCATION_SUCCESS: {
			return { currentLocation: action.payload.coords };
		}

		default: {
			return state;
		}
	}
};

export default locationReducer;
