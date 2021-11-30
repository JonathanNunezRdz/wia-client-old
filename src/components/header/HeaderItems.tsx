import { Link } from '@reach/router';
import Nav from 'react-bootstrap/Nav';
import ImageBubble from './ImageBubble';

interface HeaderItemsProps {
	handleClick: () => void;
	loading: boolean;
	src: string;
	alias: string;
	isLoggedIn: boolean;
}

const HeaderItems = ({
	handleClick,
	loading,
	src,
	alias,
	isLoggedIn,
}: HeaderItemsProps) => {
	if (!isLoggedIn) return null;

	const pathname = window.location.pathname.split('/')[1];
	const navItems = [
		'animes',
		'mangas',
		'videogames',
		'waifus',
		'trades',
		'announcements',
		'members',
	];

	return (
		<>
			{navItems.map((route) => (
				<Nav.Item key={route} onClick={handleClick}>
					<Nav.Link
						className='ps-3 ps-lg-2 py-lg-3'
						active={pathname === route}
						as={Link}
						to={`/${route}`}
					>
						<span className='text-capitalize'>{route}</span>
					</Nav.Link>
				</Nav.Item>
			))}
			<ImageBubble loading={loading} src={src} alias={alias} />
		</>
	);
};

export default HeaderItems;
