import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';

type LoadingProps = {
	show: number;
};

const Loading = ({ show }: LoadingProps) => (
	<Toast show={show !== 0} className='bg-dark'>
		<Toast.Body className='text-center'>
			<Spinner animation='border' variant='primary'>
				<span className='visually-hidden'>Loading</span>
			</Spinner>
		</Toast.Body>
	</Toast>
);

export default Loading;
