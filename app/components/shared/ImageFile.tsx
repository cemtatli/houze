'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

const uploadPreset = 'sctr4quf';

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset={uploadPreset}
			options={{
				maxFiles: 1,
			}}>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-gray-300 flex flex-col justify-center items-center gap-4 text-gray-600'>
						<TbPhotoPlus size={48} />
						<div className='font-semibold text-lg'>Click to upload</div>
						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image fill style={{ objectFit: 'cover' }} src={value} alt='Houze' />
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
