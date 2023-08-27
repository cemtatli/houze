import EmptyState from '@/components/EmptyState';
import ClientMounted from '@/components/ClientMounted';

import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';

import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <EmptyState title='Unauthorized' subtitle='Please login' />;
	}

	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<ClientMounted>
				<EmptyState title='No properties found' subtitle='Looks like you have no properties.' />
			</ClientMounted>
		);
	}

	return (
		<ClientMounted>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</ClientMounted>
	);
};

export default PropertiesPage;
