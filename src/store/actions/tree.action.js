import { Toast } from 'native-base';
// import axios from 'axios';

import apiClient from '../../utils/ApiClient';

import showErrorToast from '../../utils/ErrorToast';
import NavigationUtil from '../../utils/Navigation';

export const ADD_GROUP = 'ADD_GROUP';
export const FETCH_TREE = 'FETCH_TREE';
export const FETCH_TREE_GROUP_SUCCESS = 'FETCH_TREE_GROUP_SUCCESS';
export const SET_TREE_SPOT = 'SET_TREE_SPOT';
export const RESET_TREE_SPOT = 'RESET_TREE_SPOT';
export const WATER_TREE_SUCCESS = 'WATER_TREE_SUCCESS';
export const WATER_TREE_FAILURE = 'WATER_TREE_FAILURE';
export const DELETE_TREE = 'DELETE_TREE';

// TODO: Need to implement cancel on refetch for treegroups. Following commented implmentaion is not working well.
// const { CancelToken } = axios;
// let cancel;

/**
 * Accepts parameter treeGroup which should be a FormData including an Image.
 * @param {FormData} treeGroup
 */
export const addGroup = (treeGroup) => async (dispatch, getState) => {
	const state = getState();
	const {
		location: { mapCenter },
	} = state;

	try {
		await apiClient({
			method: 'post',
			url: '/tree_group',
			data: treeGroup,
			headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
		});

		NavigationUtil.navigate('Home');
		dispatch(
			fetchTreeGroups({
				...mapCenter,
			})
		);
	} catch (err) {
		showErrorToast('Error adding a tree group.', err, dispatch);
	}
};

export const fetchTreeGroups = (
	location,
	radius = 500,
	health = 'healthy,weak,almostDead'
) => async (dispatch) => {
	try {
		const { latitude: lat, longitude: lng } = location;

		const response = await apiClient({
			url: '/tree_group',
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
		dispatch(fetchTreeGroupsSuccess(response.data));
		Toast.show({
			text: 'Getting nearby plants.',
			duration: 2000,
			textStyle: {
				textAlign: 'center',
			},
		});
		console.log('Getting Nearby Trees.');
	} catch (err) {
		showErrorToast('Error fetching nearby trees.', err, dispatch);
	}
};

export const waterTree = (tree) => async (dispatch, getState) => {
	const state = getState();
	const {
		location: { mapCenter },
	} = state;

	try {
		const { _id } = tree;
		const url = `/tree/water/${_id}`;
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

		dispatch(
			fetchTreeGroups({
				...mapCenter,
			})
		);
	} catch (err) {
		showErrorToast('Error watering the trees', err, dispatch);
		dispatch(waterTreeFailure(err));
	}
};

export const deleteTree = (tree) => async (dispatch, getState) => {
	const state = getState();
	const {
		location: { mapCenter },
	} = state;

	try {
		const { _id } = tree;
		const url = `/tree/${_id}`;
		console.log(`[tree-action::deleteTree] making request to "${url}"`);
		await apiClient({
			url,
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
			noloading: true,
		});
		console.log(`[tree-action::deleteTree] request to "${url}" was successful`);
		Toast.show({
			text: 'Tree was successfully deleted',
			duration: 1000,
			textStyle: {
				textAlign: 'center',
			},
		});
		dispatch(
			fetchTreeGroups({
				...mapCenter,
			})
		);
	} catch (err) {
		showErrorToast('Error deleting the tree.', err, dispatch);
		dispatch(waterTreeFailure(err));
	}
};

export const fetchTreeGroupsSuccess = (payload) => ({
	type: FETCH_TREE_GROUP_SUCCESS,
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
