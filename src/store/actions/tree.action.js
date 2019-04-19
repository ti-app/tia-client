import apiClient from '../../utils/ApiClient';
import showErrorToast from '../../utils/ErrorToast';

export const ADD_GROUP = 'ADD_GROUP';
export const FETCH_TREE = 'FETCH_TREE';
export const FETCH_TREE_SUCCESS = 'FETCH_TREE_SUCCESS';

/**
 * Accepts parameter treeGroup which should be a FormData including an Image.
 * @param {FormData} treeGroup
 */
export const addGroup = (treeGroup) => async (dispatch) => {
	try {
		const response = await apiClient({
			method: 'post',
			url: '/tree_group',
			data: treeGroup,
			headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
		});

		console.log('Response after adding a tree', response);
	} catch (err) {
		showErrorToast('Error adding a tree group.', err, dispatch);
	}
};

export const fetchTrees = (location, radius = 100000, health = 'healthy,weak,almostDead') => async (
	dispatch
) => {
	try {
		const { latitude: lat, longitude: lng } = location;

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
