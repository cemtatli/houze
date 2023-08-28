'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';

import ListingCategory from './ListingCategory';
import UserAvatar from '../shared/UserAvatar';

const Map = dynamic(() => import('../shared/Map'), {
	ssr: false,
});

interface ListingInfoProps {
	user: SafeUser;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category: { icon: IconType; label: string; description: string } | undefined;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue,
}) => {
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.latlng;

	return (
		<div className='col-span-4 flex flex-col gap-6'>
			<div className='flex flex-col gap-2'>
				<div className='text-lg md:text-xl font-semibold flex flex-row items-center gap-2'>
					<UserAvatar src={user?.image} />
					<div>Hosted by {user?.name}</div>
				</div>
				<div className='flex flex-row items-center gap-4 font-light text-gray-500'>
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<p className='text-gray-500 font-light'>{description}</p>
			<hr />
			<Map center={coordinates} />
		</div>
	);
};

export default ListingInfo;
