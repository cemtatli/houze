"use client";

import useCountries from '@/hooks/useCountries';
import Select from "react-select";

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: number[];
	region: string;
	value: string;
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
	const { getAll } = useCountries();

	return (
		<Select
			placeholder='Anywhere'
			isClearable
			options={getAll()}
			value={value}
			onChange={(value) => onChange(value as CountrySelectValue)}
			formatOptionLabel={(option: any) => (
				<div className='flex flex-row items-center gap-2.5 shrink-0'>
					<span>{option.flag}</span>
					<div>
						{option.label},<span className='text-gray-400 ml-2 p-4'>{option.region}</span>
					</div>
				</div>
			)}
			classNames={{
				control: () => "p-2 border-2",
				input: () => "text-xl",
				option: () => "text-lg cursor-pointer",
			}}
			theme={(theme) => ({
				...theme,
				borderRadius: 4,
				colors: {
					...theme.colors,
					primary: "#333333",
					primary25: "#f5ac70e1",
				},
			})}
		/>
	);
};

export default CountrySelect;
