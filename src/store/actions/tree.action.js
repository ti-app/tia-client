import { Toast } from 'native-base';

import apiClient from '../../utils/ApiClient';
import showErrorToast from '../../utils/ErrorToast';
import NavigationUtil from '../../utils/Navigation';

export const ADD_GROUP = 'ADD_GROUP';
export const FETCH_TREE = 'FETCH_TREE';
export const FETCH_TREE_SUCCESS = 'FETCH_TREE_SUCCESS';
export const SET_TREE_SPOT = 'SET_TREE_SPOT';
export const RESET_TREE_SPOT = 'RESET_TREE_SPOT';
export const WATER_TREE_SUCCESS = 'WATER_TREE_SUCCESS';
export const WATER_TREE_FAILURE = 'WATER_TREE_FAILURE';

/**
 * Accepts parameter treeGroup which should be a FormData including an Image.
 * @param {FormData} treeGroup
 */
export const addGroup = (treeGroup) => async (dispatch) => {
	try {
		await apiClient({
			method: 'post',
			url: '/tree_group',
			data: treeGroup,
			headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
		});

		NavigationUtil.navigate('Home');
	} catch (err) {
		showErrorToast('Error adding a tree group.', err, dispatch);
	}
};

export const fetchTrees = (location, radius = 10000, health = 'healthy,weak,almostDead') => async (
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
			noloading: true,
		});
		dispatch(fetchTreeSuccess(response.data));
	} catch (err) {
		showErrorToast('Error fetching nearby trees.', err, dispatch);
	}
};

export const waterTree = (tree) => async (dispatch) => {
	try {
		const { id } = tree;
		const url = `/tree/water/${id}`;
		console.log(`[tree-action::waterTree] making request to "${url}"`);
		const response = await apiClient({
			url,
			headers: {
				'Content-Type': 'application/json',
			},
			noloading: true,
		});
		console.log(`[tree-action::waterTree] request to "${url}" was successful`);
		dispatch(waterTreeSuccess(response.data));
		Toast.show({
			text: 'Successfully updated watering details',
			duration: 1000,
			textStyle: {
				textAlign: 'center',
			},
		});
	} catch (err) {
		showErrorToast('Error fetching nearby trees.', err, dispatch);
		dispatch(waterTreeFailure(err));
	}
};

export const fetchTreeSuccess = (payload) => ({
	type: FETCH_TREE_SUCCESS,
	payload,
});

export const setTreeSpot = (payload) => ({
	type: SET_TREE_SPOT,
	payload,
});

export const resetTreeSpot = () => ({
	type: RESET_TREE_SPOT,
});

export const waterTreeSuccess = (payload) => ({
	type: WATER_TREE_SUCCESS,
	payload,
});

// Not used for now
export const waterTreeFailure = (payload) => ({
	type: WATER_TREE_FAILURE,
	payload,
});
