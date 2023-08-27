'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import EmptyState from '@/components/EmptyState';

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
	useEffect(() => {
		toast.error(error.message);
	}, [error]);

	return <EmptyState title='Upsss' subtitle='Something went wrong!' />;
};

export default ErrorState;
