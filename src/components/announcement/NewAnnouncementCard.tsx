import { FC, FormEvent } from 'react';
import { NewAnnoucementProps } from './NewAnnouncementWrapper';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

interface NewAnnouncementCardProps extends NewAnnoucementProps {}

const NewAnnouncementCard: FC<NewAnnouncementCardProps> = ({
	title,
	handleChangeTitle,
	validated,
	handleChangeValidated,
	handleSubmit,
}) => {
	const handlePreSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleChangeValidated(true);
		if (!e.currentTarget.checkValidity()) return;
		handleSubmit();
	};
	return (
		<Card bg='dark' text='light'>
			<Card.Header>
				<Card.Title className='mb-0'>Post an announcement!</Card.Title>
			</Card.Header>
			<Card.Body as='div'>
				<Form
					noValidate
					validated={validated}
					onSubmit={handlePreSubmit}
				>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							value={title}
							onChange={handleChangeTitle}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							Fill me out!
						</Form.Control.Feedback>
					</Form.Group>
					<Button type='submit' variant='outline-success'>
						Post!
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default NewAnnouncementCard;
