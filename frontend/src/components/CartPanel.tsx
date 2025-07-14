import React, { useEffect, useState } from 'react';
import socket from '../socket';

interface CartItem {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  added_by: string;
}

export default function CartPanel({ groupId }: { groupId: string }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    socket.emit('get_cart', { group_id: groupId });

    socket.on('cart_updated', (items: CartItem[]) => {
      setCartItems(items);
    });

    return () => {
      socket.off('cart_updated');
    };
  }, [groupId]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl mt-4">
      <h2 className="text-xl font-bold mb-4">Group Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center space-x-4">
            <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <span className="text-blue-600 text-sm">₹{item.price}</span>
              <p className="text-xs text-gray-500">Added by: {item.added_by}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
