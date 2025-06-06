import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
	try {
		const { name, price, description, imageUrl, instagramUrl, active } = await req.json();

		// const finalCategoryId = category.id || process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID;
		const finalCategoryId = process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID || '';

		const categoryExists = await prisma.category.findUnique({
			where: { id: finalCategoryId },
		});

		if (!categoryExists) {
			return NextResponse.json({ message: 'Invalid categoryId' }, { status: 400 });
		}

		if (!name || !price) {
			return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
		}

		const newCocktail = await prisma.cocktail.create({
			data: {
				name,
				price,
				active,
				categoryId: finalCategoryId,
				description: description || null,
				imageUrl: imageUrl || null,
				instagramUrl: instagramUrl || null,
			},
		});

		return NextResponse.json(newCocktail, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
		const cocktails = await prisma.cocktail.findMany({
			where: { active: true },
			orderBy: { createdAt: 'desc' },
			include: {
				category: true,
			},
		});

		return NextResponse.json(cocktails, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}
