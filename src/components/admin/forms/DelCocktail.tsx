'use client';

import { deleteImage } from '@/services/image.service';

interface Props {
	id: string;
}

export default function DeleteCocktailButton({ id }: Props) {
	const handleDelete = async () => {
		const confirmed = confirm('Are you sure you want to delete this cocktail?');
		if (!confirmed) return;
		await deleteImage(id);

		const res = await fetch(`/api/admin/cocktails/${id}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			window.location.reload();
		} else {
			alert('Failed to delete cocktail.');
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
		>
			Delete
		</button>
	);
}
