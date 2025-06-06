'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseProduct, ProductDb } from '@/types/global';
import { uploadImage } from '@/services/image.service';
import { editCocktail } from '@/services/form.service';
import ProductForm from './ProductForm';

export default function EditCocktailForm({ cocktail }: { cocktail: ProductDb }) {
	const router = useRouter();
	const [formData, setFormData] = useState<BaseProduct>({ ...cocktail, price: cocktail.price.toString() });

	const updateField = <K extends keyof BaseProduct>(key: K, value: BaseProduct[K]) => {
		setFormData((prev: BaseProduct) => ({
			...prev,
			[key]: key === 'active' ? Boolean(value) : value,
		}));
	};

	const [imageFile, setImageFile] = useState<File | null>(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			let fullFormData = { ...formData };

			if (imageFile) {
				const resultUploadImage = await uploadImage(imageFile);
				fullFormData.imageUrl = resultUploadImage;
			}

			await editCocktail(fullFormData);
			router.push('/admin/cocktails');
		} catch (err: any) {
			setError(err.message || 'Unexpected error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProductForm
			formData={formData}
			updateField={updateField}
			handleSubmit={handleSubmit}
			loading={loading}
			error={error}
			setImageFile={setImageFile}
		/>
	);
}
