import { Toast } from 'native-base';
import { setLoading } from '../store/actions/ui-interactions.action';

const showErrorToast = (message, err, dispatch) => {
	console.log('Error adding a tree', err);
	Toast.show({
		text: message,
		buttonText: 'Damn',
		type: 'danger',
	});
	if (dispatch) {
		dispatch(setLoading(false));
	}
};

export default showErrorToast;
