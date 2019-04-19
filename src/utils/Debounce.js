/* eslint-disable func-names */
/**
 * Courtesy of https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
 * Normal event
 * event      | |      |
 * time     ----------------
 * callback   | |      |
 *
 * Call log only when it's been 100ms since the last sroll
 * scroll     | |      |
 * time     ----------------
 * callback         |      |
 *              |100|  |100|
 */
export default (callback, wait, immediate = false) => {
	let timeout = null;

	return function() {
		const callNow = immediate && !timeout;
		// eslint-disable-next-line prefer-rest-params
		const next = () => callback.apply(this, arguments);

		clearTimeout(timeout);
		timeout = setTimeout(next, wait);

		if (callNow) {
			next();
		}
	};
};
