export const getColorByTreeStatus = (status) => {
	return {
		healthy: 'green',
		weak: 'orange',
		almostDead: 'red',
	}[status];
};
