import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';
import userService from '../services/userService';
import { RootState } from '../store';

type Credentials = {
	email: string;
	password: string;
};

type PutUser = {
	alias: string;
	image: string | null;
};

type Image = {
	has: boolean;
	path: string;
};

export type User = {
	uid: string;
	firstName: string;
	lastName: string;
	alias: string;
	image: Image;
	duid: string;
	_id: string;
};

export type Member = User & {
	animes: number;
	mangas: number;
	videogames: number;
	waifus: number;
};

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface UserState {
	user: User;
	userStatus: Status;
	userError: string;
	isLoggedIn: boolean;
	signOutStatus: Status;
	signOutError: string;
	members: Member[];
	membersStatus: Status;
	membersError: string;
}

const initialState: UserState = {
	user: {} as User,
	userStatus: 'idle',
	userError: '',
	isLoggedIn: false,
	signOutStatus: 'idle',
	signOutError: '',
	members: [],
	membersStatus: 'idle',
	membersError: '',
};

export const signIn = createAsyncThunk<User, Credentials>(
	'user/signIn',
	async (credentials) => {
		await authService.signIn(credentials.email, credentials.password);
		const res = await userService.getUser();
		return res.data;
	}
);

export const userLoggedIn = createAsyncThunk<User>(
	'user/userLoggedIn',
	async () => {
		await authService.userLoggedIn();
		const res = await userService.getUser();
		return res.data;
	}
);

export const signOut = createAsyncThunk<void>('user/signOut', async () => {
	await authService.signOut();
});

export const putUser = createAsyncThunk<User, PutUser>(
	'user/putUser',
	async (update) => {
		const res = await userService.putUser(update.alias, update.image);
		return res.data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(signIn.pending, (state) => {
				state.userStatus = 'loading';
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.userStatus = 'succeeded';
				state.user = action.payload;
				state.isLoggedIn = true;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.userStatus = 'failed';
				state.userError = action.error.message || 'Error at sign in';
			})
			.addCase(userLoggedIn.pending, (state) => {
				state.userStatus = 'loading';
			})
			.addCase(userLoggedIn.fulfilled, (state, action) => {
				state.userStatus = 'succeeded';
				state.user = action.payload;
				state.isLoggedIn = true;
			})
			.addCase(userLoggedIn.rejected, (state, action) => {
				state.userStatus = 'failed';
				state.userError = action.error.message || 'Please sign in';
			})
			.addCase(signOut.pending, (state) => {
				state.signOutStatus = 'loading';
			})
			.addCase(signOut.fulfilled, (state) => {
				state.user = {} as User;
				state.isLoggedIn = false;
				state.signOutStatus = 'succeeded';
			})
			.addCase(signOut.rejected, (state, action) => {
				state.signOutStatus = 'failed';
				state.signOutError =
					action.error.message || 'Error at sign out';
			})
			.addCase(putUser.pending, (state) => {
				state.userStatus = 'loading';
			})
			.addCase(putUser.fulfilled, (state, action) => {
				state.userStatus = 'succeeded';
				state.user = action.payload;
			})
			.addCase(putUser.rejected, (state, action) => {
				state.userStatus = 'failed';
				state.userError =
					action.error.message || 'Error at update user';
			});
	},
});

export const selectUserStatus = (state: RootState) => ({
	userStatus: state.user.userStatus,
	userError: state.user.userError,
});

export const selectUser = (state: RootState) => ({
	isLoggedIn: state.user.isLoggedIn,
	user: state.user.user,
});

export const selectUserSignOutStatus = (state: RootState) => ({
	signOutStatus: state.user.signOutStatus,
	signOutError: state.user.signOutError,
});

export default userSlice.reducer;
