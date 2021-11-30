import { FC, ReactNode } from 'react';
import Login from './Login';

interface ContentProps {
	children: ReactNode;
	handleClick: () => void;
	isLoggedIn: boolean;
}

const Content: FC<ContentProps> = ({ children, handleClick, isLoggedIn }) => {
	if (!isLoggedIn) return <Login />;
	return <div onClick={handleClick}>{children}</div>;
};

export default Content;
