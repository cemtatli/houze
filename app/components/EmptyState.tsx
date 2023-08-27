'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/shared/Button';
import Heading from '@/components/shared/Heading';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = 'No exact matches',
	subtitle = 'Try changing or removing some of your filters.',
	showReset,
}) => {
	const router = useRouter();

	return (
		<section className='h-[60vh] flex flex-col gap-2 justify-center items-center '>
			<Heading center title={title} subtitle={subtitle} />
			<div className='w-40 mt-2'>
				{showReset && (
					<Button outline label='Remove all filters' onClick={() => router.push('/')} />
				)}
			</div>
		</section>
	);
};

export default EmptyState;
