'use client';

import Image from 'next/image';
import Avvvatars from 'avvvatars-react';

import { SafeUser } from '@/types';

interface AvatarProps {
	size: number;
	value?: any; //SORRY
	currentUser?: SafeUser | null;
}

const Avatar: React.FC<AvatarProps> = ({ size, value, currentUser, ...rest }) => {
	return currentUser ? (
		<Avvvatars {...rest} value={value} size={size} style='character' />
	) : (
		<Image
			className='rounded-full bg-contain'
			src={'/assets/avatar.jpg'}
			width={size - 4}
			height={size - 4}
			alt='currentUser'
		/>
	);
};

export default Avatar;
