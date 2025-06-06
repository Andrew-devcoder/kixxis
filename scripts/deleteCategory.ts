import { prisma } from '@/lib/prisma';
import { select, confirm } from '@inquirer/prompts';

async function main() {
	const categories = await prisma.category.findMany({
		orderBy: { name: 'asc' },
	});

	if (!categories.length) {
		console.log('⚠️ No categories found.');
		return;
	}

	const selectedId = await select({
		message: '📂 Select a category to delete:',
		choices: categories.map((cat) => ({
			name: `${cat.name.padEnd(30)} (id: ${cat.id})`,
			value: cat.id,
		})),
	});

	const shouldDelete = await confirm({
		message: '❗ Are you sure you want to delete this category?',
		default: false,
	});

	if (!shouldDelete) {
		console.log('❎ Cancelled.');
		return;
	}

	await prisma.category.delete({
		where: { id: selectedId },
	});

	console.log('✅ Category deleted.');
}

main()
	.catch((e) => {
		if (e instanceof Error && e.name === 'ExitPromptError') {
			console.log('🚪 Prompt cancelled by user.');
			process.exit(0);
		}
		console.error('❌ Error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
