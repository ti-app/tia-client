export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';

export const updateUserStatus = (isLoggedIn, user) => ({
	type: UPDATE_USER_STATUS,
	payload: { user, isLoggedIn },
});
