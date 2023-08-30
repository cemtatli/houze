import { BiTrip, BiHeart, BiCalendar, BiBuildingHouse } from 'react-icons/bi';

export const userMenu = [
	{
		label: 'Trips',
		icon: BiTrip,
		slug: '/trips',
	},
	{
		label: 'Favorites',
		icon: BiHeart,
		slug: '/favorites',
	},
	{
		label: 'Reservations',
		icon: BiCalendar,
		slug: '/reservations',
	},
	{
		label: 'Properties',
		icon: BiBuildingHouse,
		slug: '/properties',
	},
];
