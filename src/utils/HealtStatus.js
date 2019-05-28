/* eslint-disable import/prefer-default-export */
const healthList = ['almostDead', 'weak', 'healthy'];

export const getAvgHealthStatus = (healthStatusArray) => {
	let totalHealthScore = 0;
	healthStatusArray.forEach((_) => {
		totalHealthScore += healthList.indexOf(_);
	});
	totalHealthScore /= parseFloat(healthStatusArray.length);
	totalHealthScore = parseInt(Math.round(totalHealthScore), 10);

	return healthList[totalHealthScore];
};
