import { prisma } from '@/lib/prisma';
import { generateUniqueCategoryId } from './generateUniqueCategoryId';

async function main() {
	const existing = await prisma.category.findUnique({
		where: { name: 'no-category' },
	});

	if (existing) {
		console.log('✅ "no-category" already exists.');
		return;
	}

	const id = await generateUniqueCategoryId();

	await prisma.category.create({
		data: {
			id,
			name: 'no-category',
		},
	});

	console.log(`✅ "no-category" has been created with id: ${id} copy this id to .env file: `);
	console.log(`NEXT_PUBLIC_DEFAULT_CATEGORY_ID=${id}`);
}

main()
	.catch((e) => {
		console.error('❌ Error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
