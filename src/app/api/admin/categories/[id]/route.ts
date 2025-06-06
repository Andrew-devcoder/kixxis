// export async function DELETE({ params }: { params: { id: string } }) {
// 	try {
// 		await deleteCategoryAndReassign(params.id);
// 		return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
// 	}
// }

// export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
// 	const { id } = await params;
// 	try {
// 		await deleteCategoryAndReassign(id);
// 		return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
// 	}
// }

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		const body = await req.json();
// 		const { name } = body;

// 		if (!name) {
// 			return NextResponse.json({ message: 'Name is required' }, { status: 400 });
// 		}

// 		await editCategory(params.id, name);

// 		return NextResponse.json({ message: 'Category updated' }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ message: 'Error editing category' }, { status: 500 });
// 	}
// }

// v 2
// import { deleteCategoryAndReassign, editCategory } from '@/lib/services/category.service';
// import { NextRequest, NextResponse } from 'next/server';

// export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
// 	const { id } = await params;
// 	try {
// 		await deleteCategoryAndReassign(id);
// 		return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
// 	}
// }

// export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
// 	const { id } = await params;
// 	try {
// 		const body = await req.json();
// 		const { name } = body;

// 		if (!name) {
// 			return NextResponse.json({ message: 'Name is required' }, { status: 400 });
// 		}

// 		await editCategory(id, name);

// 		return NextResponse.json({ message: 'Category updated' }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json({ message: 'Error editing category' }, { status: 500 });
// 	}
// }

import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	return NextResponse.json({ message: 'updated' });
}
