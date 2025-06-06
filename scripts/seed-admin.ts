import { PrismaClient } from '@/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;
	if (!email || !password) {
		console.error('Please set the ADMIN_EMAIL and ADMIN_PASSWORD environment variables.');
		process.exit(1);
	}

	const hashedPassword = await hash(password, 10);

	const admin = await prisma.user.upsert({
		where: { email },
		update: {},
		create: {
			name: 'Admin',
			email: email,
			password: hashedPassword,
		},
	});

	console.log('✅ Admin created:', admin);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
