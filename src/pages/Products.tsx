import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '../components/products/ProductTable';
import ProductModal from '../components/products/ProductModal';
import ProductFilters from '../components/products/ProductFilters';
import { Product, ProductFormData } from '../types/product';

// Mock data for initial development
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Leather Bag',
    destinationCountry: 'USA',
    hsCode: '4202.21',
    dutyRate: 8,
    price: 5000,
    totalPrice: 5400
  },
  {
    id: '2',
    name: 'Cotton Textile Bundle',
    destinationCountry: 'EU',
    hsCode: '5208.51',
    dutyRate: 12,
    price: 3000,
    totalPrice: 3360
  }
];

// Mock categories
const categories = ['Leather Goods', 'Textiles', 'Electronics', 'Handicrafts'];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.hsCode.includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleCountryFilter = (country: string) => {
    if (country === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.destinationCountry === country
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryFilter = (category: string) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      // In a real app, you would filter by category
      setFilteredProducts(products);
    }
  };

  const handleAddProduct = (formData: ProductFormData) => {
    const dutyRates: { [key: string]: number } = {
      'USA': 8,
      'UK': 10,
      'EU': 12,
      'Canada': 7,
      'Australia': 9,
      'Japan': 11,
      'Singapore': 6
    };

    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      dutyRate: dutyRates[formData.destinationCountry] || 10,
      totalPrice: formData.price * (1 + (dutyRates[formData.destinationCountry] || 10) / 100)
    };

    setProducts([...products, newProduct]);
    setFilteredProducts([...products, newProduct]);
  };

  const handleEditProduct = (formData: ProductFormData) => {
    if (!editingProduct) return;

    const dutyRates: { [key: string]: number } = {
      'USA': 8,
      'UK': 10,
      'EU': 12,
      'Canada': 7,
      'Australia': 9,
      'Japan': 11,
      'Singapore': 6
    };

    const updatedProduct: Product = {
      id: editingProduct.id,
      ...formData,
      dutyRate: dutyRates[formData.destinationCountry] || 10,
      totalPrice: formData.price * (1 + (dutyRates[formData.destinationCountry] || 10) / 100)
    };

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? updatedProduct : p
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        <ProductFilters
          onSearch={handleSearch}
          onCountryFilter={handleCountryFilter}
          onCategoryFilter={handleCategoryFilter}
          categories={categories}
        />

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ProductTable
            products={filteredProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct ? {
          name: editingProduct.name,
          destinationCountry: editingProduct.destinationCountry,
          hsCode: editingProduct.hsCode,
          price: editingProduct.price
        } : undefined}
      />
    </div>
  );
}