import DeleteCocktailButton from '@/components/admin/forms/DelCocktail';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CocktailsPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/admin/login');
	}

	const cocktails = await prisma.cocktail.findMany({
		orderBy: { createdAt: 'desc' },
	});

	return (
		<div className="p-8">
			<div className="py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Cocktails</h1>
					<Link
						href="/admin/cocktails/create"
						className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
					>
						+ Add new
					</Link>
				</div>

				<ul className="space-y-4">
					{cocktails.map((cocktail: any) => (
						<li key={cocktail.id} className="border p-4 rounded shadow flex justify-between items-start">
							<div>
								<p className="text-lg font-semibold">{cocktail.name}</p>
								<p className="text-sm text-gray-600">{cocktail.description || 'No description'}</p>
								<p className="font-mono">{cocktail.price} €</p>
							</div>
							<div className="flex gap-2">
								<Link
									href={`/admin/cocktails/edit/${cocktail.id}`}
									className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
								>
									Edit
								</Link>
								<DeleteCocktailButton id={cocktail.id} />
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
