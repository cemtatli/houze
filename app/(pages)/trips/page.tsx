import EmptyState from '@/components/EmptyState';
import ClientMounted from '@/components/ClientMounted';

import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';

import TripsClient from './TripsClient';

const TripsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientMounted>
				<EmptyState title='Unauthorized' subtitle='Please login' />
			</ClientMounted>
		);
	}

	const reservations = await getReservations({ userId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<ClientMounted>
				<EmptyState title='No trips found' subtitle='Looks like you have not reserved any trips.' />
			</ClientMounted>
		);
	}

	return (
		<ClientMounted>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientMounted>
	);
};

export default TripsPage;
