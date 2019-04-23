import { FETCH_USER_LOCATION_SUCCESS, SET_MAP_CENTER } from '../actions/location.action';

const initialState = {
	userLocation: {
		latitude: 18.5740821,
		longitude: 73.7777393,
	},
	mapCenter: {
		latitude: 18.5740821,
		longitude: 73.7777393,
	},
};

const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_LOCATION_SUCCESS: {
			return { ...state, userLocation: action.payload.coords };
		}

		case SET_MAP_CENTER: {
			const { latitude, longitude } = action.payload;
			return { ...state, mapCenter: { latitude, longitude } };
		}

		default: {
			return state;
		}
	}
};

export default locationReducer;
