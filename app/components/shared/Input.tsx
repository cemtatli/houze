'use client';

import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { LuEye, LuEyeOff, LuDollarSign } from 'react-icons/lu';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	message: any;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = 'text',
	formatPrice,
	register,
	required,
	errors,
	disabled,
	message,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='relative w-full'>
			{formatPrice && (
				<LuDollarSign className='absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-500' />
			)}
			<input
				{...register(id, {
					required,
				})}
				id={id}
				type={showPassword ? 'text' : type}
				disabled={disabled}
				placeholder=''
				className={`placeholder:text-muted-foreground focus:placeholder:text-muted-foreground/50 peer flex h-12 w-full rounded-lg border-2 bg-white px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
					formatPrice ? 'pl-10' : 'pl-5'
				} ${errors[id] ? 'border-red-500 focus:border-red-500' : ''} `}
			/>
			{type === 'password' && (
				<span
					className='absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer'
					onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
				</span>
			)}

			<label
				className={`pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-5 transform bg-white px-px text-sm duration-150 peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:text-xs ${
					formatPrice ? 'left-10' : 'left-5'
				} ${errors[id] ? 'text-red-500' : 'text-gray-500'} 
        `}>
				{message ? message : label}
			</label>
		</div>
	);
};

export default Input;
