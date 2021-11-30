import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../../app/hooks';
import CustomToggle from '../common/CustomToggle';
import { Link } from '@reach/router';
import { signOut } from '../../app/reducers/userSlice';

interface ImageBubbleProps {
	loading: boolean;
	src: string;
	alias: string;
}

const ImageBubble = ({ loading, src, alias }: ImageBubbleProps) => {
	const dispatch = useAppDispatch();

	let content = (
		<OverlayTrigger placement='bottom' overlay={<Tooltip>{alias}</Tooltip>}>
			<Image
				src='https://picsum.photos/200'
				style={{ width: '2.9rem', height: '2.9rem' }}
				roundedCircle
			/>
		</OverlayTrigger>
	);

	if (loading)
		content = (
			<Spinner
				animation='grow'
				variant='light'
				style={{ width: '2.9rem', height: '2.9rem' }}
			/>
		);

	if (src)
		content = (
			<OverlayTrigger
				placement='bottom'
				overlay={<Tooltip>{alias}</Tooltip>}
			>
				<Image
					src={src}
					style={{ width: '2.9rem', height: '2.9rem' }}
					roundedCircle
				/>
			</OverlayTrigger>
		);

	return (
		<Dropdown as={Nav.Item}>
			<Dropdown.Toggle as={CustomToggle}>{content}</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item as={Link} to='/profile'>
					Profile
				</Dropdown.Item>
				<Dropdown.Item
					as={Button}
					onClick={() => {
						dispatch(signOut());
					}}
				>
					Logout
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ImageBubble;
