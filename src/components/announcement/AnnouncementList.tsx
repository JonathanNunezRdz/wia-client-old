import { FC } from 'react';
import { Announcement } from 'app/reducers/announcementSlice';
import moment from 'moment';

import Col from 'react-bootstrap/Col';
import Description from 'components/common/Description';

interface AnnouncementListProps {
	announcements: Announcement[];
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements }) => {
	return (
		<>
			{announcements.map(({ _id, title, date }) => (
				<Col key={_id} xs={12}>
					<Description title={title}>
						{moment(date).fromNow()}
					</Description>
				</Col>
			))}
		</>
	);
};

export default AnnouncementList;
