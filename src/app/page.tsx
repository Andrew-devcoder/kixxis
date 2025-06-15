import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import SwiperWrapper from '@/components/ui/swiper/SwiperWrapper';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<>
			{/* <Header /> */}
			<div className="flex flex-col h-screen justify-between ">
				<div className="bg-white flex-1 relative">
					<>
						<img
							src="/bg/Unknown.jpg"
							alt="Kixxis cocktail cafe"
							className="object-cover w-full absolute top-0 left-0 h-full md:hidden"
						/>
						<img
							src="/bg/3.jpg"
							alt="Kixxis cocktail cafe"
							className="object-cover w-full absolute top-0 left-0 h-full hidden md:block"
						/>
					</>
					<div className="absolute top-0 left-0 bg-black opacity-20 w-full h-full"></div>
					<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<h1 className="py-10 mb-12 text-center text-2xl font-bold tracking-tight text-gray-100 relative text-shadow-lg">
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
