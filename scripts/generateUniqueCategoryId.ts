import { randomUUID } from 'crypto';
import { prisma } from '../src/lib/prisma';

export async function generateUniqueCategoryId(): Promise<string> {
	let id = '';
	let exists = true;

	while (exists) {
		id = randomUUID();
		const category = await prisma.category.findUnique({ where: { id } });
		exists = !!category;
	}

	return id;
}
