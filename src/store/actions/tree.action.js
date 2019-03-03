import apiClient from '../../utils/ApiClient';
import showErrorToast from '../../utils/ErrorToast';

export const ADD_GROUP = 'ADD_GROUP';

export const addGroup = () => async (dispatch) => {
	try {
		const response = await apiClient.post('/group');
		console.log(response);
	} catch (err) {
		showErrorToast('Error adding a tree group', err, dispatch);
	}
};
