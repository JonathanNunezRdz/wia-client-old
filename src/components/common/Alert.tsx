import Toast from 'react-bootstrap/Toast';

type AlertProps = {
	show: boolean;
	content: string;
};

const Alert = ({ show, content }: AlertProps) => (
	<Toast show={show} className='bg-dark'>
		<Toast.Header className=''>
			<i className='bi-exclamation-triangle-fill me-2' />
			<strong className='me-auto'>Error!</strong>
		</Toast.Header>
		<Toast.Body className='text-light'>{content}</Toast.Body>
	</Toast>
);

export default Alert;
