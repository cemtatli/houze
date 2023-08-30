import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import getReservations from '@/actions/getReservations';

import ClientMounted from '@/components/ClientMounted';
import EmptyState from '@/components/EmptyState';

import ListingClient from './ListingClient';

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientMounted>
				<EmptyState />
			</ClientMounted>
		);
	}

	return (
		<ClientMounted>
			<ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
		</ClientMounted>
	);
};

export default ListingPage;
