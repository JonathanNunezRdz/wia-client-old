import {
	hideAlert,
	hideLoading,
	hideSuccess,
	showAlert,
	showSuccess,
} from '../app/reducers/statusSlice';
import { AppDispatch } from '../app/store';

export const BASE_URL =
	process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const handleError = (dispatch: AppDispatch, message: string) => {
	dispatch(hideLoading());
	dispatch(showAlert(message));
	window.setTimeout(() => dispatch(hideAlert()), 2000);
};

export const handleSuccess = (dispatch: AppDispatch, message: string) => {
	dispatch(hideLoading());
	dispatch(showSuccess(message));
	window.setTimeout(() => dispatch(hideSuccess()), 2000);
};
