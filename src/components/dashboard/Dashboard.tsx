import { FC } from 'react';
import { CustomRouteComponentProps } from 'app/types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Welcome from './Welcome';

const Dashboard: FC<CustomRouteComponentProps> = () => {
	return (
		<Container>
			<Row>
				<Col xs={12}>
					<Welcome />
				</Col>
				<Col xs={12}>
					{/* Announcements */}
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
