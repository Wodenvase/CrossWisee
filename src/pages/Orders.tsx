import React from 'react';
import OrderSummary from '../components/orders/OrderSummary';
import { Order } from '../types/order';

// Mock data
const mockOrder: Order = {
  id: '1',
  items: [
    {
      id: '1',
      name: 'Handcrafted Leather Bag',
      quantity: 2,
      price: 5000,
      dutyRate: 8,
      dutyAmount: 800,
      total: 10800
    },
    {
      id: '2',
      name: 'Cotton Textile Bundle',
      quantity: 1,
      price: 3000,
      dutyRate: 12,
      dutyAmount: 360,
      total: 3360
    }
  ],
  subtotal: 13000,
  totalDuty: 1160,
  total: 14160,
  shippingTerms: 'DDP',
  status: 'pending'
};

export default function Orders() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Order Details</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Terms</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="DDP">Delivered Duty Paid (DDP)</option>
                    <option value="DAP">Delivered At Place (DAP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                  <textarea 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <OrderSummary
              items={mockOrder.items}
              subtotal={mockOrder.subtotal}
              totalDuty={mockOrder.totalDuty}
              total={mockOrder.total}
              shippingTerms={mockOrder.shippingTerms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}