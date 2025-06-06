import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateUniqueCategoryId } from '../../../../../scripts/generateUniqueCategoryId';

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			select: { id: true, name: true },
			orderBy: { name: 'asc' },
		});
		// const names = categories.map((cat) => cat.name);
		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const { name } = await req.json();
		if (!name) {
			return NextResponse.json({ message: 'Name is required' }, { status: 400 });
		}

		const existing = await prisma.category.findUnique({ where: { name } });
		if (existing) {
			return NextResponse.json({ message: 'Category already exists' }, { status: 409 });
		}

		const id = await generateUniqueCategoryId();

		await prisma.category.create({
			data: {
				id,
				name,
			},
		});
		return NextResponse.json({ message: 'Category created' }, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
	}
}
