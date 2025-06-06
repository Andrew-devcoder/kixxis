// import { getCategories } from '@/services/category.service';
// import { Description, Field, Label, Select } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import clsx from 'clsx';
// import { useEffect, useState } from 'react';

// type Category = {
// 	id: string;
// 	name: string;
// };

// type Props = {
// 	value: string;
// 	onChange: (value: string) => void;
// };

// export default function SelectCategory({ value, onChange }: Props) {
// 	const [categories, setCategories] = useState<Category[]>([]);

// 	const fetchCategories = async () => {
// 		const data = await getCategories();
// 		const filteredData = data.filter(
// 			(cat: { id: string }) => cat.id !== process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID
// 		);
// 		setCategories(filteredData);
// 	};

// 	useEffect(() => {
// 		fetchCategories();
// 	}, []);

// 	return (
// 		<Field>
// 			{/* <Label className="text-sm/6 font-medium text-white">Project status</Label> */}
// 			<Description className="text-sm/6 text-white/50">Select the appropriate category.</Description>
// 			<div className="relative">
// 				<Select
// 					value={value}
// 					onChange={(e) => onChange(e.target.value)}
// 					className={clsx(
// 						'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
// 						'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
// 						// Make the text of each option black on Windows
// 						'*:text-black'
// 					)}
// 				>
// 					<option value="" disabled>
// 						Select a category
// 					</option>

// 					{categories?.map((category) => (
// 						<option key={category.id} value={category.id}>
// 							{category.name}
// 						</option>
// 					))}
// 				</Select>
// 				<ChevronDownIcon
// 					className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
// 					aria-hidden="true"
// 				/>
// 			</div>
// 		</Field>
// 	);
// }

'use client';

import { getCategories } from '@/services/category.service';
import { Description, Field, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BaseProduct } from '@/types/global';

type Category = {
	id: string;
	name: string;
};

type Props = {
	value: Category;
	onChange: (setter: (prev: BaseProduct) => BaseProduct) => void;
};

export default function SelectCategory({ value, onChange }: Props) {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories().then((data: Category[]) => {
			const filtered = data.filter((cat) => cat.id !== process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);
			setCategories(filtered);
		});
	}, []);

	return (
		<Field>
			<Description className="text-sm/6 text-white/50">Select the appropriate category.</Description>
			<div className="relative">
				<Select
					value={value.id}
					onChange={(e) => {
						const selected = categories.find((cat) => cat.id === e.target.value);
						if (selected) {
							onChange((prev) => ({
								...prev,
								category: selected,
							}));
						}
					}}
					className={clsx(
						'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
						'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
						'*:text-black'
					)}
				>
					<option value="" disabled>
						Select a category
					</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</Select>
				<ChevronDownIcon
					className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
					aria-hidden="true"
				/>
			</div>
		</Field>
	);
}
