import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProductFormData } from '../../types/product';
import { CSVProduct, loadProductsFromCSV } from '../../utils/csvUtils';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData;
}

const countries = ['USA', 'UK', 'EU', 'Canada', 'Australia', 'Japan', 'Singapore'];

export default function ProductModal({ isOpen, onClose, onSubmit, initialData }: ProductModalProps) {
  const [formData, setFormData] = React.useState<ProductFormData>(
    initialData || {
      name: '',
      destinationCountry: '',
      hsCode: '',
      price: 0,
    }
  );
  const [csvProducts, setCsvProducts] = useState<CSVProduct[]>([]);

  useEffect(() => {
    loadProductsFromCSV().then(products => setCsvProducts(products));
  }, []);

  if (!isOpen) return null;

  const handleProductSelect = (productName: string) => {
    const selectedProduct = csvProducts.find(p => p['Product Name'] === productName);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        name: selectedProduct['Product Name'],
        hsCode: selectedProduct['HS Code']
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{initialData ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Product</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
              onChange={(e) => handleProductSelect(e.target.value)}
              value={formData.name}
            >
              <option value="">Select a product</option>
              {csvProducts.map((product, index) => (
                <option key={index} value={product['Product Name']}>
                  {product['Product Name']} - {product['HS Code']}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Destination Country</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
              value={formData.destinationCountry}
              onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">HS Code</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
              value={formData.hsCode}
              onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-amazon-orange border border-transparent rounded-md hover:bg-amazon-orange-dark"
            >
              {initialData ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}