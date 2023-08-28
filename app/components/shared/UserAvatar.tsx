'use client';

import Image from 'next/image';

interface UserAvatarProps {
	src: string | null | undefined;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => {
	return (
		<Image
			className='rounded-full'
			height='30'
			width='30'
			alt='Avatar'
			src={src || '/assets/avatar.jpg'}
		/>
	);
};

export default UserAvatar;
