export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import ClientMounted from '@/components/ClientMounted'; // TODO: Next.js hydration errors
import ModalsProvider from '@/providers/ModalsProvider';

import Navbar from '@/components/navbar';
import Container from '@/components/shared/Container';

import getCurrentUser from '@/actions/getCurrentUser';

import '@/style/globals.css';

const Font = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
	variable: '--font-[poppsins]',
});

export const metadata: Metadata = {
	title: 'Houze — Hotels, Book in 30 seconds',
	description:
		'The Best hotels are on Houze. Compare hotel prices, book hotels without prepayment. Read the latest customer reviews. See the latest pictures of hotels',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={Font.className}>
				<ClientMounted>
					<Toaster />
					<Navbar currentUser={currentUser} />
					<ModalsProvider />
				</ClientMounted>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
