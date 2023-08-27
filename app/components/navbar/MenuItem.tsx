import { IconType } from "react-icons";

interface MenuItemProps {
	onClick: () => void;
	label: string;
	icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
	return (
		<div
			onClick={onClick}
			className='rounded-lg px-4 py-2.5 transition text-sm hover:bg-gray-100/80 flex items-center gap-x-2'>
			{Icon && <Icon size={20} className='shrink-0' />}
			{label}
		</div>
	);
};

export default MenuItem;
