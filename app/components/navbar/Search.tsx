'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';
import { LuSearch } from 'react-icons/lu';

import useSearchModal from '@/hooks/useSearchModal';
import useCountries from '@/hooks/useCountries';

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get('locationValue');
	const startDate = params?.get('startDate');
	const endDate = params?.get('endDate');
	const guestCount = params?.get('guestCount');

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}

		return 'Anywhere';
	}, [locationValue, getByValue]);

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			let diff = differenceInDays(end, start);

			if (diff === 0) {
				diff = 1;
			}

			return `${diff} Days`;
		}

		return 'Any Week';
	}, [startDate, endDate]);

	const guestLabel = useMemo(() => {
		if (guestCount) {
			return `${guestCount} Guests`;
		}

		return 'Add Guests';
	}, [guestCount]);
	return (
		<div
			onClick={searchModal.onOpen}
			className='w-full cursor-pointer text-sm rounded-full border py-1 group transition ring-gray-100/50 hover:ring-gray-100/80 ring-2 md:w-auto'>
			<div className='flex flex-row items-center justify-between px-1 text-gray-600 font-medium'>
				<div className='px-6 text-gray-600'> {locationLabel}</div>
				<div className='hidden flex-1 border-x px-6 text-center md:block'>{durationLabel}</div>
				<div className='flex flex-row items-center gap-2.5 text-gray-600'>
					<div className='hidden px-3 pl-4 md:block'>{guestLabel}</div>
					<span className='flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-brand-300 ring-opacity-50 bg-gradient-to-br from-brand-300 to-brand-400 group-hover:bg-brand-50 transition text-white'>
						<LuSearch strokeWidth={3} size={18} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Search;
