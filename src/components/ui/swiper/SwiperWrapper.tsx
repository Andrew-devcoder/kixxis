'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductDb } from '@/types/global';
import 'swiper/css';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { getCocktails } from '@/services/cocktail.service';

export default function SwiperWrapper() {
	const [products, setProducts] = useState<ProductDb[]>([]);

	useEffect(() => {
		getCocktails()
			.then(setProducts)
			.catch((err) => console.error('Error fetching cocktails:', err));
	}, []);

	useEffect(() => {
		console.log(products);
	}, [products]);

	return (
		<Swiper
			modules={[Autoplay]}
			centeredSlidesBounds={true}
			loop={true}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
			slidesPerView={1}
			spaceBetween={20}
			// onSlideChange={() => console.log('slide change')}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{products.map((item) => (
				<SwiperSlide key={item.id} className="flex justify-center m-0">
					<div className="flex items-center justify-center">
						<div className="max-w-sm min-w-2xs w-full cursor-pointer rounded overflow-hidden">
							<img
								width="64"
								height="64"
								src={item.imageUrl || 'uploads/default.jpg'}
								// alt={item.imageAlt}
								alt=" TODO add this to create and edit page "
								className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
							/>
							<div className="flex justify-between items-end">
								<div>
									<h3 className="mt-4 text-md text-gray-700">{item.name}</h3>
									{item.description && (
										<h3 className="mt-2 text-sm text-gray-700">{item.description}</h3>
									)}
									<p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p>
								</div>

								<div>
									{item.instagramUrl && (
										<Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
											<Link href={item.instagramUrl}>details</Link>
										</Button>
									)}
								</div>
								{/* <p className="mt-1 text-sm text-gray-500">Category: {item.category}</p> */}
								{/* <p className="mt-1 text-sm text-gray-500">Active: {item.active.toString()}</p> */}
							</div>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
