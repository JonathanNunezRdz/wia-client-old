import { FC } from 'react';

interface DescriptionProps {
	title: string;
	bg?: string;
	color?: string;
}

const Description: FC<DescriptionProps> = ({ title, children, bg, color }) => {
	const bgColor = bg ? `bg-${bg}` : '';
	const textColor = color ? `text-${color}` : '';
	return (
		<dl className={`${bgColor} ${textColor} rounded-3 px-3 py-2`}>
			<dt>{title}</dt>
			<dd>{children}</dd>
		</dl>
	);
};

export default Description;
