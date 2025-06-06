import AddCocktailForm from '@/components/admin/forms/AddCocktailForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CreateCocktailPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/admin/login');
	}

	return (
		<div className="p-8 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-6">Create Cocktail</h1>
			<AddCocktailForm />
		</div>
	);
}
