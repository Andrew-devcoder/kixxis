import sharp from 'sharp';

export async function optimizeImage(file: Buffer): Promise<Buffer> {
	return sharp(file).resize({ width: 1200 }).webp({ quality: 80 }).toBuffer();
}

export async function uploadImage(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('image', file);

	const res = await fetch('/api/admin/upload', {
		method: 'POST',
		body: formData,
	});

	if (!res.ok) {
		throw new Error('Image upload failed');
	}

	const data = await res.json();

	if (!data.filename) {
		throw new Error('Invalid upload response');
	}

	return `/uploads/${data.filename}`;
}

export async function deleteImage(cocktailId: string) {
	try {
		const res = await fetch(`/api/admin/cocktails/${cocktailId}/image`, {
			method: 'DELETE',
		});

		if (!res.ok) {
			const data = await res.json();
			throw new Error(data.message || 'Failed to delete image');
		}
	} catch (error) {
		alert('Error deleting image');
	}
}
