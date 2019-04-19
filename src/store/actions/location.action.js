import { Location, Permissions } from 'expo';

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const FETCH_CURRENT_LOCATION = 'FETCH_CURRENT_LOCATION';
export const FETCH_CURRENT_LOCATION_SUCCESS = 'FETCH_CURRENT_LOCATION_SUCCESS';

export const fetchCurrentLocation = () => {
	return async (dispatch) => {
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);

			if (status !== 'granted') {
				// TODO: think of something what to do in here.
			}

			// I don't really understand why we need to use setTimeout()
			// Help yourself with the link below. And do tell me if you know why we need to use this.
			// https://github.com/expo/expo/issues/946#issuecomment-453181014
			setTimeout(async () => {
				try {
					const locationData = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
					dispatch(fetchCurrentLocationSuccess(locationData));
				} catch (err) {
					console.log('Error while getting current position', err);
				}
			});
		} catch (err) {
			console.log('Error while asking for permisssion', err);
		}
	};
};

export const fetchCurrentLocationSuccess = (locationData) => ({
	type: FETCH_CURRENT_LOCATION_SUCCESS,
	payload: locationData,
});

export const setMapCenter = (locationData) => ({
	type: SET_MAP_CENTER,
	payload: locationData,
});
