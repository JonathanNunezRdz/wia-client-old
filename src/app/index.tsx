import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/index.scss';
import { useCallback, useEffect } from 'react';
import { Router, Location, navigate } from '@reach/router';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUserStatus, userLoggedIn } from 'app/reducers/userSlice';
import { hideLoading, showLoading } from 'app/reducers/statusSlice';
import { handleError } from 'utils';

import { Counter } from 'features/counter/Counter';
import Status from 'components/common/Status';
import Header from 'components/header/Header';

type OnRouteChangeWorkerProps = {
	pathname: string;
	action: () => void;
};

type OnRouteChangeProps = {
	action: () => void;
};

const App = () => {
	const dispatch = useAppDispatch();
	const { userStatus, userError } = useAppSelector(selectUserStatus);

	const action = useCallback(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (userStatus === 'idle') dispatch(userLoggedIn());
		else if (userStatus === 'loading') dispatch(showLoading());
		else if (userStatus === 'succeeded') dispatch(hideLoading());
		else if (userStatus === 'failed') {
			navigate('/');
			handleError(dispatch, userError);
		}
	}, [userStatus, dispatch, userError]);

	return (
		<>
			<Status />
			<Router>
				<Header path='/'>
					<Counter exact path='/counter' />
				</Header>
			</Router>
			<OnRouteChange action={action} />
		</>
	);
};

const OnRouteChangeWorker = ({
	pathname,
	action,
}: OnRouteChangeWorkerProps) => {
	useEffect(() => {
		action();
	}, [action, pathname]);
	return null;
};

const OnRouteChange = ({ action }: OnRouteChangeProps) => (
	<Location>
		{({ location }) => (
			<OnRouteChangeWorker pathname={location.pathname} action={action} />
		)}
	</Location>
);

export default App;
