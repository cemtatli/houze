"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Container from '@/components/shared/Container';
import CategoryCard from '@/components/CategoryCard';

import { categories } from '@/constants/categories';

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get("category");
	const pathname = usePathname();
	const isMainPage = pathname === "/";

	if (!isMainPage) return null;

	return (
		<div className='border-b border-gray-200 '>
			<Container>
				<div className='flex pt-2.5 flex-row items-center gap-4 md:gap-0 justify-between overflow-x-auto overflow-y-hidden'>
					{categories.map((item) => (
						<CategoryCard
							description={item.description}
							key={item.label}
							label={item.label}
							icon={item.icon}
							selected={category === item.label}
						/>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Categories;
