import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const { name, price, description, imageUrl, instagramUrl, active } = await req.json();

		if (!name || !price) {
			return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
		}

		const updated = await prisma.cocktail.update({
			where: { id },
			data: {
				name,
				active,
				price: parseFloat(price),
				description: description || null,
				imageUrl: imageUrl || null,
				instagramUrl: instagramUrl || null,
			},
		});

		return NextResponse.json(updated, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Error updating cocktail' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

		await prisma.cocktail.delete({
			where: { id },
		});

		return NextResponse.json({ message: 'Cocktail deleted' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Error deleting cocktail' }, { status: 500 });
	}
}
