import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import SwiperWrapper from '@/components/ui/swiper/SwiperWrapper';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<>
			{/* <Header /> */}
			<div className="flex flex-col h-screen justify-between">
				<div className="bg-white flex-1">
					<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<h1 className="py-10 text-center text-2xl font-bold tracking-tight text-gray-900">
							Kixxis cocktail cafe
						</h1>
						<SwiperWrapper />
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		</>
	);
}
