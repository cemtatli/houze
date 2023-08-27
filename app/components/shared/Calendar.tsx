'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
	value: Range;
	onChange: (value: RangeKeyDict) => void;
	disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, disabledDates }) => {
	return (
		<DateRange
			rangeColors={['#3d3d3d']}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction='horizontal'
			showPreview
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
		/>
	);
};

export default DatePicker;
