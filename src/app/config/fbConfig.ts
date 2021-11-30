import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBFMLhR0hTx_Giwkzy6n30mCKiLO2vbArc',
	authDomain: 'wia-web-app.firebaseapp.com',
	databaseURL: 'https://wia-web-app.firebaseio.com',
	projectId: 'wia-web-app',
	storageBucket: 'wia-web-app.appspot.com',
	messagingSenderId: '1026315011201',
	appId: '1:1026315011201:web:5e0727a1eecd6e0282b980',
	measurementId: 'G-PBKB7HL41K',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics();
const storage = getStorage(app);
const downloadURL = (path: string) => getDownloadURL(ref(storage, path));
const auth = getAuth();

export { downloadURL, auth };
