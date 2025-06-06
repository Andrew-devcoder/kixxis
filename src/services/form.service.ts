import { ProductDb, ProductPayload } from '@/types/global';

export async function createCocktail(payload: ProductPayload): Promise<void> {
	await fetch('/api/admin/cocktails', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

export async function editCocktail(payload: ProductDb): Promise<void> {
	await fetch(`/api/admin/cocktails/${payload.id}/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}
