'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`relative w-full rounded-lg transition-colors hover:opacity-90 disabled:cursor-not-allowed duration-150 disabled:opacity-50
        ${
					outline
						? 'bg-white text-gray-800 border-gray-300 ring-gray-100/50 hover:from-zinc-100 hover:to-zinc-200 hover:border-gray-400 hover:text-text-gray-800 hover:bg-gradient-to-br transition duration-150'
						: 'bg-gradient-to-br from-brand-300 to-brand-400 text-white ring-1 ring-brand-300 border-none'
				}
        ${small ? 'py-2 border text-sm font-medium' : 'border-2 py-2.5 font-medium'}
      `}>
			{Icon && (
				<Icon
					size={24}
					className='absolute left-8 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
				/>
			)}
			{label}
		</button>
	);
};

export default Button;
