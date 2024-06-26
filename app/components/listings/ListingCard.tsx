'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import useCountries from '@/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/types';

import HeartButton from '@/components/shared/Heart';
import Button from '@/components/shared/Button';

interface ListingCardProps {
	data: SafeListing;
	reservation?: SafeReservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
	currentUser,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) {
				return;
			}

			onAction?.(actionId);
		},
		[disabled, onAction, actionId]
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className='col-span-1 cursor-pointer group'>
			<div className='flex flex-col gap-1 w-full'>
				<div className='aspect-square w-full relative overflow-hidden rounded-lg'>
					<Image
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						title={location?.label}
						className='object-cover h-full w-full group-hover:scale-110 transition'
						src={data.imageSrc}
						alt='Listing'
						priority
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div title={location?.label} className='font-semibold text-lg truncate'>
					{location?.region}, {location?.label}
				</div>
				<div className='font-base text-gray-500'>{reservationDate || data.category}</div>
				<div className='flex flex-row items-center gap-1'>
					<div className='font-semibold'>$ {price}</div>
					{!reservation && <div className='font-base text-sm text-gray-600'>night</div>}
				</div>
				{onAction && actionLabel && (
					<div className='pt-4'>
						<Button disabled={disabled} small outline label={actionLabel} onClick={handleCancel} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ListingCard;