import React from 'react';
import { X, Plus, Minus, Trash2, Users, Clock } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  groupDiscount?: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const groupSavings = items.reduce((sum, item) => {
    if (item.groupDiscount) {
      return sum + (item.price * item.quantity * item.groupDiscount / 100);
    }
    return sum;
  }, 0);
  const total = subtotal - groupSavings;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">Your cart is empty</div>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">${item.price}</span>
                      {item.groupDiscount && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{item.groupDiscount}% off</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Savings Summary */}
            {groupSavings > 0 && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-800 font-medium flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Group Savings</span>
                  </span>
                  <span className="text-green-900 font-semibold">-${groupSavings.toFixed(2)}</span>
                </div>
                <div className="text-sm text-green-700">
                  You're saving with group discounts!
                </div>
              </div>
            )}

            {/* Delivery Options */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-purple-800 font-medium">Delivery Options</span>
              </div>
              <div className="space-y-2 text-sm">
                <label className="flex items-center space-x-2 text-purple-700">
                  <input type="radio" name="delivery" className="text-purple-600" defaultChecked />
                  <span>Standard Delivery (Free) - 3-5 days</span>
                </label>
                <label className="flex items-center space-x-2 text-purple-700">
                  <input type="radio" name="delivery" className="text-purple-600" />
                  <span>Express Delivery ($9.99) - 1-2 days</span>
                </label>
                <label className="flex items-center space-x-2 text-purple-700">
                  <input type="radio" name="delivery" className="text-purple-600" />
                  <span>Group Delivery ($5.33/person) - Shared window</span>
                </label>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {groupSavings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Group Savings:</span>
                  <span>-${groupSavings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}