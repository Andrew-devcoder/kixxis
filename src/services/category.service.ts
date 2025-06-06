import { prisma } from '@/lib/prisma';

export async function getCategories() {
	const res = await fetch('/api/admin/categories');
	if (!res.ok) throw new Error('Failed to fetch categories');
	const data = await res.json();
	return data;
}

export async function fetchFilteredCategories() {
	const data = await getCategories();
	return data.filter((cat: { id: string }) => cat.id !== process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);
}

export async function deleteCategoryAndReassign(id: string) {
	await prisma.cocktail.updateMany({
		where: { categoryId: id },
		data: { categoryId: 'no-category' },
	});

	await prisma.category.delete({
		where: { id },
	});
}

export async function editCategory(id: string, name: string) {
	return prisma.category.update({
		where: { id },
		data: { name },
	});
}
