import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Announcements from './Announcements';
import NewAnnouncementWrapper from './NewAnnouncementWrapper';

interface AnnouncementsWrapperProps {
	dashboard?: boolean;
}

const AnnouncementsWrapper: FC<AnnouncementsWrapperProps> = ({ dashboard }) => {
	if (dashboard) return <Announcements dashboard />;
	return (
		<Container className='announcements'>
			<Row>
				<Col xs={12} sm={8}>
					<div className='display-3 title'>Announcements</div>
				</Col>
				<Col xs={12} lg={6}>
					<Announcements />
				</Col>
				<Col xs={12} lg={6}>
					<NewAnnouncementWrapper dashboard />
				</Col>
			</Row>
		</Container>
	);
};

export default AnnouncementsWrapper;
