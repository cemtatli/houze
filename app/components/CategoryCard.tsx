"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryCardProps {
	icon: IconType;
	label: string;
	description?: string;
	selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({icon: Icon, label, selected}) => {
	const router = useRouter();
	const params = useSearchParams();

	/* Query Params */
	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) currentQuery = qs.parse(params.toString());

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		if (params?.get('category') === label) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{skipNull: true}
		);

		router.push(url);
	}, [label, router, params]);

	return (
		<div
			onClick={handleClick}
			className={`flex flex-col items-center justify-center p-2 text-center transition duration-150 cursor-pointer ${
				selected
					? 'text-brand-400 hover:text-brand-400 scale-110 transition ease-in'
					: 'border-transparent text-gray-400 hover:text-gray-900'
			}`}>
			<Icon size={28} />
			<p title={label} className='font-medium text-sm mt-1 truncate'>
				{label}
			</p>
		</div>
	);
};

export default CategoryCard;
