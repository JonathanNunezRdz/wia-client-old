import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Link } from '@reach/router';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideLoading, showLoading } from '../../app/reducers/statusSlice';
import { downloadURL } from '../../app/config/fbConfig';
import {
	selectUser,
	selectUserSignOutStatus,
} from '../../app/reducers/userSlice';
import { CustomRouteComponentProps } from '../../app/types';
import { handleError } from '../../utils';
import HeaderItems from './HeaderItems';
import Content from '../common/Content';

interface HeaderProps extends CustomRouteComponentProps {
	children: ReactNode;
}

const Header = (props: HeaderProps) => {
	const dispatch = useAppDispatch();
	const { user, isLoggedIn } = useAppSelector(selectUser);
	const { signOutError, signOutStatus } = useAppSelector(
		selectUserSignOutStatus
	);

	const [expanded, setExpanded] = useState(false);
	const [userAvatar, setUserAvatar] = useState('');
	const [loading, setLoading] = useState(false);
	const [bannerSrc, setBannerSrc] = useState('');

	const getBanner = useCallback(async () => {
		try {
			const url = await downloadURL('static/Banner.png');
			setBannerSrc(url);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const getUserImage = useCallback(async () => {
		try {
			if (isLoggedIn && user.image.has) {
				setLoading(true);
				const url = await downloadURL(user.image.path);
				setUserAvatar(url);
				setLoading(false);
			}
		} catch (error) {
			console.error(error);
		}
	}, [user, isLoggedIn]);

	useEffect(() => {
		getBanner();
	}, [getBanner]);

	useEffect(() => {
		getUserImage();
	}, [getUserImage]);

	useEffect(() => {
		if (signOutStatus === 'loading') dispatch(showLoading());
		else if (signOutStatus === 'succeeded') dispatch(hideLoading());
		else if (signOutStatus === 'failed')
			handleError(dispatch, signOutError);
	}, [signOutStatus, dispatch, signOutError]);

	const handleClick = () => {
		setExpanded(false);
	};

	const handleToggle = () => {
		setExpanded((prevExpanded) => !prevExpanded);
	};

	return (
		<>
			<Navbar expanded={expanded} expand='lg' bg='light'>
				<Navbar.Brand onClick={handleClick} as={Link} to='/'>
					<Image src={bannerSrc} className='banner ms-2' />
				</Navbar.Brand>
				<Navbar.Toggle
					className='me-3'
					aria-controls='navbar'
					onClick={handleToggle}
				/>
				<Navbar.Collapse>
					<Nav className='ms-auto'>
						<HeaderItems
							alias={user.alias}
							handleClick={handleClick}
							isLoggedIn={isLoggedIn}
							loading={loading}
							src={userAvatar}
						/>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Content handleClick={handleClick} isLoggedIn={isLoggedIn}>
				{props.children}
			</Content>
		</>
	);
};

export default Header;
