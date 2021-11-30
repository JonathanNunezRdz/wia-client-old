import { useAppSelector } from '../../app/hooks';
import Alert from './Alert';
import Loading from './Loading';
import Progress from './Progress';
import Success from './Success';
import {
	selectAlert,
	selectLoading,
	selectProgress,
	selectSuccess,
} from '../../app/reducers/statusSlice';

const Status = () => {
	const loading = useAppSelector(selectLoading);
	const { progress, showProgress } = useAppSelector(selectProgress);
	const { alert, showAlert } = useAppSelector(selectAlert);
	const { success, showSuccess } = useAppSelector(selectSuccess);
	return (
		<div aria-live='polite' aria-atomic='true' className='status'>
			<div className='toasts'>
				<Progress show={showProgress} progress={progress} />
				<Loading show={loading} />
				<Alert show={showAlert} content={alert} />
				<Success show={showSuccess} content={success} />
			</div>
		</div>
	);
};

export default Status;
