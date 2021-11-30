import { forwardRef, MouseEvent } from 'react';
import Button from 'react-bootstrap/Button';

interface CustomToggleProps {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CustomToggle = forwardRef<HTMLButtonElement, CustomToggleProps>(
	(props, ref) => (
		<Button
			variant='link'
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				props.onClick(e);
			}}
		>
			{props.children}
		</Button>
	)
);

export default CustomToggle;
