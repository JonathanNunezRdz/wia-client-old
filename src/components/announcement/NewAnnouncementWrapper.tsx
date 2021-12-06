import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	postAnnouncement,
	selectPostAnnouncement,
} from 'app/reducers/announcementSlice';
import { showLoading } from 'app/reducers/statusSlice';
import { handleError, handleSuccess } from 'utils';

import NewAnnouncementCard from './NewAnnouncementCard';
import NewAnnouncementModal from './NewAnnouncementModal';

interface NewAnnouncementWrapperProps {
	dashboard?: boolean;
}

export interface NewAnnoucementProps {
	title: string;
	handleChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
	validated: boolean;
	handleChangeValidated: (validated: boolean) => void;
	handleSubmit: () => void;
}

const NewAnnouncementWrapper: FC<NewAnnouncementWrapperProps> = ({
	dashboard,
}) => {
	const dispatch = useAppDispatch();
	const { postError, postStatus } = useAppSelector(selectPostAnnouncement);

	const [title, setTitle] = useState('');
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);

	const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	const handleChangeValidated = (valid: boolean) => setValidated(valid);
	const handleToggleModal = (modal: boolean) => setShow(modal);

	const resetState = useCallback(() => {
		setTitle('');
		setValidated(false);
		setShow(false);
	}, [dashboard]);

	const handleSubmit = () => dispatch(postAnnouncement(title));

	useEffect(() => {
		if (postStatus === 'loading') dispatch(showLoading());
		else if (postStatus === 'succeeded') {
			handleSuccess(dispatch, 'You have posted an announcement!');
			resetState();
		} else if (postStatus === 'failed') handleError(dispatch, postError);
	}, [postStatus, postError, dispatch]);

	if (dashboard)
		return (
			<NewAnnouncementModal
				show={show}
				title={title}
				handleChangeTitle={handleChangeTitle}
				validated={validated}
				handleChangeValidated={handleChangeValidated}
				handleSubmit={handleSubmit}
				handleToggleModal={handleToggleModal}
			/>
		);
	return (
		<NewAnnouncementCard
			title={title}
			handleChangeTitle={handleChangeTitle}
			validated={validated}
			handleChangeValidated={handleChangeValidated}
			handleSubmit={handleSubmit}
		/>
	);
};

export default NewAnnouncementWrapper;
