export type BaseProduct = {
	id?: string;
	name: string;
	price: string;
	description: string;
	instagramUrl: string;
	imageUrl: string;
	active: boolean;
	category?: {
		id: string;
		name: string;
	};
};

export type ProductPayload = Omit<BaseProduct, 'price'> & {
	price: number;
	categoryId?: string;
};

export type ProductDb = Omit<BaseProduct, 'price', 'description', 'instagramUrl', 'imageUrl'> & {
	price: number;
	description: string | null;
	instagramUrl: string | null;
	imageUrl: string | null;
};
