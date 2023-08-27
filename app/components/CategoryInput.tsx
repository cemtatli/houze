"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected, onClick }) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={` rounded-lg border-2 p-4 flex items-center flex-col gap-2 hover:border-brand-400 transition duration-300 cursor-pointer ${
				selected ? 'border-brand-400' : 'border-gray-200'
			}`}>
			<Icon size={34} />
			<div className='font-semibold'>{label}</div>
		</div>
	);
};

export default CategoryInput;
