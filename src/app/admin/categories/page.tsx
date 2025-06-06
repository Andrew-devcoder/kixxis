'use client';

import { fetchFilteredCategories } from '@/services/category.service';
import { useEffect, useState } from 'react';

type Category = {
	id: string;
	name: string;
};

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [newCategory, setNewCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const loadCategories = async () => {
		const data = await fetchFilteredCategories();
		setCategories(data);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const handleCreate = async () => {
		if (!newCategory.trim()) return;

		setLoading(true);
		setError('');

		const res = await fetch('/api/admin/categories', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newCategory }),
		});

		if (res.ok) {
			setNewCategory('');
			await loadCategories();
		} else {
			const data = await res.json();
			setError(data.message || 'Error creating category');
		}

		setLoading(false);
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">Categories</h1>

			<div className="flex gap-4 items-center mb-6">
				<input
					type="text"
					placeholder="New category name"
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)}
					className="border rounded px-3 py-2 w-64"
				/>
				<button
					onClick={handleCreate}
					disabled={loading}
					className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
				>
					{loading ? 'Creating...' : 'Add'}
				</button>
			</div>

			{error && <p className="text-red-500">{error}</p>}

			<ul className="space-y-3">
				{categories.map((cat) => (
					<div className="flex justify-between items-center" key={cat.id}>
						<li className="border p-3 rounded bg-white/5 text-white">{cat.name}</li>
					</div>
				))}
			</ul>
		</div>
	);
}
