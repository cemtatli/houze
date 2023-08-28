'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import Heading from '@/components//shared/Heading';

import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import Modal from '@/components/modals/Modal';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import { zodResolver } from '@hookform/resolvers/zod';
import registerSchema from '@/validations';

import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/register', data)
			.then(() => {
				toast.success('Registered!');
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onToggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);

	console.log(errors);
	const body = (
		<div className='flex flex-col gap-5 pt-8 md:pt-0'>
			<Heading center title='Welcome to Houze' subtitle='Create an account' />
			<Input
				message={errors.name?.message}
				id='name'
				disabled={isLoading}
				register={register}
				errors={errors}
				label='Name'
			/>
			<Input
				message={errors.email?.message}
				id='email'
				disabled={isLoading}
				register={register}
				errors={errors}
				label='Email'
			/>
			<Input
				type='password'
				id='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				message={errors.password?.message}
				label='Password'
			/>
		</div>
	);
	const footer = (
		<div className='flex flex-col gap-4 mt-4'>
			<hr />
			<Button outline label='Login with Google' icon={FcGoogle} onClick={() => signIn('google')} />
			<div className=' text-gray-500 text-center text-sm'>
				<p>
					{' '}
					Already have an account?{' '}
					<span
						onClick={onToggle}
						className=' text-gray-800 cursor-pointer font-medium hover:underline'>
						Log in
					</span>
				</p>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
		/>
	);
};

export default RegisterModal;
