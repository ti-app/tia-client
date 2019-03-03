import { FETCH_TREE_SUCCESS } from '../actions/tree.action';

const initialState = {
	trees: [],
};

const treeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TREE_SUCCESS: {
			return { trees: action.payload };
		}

		default: {
			return state;
		}
	}
};

export default treeReducer;
