export const getColorByTreeStatus = (status) => {
	return {
		healthy: '#00dbb0',
		weak: '#f5a623',
		almostDead: '#ea4335',
	}[status];
};
