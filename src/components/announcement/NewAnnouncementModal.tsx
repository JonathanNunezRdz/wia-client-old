import { FC, FormEvent } from 'react';
import { NewAnnoucementProps } from './NewAnnouncementWrapper';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface NewAnnouncementModalProps extends NewAnnoucementProps {
	show: boolean;
	handleToggleModal: (modal: boolean) => void;
}

const NewAnnouncementModal: FC<NewAnnouncementModalProps> = ({
	show,
	title,
	handleChangeTitle,
	validated,
	handleChangeValidated,
	handleSubmit,
	handleToggleModal,
}) => {
	const handleCloseModal = () => handleToggleModal(false);
	const handlePreSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleChangeValidated(true);
		if (!e.currentTarget.checkValidity()) return;
		handleSubmit();
	};

	return (
		<>
			<Button
				size='sm'
				variant='outline-primary'
				className='rounded-circle'
				onClick={() => handleToggleModal(true)}
			>
				<i className='bi-plus-circle' />
			</Button>
			<Modal show={show} onHide={handleCloseModal} centered>
				<Form
					noValidate
					validated={validated}
					onSubmit={handlePreSubmit}
				>
					<Modal.Header closeButton>
						<Modal.Title>Post an announcement!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
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
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='outline-secondary'
							onClick={handleCloseModal}
						>
							Cancel
						</Button>
						<Button type='submit' variant='outline-success'>
							Post!
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default NewAnnouncementModal;
