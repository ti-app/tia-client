import apiClient from '../../utils/ApiClient';
import showErrorToast from '../../utils/ErrorToast';

export const ADD_GROUP = 'ADD_GROUP';
export const FETCH_TREE = 'FETCH_TREE';
export const FETCH_TREE_SUCCESS = 'FETCH_TREE_SUCCESS';

export const addGroup = () => async (dispatch) => {
	try {
		const response = await apiClient.post('/group');
		console.log(response);
	} catch (err) {
		showErrorToast('Error adding a tree group.', err, dispatch);
	}
};

export const fetchTrees = (location, radius = 100000, health = 'healthy,weak,almostDead') => async (
	dispatch
) => {
	try {
		const { latitude: lat, longitude: lng } = location;
		console.log(lat, lng, radius, health);

		const response = await apiClient({
			url: '/tree',
			params: {
				lat,
				lng,
				radius,
				health,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		dispatch(fetchTreeSuccess(response.data));
	} catch (err) {
		showErrorToast('Error fetching nearby trees.', err, dispatch);
	}
};

export const fetchTreeSuccess = (payload) => ({
	type: FETCH_TREE_SUCCESS,
	payload,
});
