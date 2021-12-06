import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectUser } from 'app/reducers/userSlice';
import moment from 'moment';

const Welcome: FC = () => {
	const { user } = useAppSelector(selectUser);

	return (
		<div className='display-3 text-center'>
			<div>Welcome Back, {user.alias || user.firstName}</div>
			<div className='h2'>
				Today is {moment().format('dddd, MMMM Do [of] YYYY')}
			</div>
		</div>
	);
};

export default Welcome;
