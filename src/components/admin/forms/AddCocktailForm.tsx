'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/services/image.service';
import { createCocktail } from '@/services/form.service';
import { BaseProduct } from '@/types/global';
import ProductForm from './ProductForm';

const resetForm = {
	name: '',
	price: '',
	description: '',
	instagramUrl: '',
	active: false,
	imageUrl: '',
};

export default function CreateCocktailPage() {
	const router = useRouter();

	const [formData, setFormData] = useState<BaseProduct>(resetForm);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const updateField = <K extends keyof BaseProduct>(key: K, value: BaseProduct[K]) => {
		setFormData((prev: BaseProduct) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (!imageFile) {
				await createCocktail({ ...formData, price: parseFloat(formData.price) });
				router.push('/admin/cocktails');
				return;
			}

			const resultUploadImage = await uploadImage(imageFile);

			const fullFormData = {
				...formData,
				imageUrl: resultUploadImage,
				price: parseFloat(formData.price),
			};

			await createCocktail(fullFormData);
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
