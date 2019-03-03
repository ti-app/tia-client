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
				'x-id-token':
					'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1NjI5OWQ3YTI2ODE0NWJkOWJiMjA2Zjg4ODlkYWMwMjg0NjhmZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGktYXBwLWNsaWVudC02ZTU1NCIsIm5hbWUiOiJBa3NoYXkgTWlsbWlsZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLXVaaGlMVnZLZlFZL0FBQUFBQUFBQUFJL0FBQUFBQUFBUUtRL2duMW51SUdGVGFnL3M5Ni1jL3Bob3RvLmpwZyIsImF1ZCI6InRpLWFwcC1jbGllbnQtNmU1NTQiLCJhdXRoX3RpbWUiOjE1NTE2MDM2MjEsInVzZXJfaWQiOiJnVjBNbldDUjRXWDhjcW1PWFZGQXZZTFVKbk8yIiwic3ViIjoiZ1YwTW5XQ1I0V1g4Y3FtT1hWRkF2WUxVSm5PMiIsImlhdCI6MTU1MTYxNzIzMCwiZXhwIjoxNTUxNjIwODMwLCJlbWFpbCI6ImFrc2hheS5taWxtaWxlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNzI5NTk3MjE5MzY1MTEwNjcyIl0sImVtYWlsIjpbImFrc2hheS5taWxtaWxlQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.qEIO0yh4g7PDDOvzi-gRDDic43J4YMssF6N9VQ_4v7vFsHaTlgVcmQO9zkp8f9HAvH15PC6u9aqXOC-y2X8hz9XKRuiOp6WJEgh8RHToiMpSA5YItbyplg5-xZg195PfatekQhAhJFgaj3k6Mt4f1Zoz2bdRWYv9fAexn7w7-yMocJQVmbcfbqRnE-WuHO_eT5zos0FqU1fFvuuy4TE1TgHXugMZBN3bZcE1amcc-sfdqOB3Ax9RyoLqvnXaIN8W60je7B_cvGJGtTEZr3Z6_qkfGsT3KzgUX8qH5674s6VrZhxbz53J-btxll0iVieZT5UmTxGQ8IA_8OLsp_OxbQ',
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
