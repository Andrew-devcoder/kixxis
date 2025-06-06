import EditCocktailForm from '@/components/admin/forms/EditCocktailForm';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/admin/login');
	}

	const { id } = await params;

	const cocktail = await prisma.cocktail.findUnique({
		where: { id },
		include: {
			category: true,
		},
	});

	if (!cocktail) {
		notFound();
	}

	return (
		<div className="p-8 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-6">Edit Cocktail</h1>
			<EditCocktailForm cocktail={cocktail} />
		</div>
	);
}
