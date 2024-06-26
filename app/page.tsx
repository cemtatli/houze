import ClientMounted from '@/components/ClientMounted';
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';

import getListings, { IListingsParams } from '@/actions/getListings';
import getCurrentUser from '@/actions/getCurrentUser';


interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientMounted>
				<EmptyState showReset />
			</ClientMounted>
		);
	}

	return (
		<ClientMounted>
			<section className='py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings.map((listing: any) => (
					<ListingCard currentUser={currentUser} key={listing.id} data={listing} />
				))}
			</section>
		</ClientMounted>
	);
};

export default Home;
