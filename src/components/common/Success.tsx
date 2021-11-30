import Toast from 'react-bootstrap/Toast';

type SuccessProps = {
	show: boolean;
	content: string;
};

const Success = ({ show, content }: SuccessProps) => {
	return (
		<Toast show={show} className='bg-dark'>
			<Toast.Header>
				<i className='bi-check-circle-fill me-2' />
				<strong className='me-auto'>Success!</strong>
			</Toast.Header>
			<Toast.Body className='text-light'>{content}</Toast.Body>
		</Toast>
	);
};

export default Success;
