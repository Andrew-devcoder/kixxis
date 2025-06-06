import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import fs from 'fs';

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get('image') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const ext = file.name.split('.').pop() || 'webp';
		const filename = `${randomUUID()}.${ext}`;

		const uploadDir = path.join(process.cwd(), 'public/uploads');
		if (!fs.existsSync(uploadDir)) {
			await mkdir(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, filename);
		await writeFile(filePath, buffer);

		return NextResponse.json({ filename });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
