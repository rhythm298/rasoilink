export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'vendor' | 'supplier';
  photoURL?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  supplier: string;
  rating: number;
  location: string;
  image: string;
  description: string;
  stock: number;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  vendorId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
  supplierName: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}