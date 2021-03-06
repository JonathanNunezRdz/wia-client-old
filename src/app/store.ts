import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import statusReducer from './reducers/statusSlice';
import userReducer from './reducers/userSlice';
import announcementReducer from './reducers/announcementSlice';

export const store = configureStore({
	reducer: {
		status: statusReducer,
		user: userReducer,
		announcement: announcementReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
