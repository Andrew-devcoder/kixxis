import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	try {
		const cocktail = await prisma.cocktail.findUnique({
			where: { id },
		});

		if (!cocktail || !cocktail.imageUrl) {
			return NextResponse.json({ message: 'Image not found' }, { status: 404 });
		}

		const imagePath = path.join(process.cwd(), 'public', cocktail.imageUrl.replace(/^\/+/, ''));

		console.log(imagePath);

		await fs.unlink(imagePath).catch(() => {});

		await prisma.cocktail.update({
			where: { id },
			data: { imageUrl: null },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ message: 'Failed to delete image' }, { status: 500 });
	}
}
