import { Location, Permissions } from 'expo';
import { Toast } from 'native-base';

import { fetchTreeGroups } from './tree.action';

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const FETCH_USER_LOCATION = 'FETCH_USER_LOCATION';
export const FETCH_USER_LOCATION_SUCCESS = 'FETCH_USER_LOCATION_SUCCESS';

export const fetchUserLocation = () => {
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
					console.log(locationData);
					dispatch(fetchUserLocationSuccess(locationData));
				} catch (err) {
					console.log('Error while getting USER position', err);
				}
			});
		} catch (err) {
			console.log('Error while asking for permisssion', err);
		}
	};
};

export const fetchUserLocationSuccess = (locationData) => ({
	type: FETCH_USER_LOCATION_SUCCESS,
	payload: locationData,
});

export const setMapCenterAndFetchTreeGroups = (locationData) => {
	return (dispatch) => {
		dispatch(setMapCenter(locationData));
		dispatch(fetchTreeGroups(locationData));
		Toast.show({
			text: 'Getting nearby plants.',
			duration: 1000,
			textStyle: {
				textAlign: 'center',
			},
		});
	};
};

export const setMapCenter = (locationData) => ({
	type: SET_MAP_CENTER,
	payload: locationData,
});
