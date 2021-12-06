import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	Announcement,
	getAnnouncements,
	selectAnnouncements,
} from 'app/reducers/announcementSlice';
import { hideLoading, showLoading } from 'app/reducers/statusSlice';
import { handleError } from 'utils';

import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import AnnouncementList from './AnnouncementList';
import NewAnnouncementWrapper from './NewAnnouncementWrapper';

interface AnnouncementsProps {
	dashboard?: boolean;
}

const Announcements: FC<AnnouncementsProps> = ({ dashboard }) => {
	const dispatch = useAppDispatch();
	const { announcements, announcementsStatus, announcementsError } =
		useAppSelector(selectAnnouncements);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (announcementsStatus === 'idle') dispatch(getAnnouncements());
		else if (announcementsStatus === 'loading') {
			dispatch(showLoading());
			setLoading(true);
		} else if (announcementsStatus === 'succeeded') {
			dispatch(hideLoading());
			setLoading(false);
		} else if (announcementsStatus === 'failed') {
			handleError(dispatch, announcementsError);
			setLoading(false);
		}
	}, [announcementsStatus, announcementsError, dispatch]);

	const content = getContent(loading, announcements);

	return (
		<Card bg='dark' text='light'>
			<Card.Header>
				<Card.Title className='mb-0'>
					Announcements{' '}
					{dashboard && <NewAnnouncementWrapper dashboard />}
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<Card.Text as='div'>
					<Container>
						<Row>{content}</Row>
					</Container>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

const getContent = (loading: boolean, announcements: Announcement[]) => {
	if (loading)
		return (
			<Col xs={12} className='text-center'>
				<Spinner animation='border' variant='light' />
			</Col>
		);
	if (announcements.length === 0)
		return (
			<Col xs={12}>
				<div>The WIA doesn't have any announcements.</div>
			</Col>
		);
	return <AnnouncementList announcements={announcements} />;
};

export default Announcements;
