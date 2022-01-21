import { FC } from 'react';
import { CustomRouteComponentProps } from 'app/types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Welcome from './Welcome';
import AnnouncementsWrapper from 'components/announcement/AnnouncementsWrapper';

const Dashboard: FC<CustomRouteComponentProps> = () => {
	return (
		<Container>
			<Row>
				<Col xs={12}>
					<Welcome />
				</Col>
				<Col xs={12} lg={6}>
					<AnnouncementsWrapper dashboard />
				</Col>
				<Col xs={12} lg={6}>
					{/* return notificationWrapper */}
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
