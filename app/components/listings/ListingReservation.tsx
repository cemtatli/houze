'use client';

import { Range } from 'react-date-range';

import Button from '../shared/Button';
import Calendar from '../shared/Calendar';

interface ListingReservationProps {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabled,
	disabledDates,
}) => {
	return (
		<div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
			<div className='flex flex-row items-center gap-1 p-4'>
				<div className='text-2xl font-semibold'>$ {price}</div>
				<div className='font-light text-gray-600'>night</div>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={(value) => onChangeDate(value.selection)}
			/>
			<hr />
			<div className='p-4'>
				<Button disabled={disabled} label='Reserve' onClick={onSubmit} />
			</div>
			<hr />
			<div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
				<div>Total Price </div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	);
};

export default ListingReservation;
