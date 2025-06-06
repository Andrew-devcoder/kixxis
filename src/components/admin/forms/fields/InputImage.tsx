'use client';
import { deleteImage } from '@/services/image.service';
import React, { useEffect, useRef, useState } from 'react';

export default function InputImage({ setImageFile, imageUrl, id, updateField }: any) {
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const removeImageBd = async () => {
		if (!imageUrl) {
			setImagePreviewUrl(null);
			setImageFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
			return;
		}

		const confirmed = confirm('Are you sure you want to delete this image? This action cannot be undone.');
		if (!confirmed) return;

		try {
			await deleteImage(id);
			setImageFile(null);
			updateField('imageUrl', '');
		} catch (error: any) {
			alert(error.message || 'Error deleting image');
		}
	};

	const handleImageChange = async (file: File) => {
		if (imageUrl) {
			await removeImageBd();
		}

		setImageFile(file);

		const previewUrl = URL.createObjectURL(file);
		setImagePreviewUrl(previewUrl);
	};

	useEffect(() => {
		return () => {
			if (imagePreviewUrl) {
				URL.revokeObjectURL(imagePreviewUrl);
			}
		};
	}, [imagePreviewUrl]);

	return (
		<div className="grid grid-cols-2 gap-4 items-center">
			<div className="relative h-28">
				{(imagePreviewUrl || imageUrl) && (
					<>
						<div
							className="absolute -top-1.5 -left-1.5 p-1 bg-white rounded-full cursor-pointer"
							onClick={() => removeImageBd()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5  text-red-500 "
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</div>
						<div className="overflow-hidden w-24 h-24 rounded">
							<img src={imagePreviewUrl || imageUrl} alt="" className="size-full object-cover" />
						</div>
					</>
				)}
			</div>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) handleImageChange(file);
				}}
				className="w-full border p-2 rounded cursor-pointer"
			/>
		</div>
	);
}
