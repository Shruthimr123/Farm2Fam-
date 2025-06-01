export interface ProductPayload {
  _id?: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductState {
  products: ProductPayload[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

export interface ProductListPayload {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string; 
}
