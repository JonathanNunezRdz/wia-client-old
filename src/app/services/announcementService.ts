import api from './api';
import { Announcement } from 'app/reducers/announcementSlice';

const route = '/api/announcements';

const announcementService = {
	getAnnouncements: () => api.get<Announcement[]>(route),
	postAnnouncement: (title: string) =>
		api.post<Announcement>(route, { title }),
};

export default announcementService;
