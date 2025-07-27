import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Red Onions',
    price: 35,
    category: 'Vegetables',
    supplier: 'FreshKart Agro',
    rating: 4.7,
    location: 'Ahmedabad',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh red onions, perfect for street food preparation. High quality and affordable.',
    stock: 500,
    unit: '10kg bag'
  },
  {
    id: '2',
    name: 'Cooking Oil',
    price: 108,
    category: 'Oils',
    supplier: 'Suresh Traders',
    rating: 4.5,
    location: 'Surat',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
    description: 'Premium cooking oil suitable for all types of frying and cooking.',
    stock: 200,
    unit: '5L bottle'
  },
  {
    id: '3',
    name: 'Tomatoes',
    price: 40,
    category: 'Vegetables',
    supplier: 'Gujarat Fresh',
    rating: 4.8,
    location: 'Rajkot',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh red tomatoes, ideal for chutneys and gravies.',
    stock: 300,
    unit: '10kg crate'
  },
  {
    id: '4',
    name: 'Garam Masala',
    price: 85,
    category: 'Spices',
    supplier: 'Spice World',
    rating: 4.9,
    location: 'Mumbai',
    image: 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Authentic garam masala blend for enhanced flavor.',
    stock: 100,
    unit: '500g pack'
  },
  {
    id: '5',
    name: 'Potatoes',
    price: 25,
    category: 'Vegetables',
    supplier: 'FreshKart Agro',
    rating: 4.6,
    location: 'Ahmedabad',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Quality potatoes perfect for various street food items.',
    stock: 400,
    unit: '10kg bag'
  },
  {
    id: '6',
    name: 'Chili Powder',
    price: 120,
    category: 'Spices',
    supplier: 'Spice World',
    rating: 4.7,
    location: 'Mumbai',
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Pure red chili powder with perfect heat level.',
    stock: 80,
    unit: '1kg pack'
  }
];

export const categories = ['All', 'Vegetables', 'Oils', 'Spices', 'Grains', 'Dairy'];