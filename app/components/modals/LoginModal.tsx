"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from '@/components/modals/Modal';
import Heading from '@/components/shared/Heading';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';

import { toast } from 'react-hot-toast';
import Button from '@/components/shared/Button';
import { IoLogoGoogle } from 'react-icons/io';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [registerModal, loginModal]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const body = (
		<div className='flex flex-col gap-4 pt-8 md:pt-0'>
			<Heading center title='Welcome back' subtitle='Login to your account' />
			<Input id='email' disabled={isLoading} register={register} errors={errors} label='Email' required />
			<Input
				type='password'
				id='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				label='Password'
				required
			/>
		</div>
	);
	const footer = (
		<div className='flex flex-col gap-4 mt-4'>
			<hr />
			<Button outline label='Login with Google' icon={IoLogoGoogle} onClick={() => signIn("google")} />
			<div className=' text-gray-500 text-center text-sm'>
				<p>
					First time using Houze?
					<span onClick={onToggle} className=' text-neutral-800 cursor-pointer font-medium hover:underline'>
						{" "}
						Create an account
					</span>
				</p>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={body}
			footer={footer}
		/>
	);
};

export default LoginModal;
