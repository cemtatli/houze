'use client'

import React from "react";
import { SafeUser } from '@/types';

import Search from './Search';
import Menu from './Menu';
import Categories from './Categories';
import Container from '@/components/shared/Container';
import Logo from '@/components/shared/Logo';

interface NavbarProps {
	currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	return (
		<>
			<header className='sticky top-0 z-10 flex h-20 items-center justify-between border-b border-gray-200 bg-white py-2.5'>
				<Container>
					<nav className='flex items-center justify-between gap-5 md:gap-0'>
						<Logo size={48} />
						<Search />
						<Menu currentUser={currentUser} />
					</nav>
				</Container>
			</header>
			<Categories />
		</>
	);
};

export default Navbar
