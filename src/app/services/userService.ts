import { User, Member } from '../reducers/userSlice';
import api from './api';

const route = '/api/users';

const userService = {
	getUser: () => api.get<User>(`${route}/one`),
	putUser: (alias: string, image: string | null) =>
		api.put<User>(route, { alias, image }),
	getMembers: () => api.get<Member[]>(`${route}/all`),
};

export default userService;
