import EmptyState from '@/components/EmptyState';
import ClientMounted from '@/components/ClientMounted';

import getCurrentUser from '@/actions/getCurrentUser';
import getFavoriteListings from '@/actions/getFavoriteListings';

import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientMounted>
				<EmptyState
					title='No favorites found'
					subtitle='Looks like you have no favorite listings.'
				/>
			</ClientMounted>
		);
	}

	return (
		<ClientMounted>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientMounted>
	);
};

export default ListingPage;
