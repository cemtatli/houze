'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from '@/components/modals/Modal';

import { categories } from '@/constants/categories';
import useRentModal from '@/hooks/useRentModal';

import Heading from '@/components/shared/Heading';
import CategoryInput from '@/components/CategoryInput';
import CountrySelect from '@/components/CountrySelect';

import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Counter from '@/components/shared/Counter';
import ImageUpload from '@/components/shared/ImageFile';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const router = useRouter();
	const rentModal = useRentModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const location = watch('location');
	const category = watch('category');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');
	const imageSrc = watch('imageSrc');

	const Map = useMemo(
		() =>
			dynamic(() => import('../shared/Map'), {
				ssr: false,
			}),
		[]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}
		setIsLoading(true);
		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Listing created!');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return 'Back';
	}, [step]);

	let body = (
		<div className='flex flex-col gap-6'>
			<Heading
				title='Which of these best describes your place?'
				subtitle='Select a category and continue'
			/>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[50vh] overflow-auto pr-4 p-0.5'>
				{categories.map((item) => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		body = (
			<div className='flex flex-col gap-6'>
				<Heading title='Where is your place located?' subtitle='Help guests find you!' />
				<CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		body = (
			<div className='flex flex-col gap-6'>
				<Heading
					title='Share some basics about your place'
					subtitle='Dont forget to enter them all so you dont stray from your real experience.'
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('guestCount', value)}
					value={guestCount}
					title='Guests'
					subtitle='How many guests do you allow?'
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('roomCount', value)}
					value={roomCount}
					title='Rooms'
					subtitle='How many rooms do you have?'
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('bathroomCount', value)}
					value={bathroomCount}
					title='Bathrooms'
					subtitle='How many bathrooms do you have?'
				/>
			</div>
		);
	}

	if (step === STEPS.IMAGES) {
		body = (
			<div className='flex flex-col gap-6'>
				<Heading
					title='Add a photo of your place'
					subtitle='Show guests what your place looks like!'
				/>
				<ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		body = (
			<div className='flex flex-col gap-6'>
				<Heading
					title='How would you describe your place?'
					subtitle='Short and sweet works best!'
				/>
				<Input
					id='title'
					label='Title'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='description'
					label='Description'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.PRICE) {
		body = (
			<div className='flex flex-col gap-6'>
				<Heading title='Now, set your price' subtitle='How much do you charge per night?' />
				<Input
					id='price'
					label='Price'
					formatPrice
					type='number'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title='Houze your home!'
			actionLabel={actionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onClose={rentModal.onClose}
			body={body}
		/>
	);
};

export default RentModal;
