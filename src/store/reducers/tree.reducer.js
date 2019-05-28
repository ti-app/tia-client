import { FETCH_TREE_SUCCESS, RESET_TREE_SPOT, SET_TREE_SPOT } from '../actions/tree.action';

const initialState = {
	trees: [],
	// holds the details of the tree currently displayed on HomeScree / HomeMap
	spotDetails: null,
};

const treeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TREE_SUCCESS: {
			return { trees: action.payload };
		}

		case SET_TREE_SPOT: {
			return {
				...state,
				spotDetails: { ...action.payload },
			};
		}

		case RESET_TREE_SPOT: {
			return {
				...state,
				spotDetails: null,
			};
		}

		default: {
			return state;
		}
	}
};

export default treeReducer;
