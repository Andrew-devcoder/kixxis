import { ProductDb } from '@/types/global';

export const getCocktails = async (): Promise<ProductDb[]> => {
	const res = await fetch('/api/admin/cocktails');
	if (!res.ok) throw new Error('Failed to fetch cocktails');
	return res.json();
};
