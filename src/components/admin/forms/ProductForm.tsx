import { useRouter } from 'next/navigation';
import InputImage from './fields/InputImage';
import { BaseProduct } from '@/types/global';
import SwitchActive from '@/components/ui/SwitchActive';

type Props = {
	formData: BaseProduct;
	updateField: <K extends keyof BaseProduct>(key: K, value: BaseProduct[K]) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	error: string;
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ProductForm({ formData, updateField, handleSubmit, loading, error, setImageFile }: Props) {
	const router = useRouter();
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputImage
				imageUrl={formData.imageUrl || ''}
				setImageFile={setImageFile || ''}
				id={formData.id}
				updateField={updateField}
			/>

			<input
				type="text"
				placeholder="Name"
				value={formData.name}
				onChange={(e) => updateField('name', e.target.value)}
				className="w-full border p-2 rounded"
				required
			/>
			<div className="w-full grid grid-cols-2 gap-1 justify-between items-center">
				<input
					type="number"
					step="1"
					placeholder="Price"
					value={formData.price}
					onChange={(e) => updateField('price', e.target.value)}
					className="w-full border p-2 rounded"
					required
				/>
				<SwitchActive value={formData.active} onChange={(newValue) => updateField('active', newValue)} />
			</div>

			<input
				type="text"
				placeholder="instagramUrl"
				value={formData.instagramUrl || ''}
				onChange={(e) => updateField('instagramUrl', e.target.value)}
				className="w-full border p-2 rounded"
			/>

			<textarea
				placeholder="Description (optional)"
				value={formData?.description || ''}
				onChange={(e) => updateField('description', e.target.value)}
				className="w-full border p-2 rounded"
			/>

			<div className="flex gap-4">
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
				>
					{loading ? 'Saving...' : 'Save Changes'}
				</button>
				<button
					type="button"
					onClick={() => router.push('/admin/cocktails')}
					className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
				>
					Cancel
				</button>
			</div>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
}
