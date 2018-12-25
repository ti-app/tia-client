import { Location, Permissions } from 'expo';

export const FETCH_CURRENT_LOCATION = 'FETCH_CURRENT_LOCATION';
export const FETCH_CURRENT_LOCATION_SUCCESS = 'FETCH_CURRENT_LOCATION_SUCCESS';

export const fetchCurrentLocation = () => {
	return async (dispatch) => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);

		if (status !== 'granted') {
			// TODO: think of something what to do in here.
		}

		const location = await Location.getCurrentPositionAsync({});
		dispatch(fetchCurrentLocationSuccess(location));
	};
};

export const fetchCurrentLocationSuccess = (location) => ({
	type: FETCH_CURRENT_LOCATION_SUCCESS,
	payload: location,
});
