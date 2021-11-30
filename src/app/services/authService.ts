import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/fbConfig';
import api from './api';

const authService = {
	signIn: async (email: string, password: string) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await user.user.getIdToken();

			api.defaults.headers.common['Authorization'] = token;
			api.interceptors.response.use(undefined, async (error) => {
				if (error.config && error.response?.status === 401) {
					const newToken = await user.user.getIdToken(true);
					error.config.headers.common['Authorization'] = newToken;
					api.defaults.headers.common['Authorization'] = newToken;
					return api.request(error.config);
				}
			});
		} catch (error) {
			console.error('Error at signIn', error);
		}
	},
	signOut: () => signOut(auth),
	userLoggedIn: () =>
		new Promise<void>((resolve, reject) => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const token = await user.getIdToken();

					api.defaults.headers.common['Authorization'] = token;
					api.interceptors.response.use(undefined, async (error) => {
						if (error.config && error.response?.status === 401) {
							const newToken = await user.getIdToken(true);
							error.config.headers.common['Authorization'] =
								newToken;
							api.defaults.headers.common['Authorization'] =
								newToken;
							return api.request(error.config);
						}
					});

					resolve();
				} else reject('Please sign in');
			});
		}),
};

export default authService;
