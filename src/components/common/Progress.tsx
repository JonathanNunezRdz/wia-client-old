import Toast from 'react-bootstrap/Toast';
import ProgressBar from 'react-bootstrap/ProgressBar';

type ProgressProps = {
	show: boolean;
	progress: number;
};

const Progress = ({ show, progress }: ProgressProps) => (
	<Toast show={show} className='bg-dark'>
		<Toast.Body>
			<ProgressBar animated striped variant='primary' now={progress} />
		</Toast.Body>
	</Toast>
);

export default Progress;
