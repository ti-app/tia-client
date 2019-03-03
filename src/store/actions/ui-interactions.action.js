export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_SPOT_DETAILS = 'TOGGLE_SPOT_DETAILS';
export const SET_LOADING = 'SET_LOADING';

export const toggleDrawer = () => ({
	type: TOGGLE_DRAWER,
});

export const toggleFilter = () => ({
	type: TOGGLE_FILTER,
});

export const toggleSpotDetails = () => ({
	type: TOGGLE_SPOT_DETAILS,
});

export const setLoading = (flag) => ({
	type: SET_LOADING,
	flag,
});
