import { FETCH_CURRENT_LOCATION_SUCCESS } from '../actions/location';

const initialState = {
	location: false,
};

const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CURRENT_LOCATION_SUCCESS: {
			console.log('ags', JSON.stringify(action.payload));
			return {
				currentLocation: action.payload.coords,
			};
		}

		default: {
			return state;
		}
	}
};

export default locationReducer;
