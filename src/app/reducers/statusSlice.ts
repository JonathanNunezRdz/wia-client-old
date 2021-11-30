import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface StatusState {
	loading: number;
	progress: number;
	showProgress: boolean;
	alert: string;
	showAlert: boolean;
	success: string;
	showSuccess: boolean;
}

const initialState: StatusState = {
	loading: 0,
	progress: 0,
	showProgress: false,
	alert: '',
	showAlert: false,
	success: '',
	showSuccess: false,
};

export const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.loading += 1;
		},
		hideLoading: (state) => {
			if (state.loading > 0) state.loading -= 1;
		},
		showProgress: (state, action: PayloadAction<number>) => {
			state.progress = action.payload;
			state.showProgress = true;
		},
		hideProgress: (state) => {
			state.progress = 0;
			state.showProgress = false;
		},
		showAlert: (state, action: PayloadAction<string>) => {
			state.alert = action.payload;
			state.showAlert = true;
		},
		hideAlert: (state) => {
			state.alert = '';
			state.showAlert = false;
		},
		showSuccess: (state, action: PayloadAction<string>) => {
			state.success = action.payload;
			state.showSuccess = true;
		},
		hideSuccess: (state) => {
			state.success = '';
			state.showSuccess = false;
		},
	},
});

export const {
	showLoading,
	hideLoading,
	showProgress,
	hideProgress,
	showAlert,
	hideAlert,
	showSuccess,
	hideSuccess,
} = statusSlice.actions;

export const selectLoading = (state: RootState) => state.status.loading;
export const selectProgress = (state: RootState) => ({
	progress: state.status.progress,
	showProgress: state.status.showProgress,
});
export const selectAlert = (state: RootState) => ({
	alert: state.status.alert,
	showAlert: state.status.showAlert,
});
export const selectSuccess = (state: RootState) => ({
	success: state.status.success,
	showSuccess: state.status.showSuccess,
});

export default statusSlice.reducer;
