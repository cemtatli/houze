'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@/hooks/useFavorite';
import { SafeUser } from '@/types';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
			className='relative group hover:opacity-95 transition caret-purple-50 cursor-pointer'>
			<AiOutlineHeart size={28} className='fill-white absolute -top-0.5 -right-0.5' />
			<AiFillHeart size={24} className={hasFavorited ? 'fill-brand-400' : 'fill-gray-500/50'} />
		</div>
	);
};

export default HeartButton;
