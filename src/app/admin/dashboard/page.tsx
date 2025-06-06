import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/admin/login?error=unauthorized');
	}

	return (
		<div className="px-8">
			<div className="py-8">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p>Only logged-in users can see this page.</p>
				<p>Welcome, {session.user?.email}</p>
			</div>
			<div className="py-4">
				<Link
					href="/admin/cocktails"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					cocktails
				</Link>
				{/* <Link
					href="/admin/categories"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					categories
				</Link> */}
			</div>
		</div>
	);
}
