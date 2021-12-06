import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import announcementService from 'app/services/announcementService';
import { RootState } from 'app/store';
import { Status } from 'app/types';

export type Announcement = {
	date: Date;
	title: string;
	_id: string;
};

export interface AnnouncementState {
	announcements: Announcement[];
	announcementsStatus: Status;
	announcementsError: string;
	postStatus: Status;
	postError: string;
}

const initialState: AnnouncementState = {
	announcements: [] as Announcement[],
	announcementsStatus: 'idle',
	announcementsError: '',
	postStatus: 'idle',
	postError: '',
};

export const getAnnouncements = createAsyncThunk<Announcement[]>(
	'announcement/getAnnouncements',
	async () => {
		const res = await announcementService.getAnnouncements();
		return res.data;
	}
);

export const postAnnouncement = createAsyncThunk<Announcement, string>(
	'announcement/postAnnouncement',
	async (title) => {
		const res = await announcementService.postAnnouncement(title);
		return res.data;
	}
);

export const announcementSlice = createSlice({
	name: 'announcement',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAnnouncements.pending, (state) => {
				state.announcementsStatus = 'loading';
			})
			.addCase(getAnnouncements.fulfilled, (state, action) => {
				state.announcementsStatus = 'succeeded';
				state.announcements = action.payload;
			})
			.addCase(getAnnouncements.rejected, (state, action) => {
				state.announcementsStatus = 'failed';
				state.announcementsError =
					action.error.message || 'Failed to get announcements';
			})
			.addCase(postAnnouncement.pending, (state) => {
				state.postStatus = 'loading';
			})
			.addCase(postAnnouncement.fulfilled, (state, action) => {
				state.postStatus = 'succeeded';
				state.announcements.unshift(action.payload);
			})
			.addCase(postAnnouncement.rejected, (state, action) => {
				state.postStatus = 'failed';
				state.postError =
					action.error.message || 'Failed to post announcement';
			});
	},
});

export const selectAnnouncements = (state: RootState) => ({
	announcements: state.announcement.announcements,
	announcementsStatus: state.announcement.announcementsStatus,
	announcementsError: state.announcement.announcementsError,
});

export const selectPostAnnouncement = (state: RootState) => ({
	postStatus: state.announcement.postStatus,
	postError: state.announcement.postError,
});

export default announcementSlice.reducer;
