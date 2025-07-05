import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import MyStyleSection from './components/MyStyleSection';
import GroupShoppingPanel from './components/GroupShoppingPanel';
import AIChat from './components/AIChat';
import CartSidebar from './components/CartSidebar';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  groupDiscount?: number;
  isGroupEligible?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  groupDiscount?: number;
}

function App() {
  const [isGroupPanelOpen, setIsGroupPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Smart 4K Ultra HD TV - 65 inch',
      price: 449.99,
      originalPrice: 699.99,
      rating: 4.5,
      reviews: 1247,
      image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      groupDiscount: 15,
      isGroupEligible: true
    },
    {
      id: 2,
      name: 'Organic Baby Formula - 6 Pack',
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.8,
      reviews: 892,
      image: 'https://images.pexels.com/photos/298660/pexels-photo-298660.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Baby',
      groupDiscount: 20,
      isGroupEligible: true
    },
    {
      id: 3,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 2341,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      groupDiscount: 12,
      isGroupEligible: true
    },
    {
      id: 4,
      name: 'Eco-Friendly Cleaning Supplies Set',
      price: 34.99,
      rating: 4.7,
      reviews: 567,
      image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Home',
      groupDiscount: 18,
      isGroupEligible: true
    },
    {
      id: 5,
      name: 'Premium Coffee Maker',
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.4,
      reviews: 1890,
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Kitchen',
      isGroupEligible: false
    },
    {
      id: 6,
      name: 'Fitness Tracker Watch',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.3,
      reviews: 1456,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      groupDiscount: 10,
      isGroupEligible: true
    },
    {
      id: 7,
      name: 'Sustainable Fashion Tote Bag',
      price: 29.99,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fashion',
      isGroupEligible: false
    },
    {
      id: 8,
      name: 'Smart Home Security Camera',
      price: 119.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 678,
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      groupDiscount: 25,
      isGroupEligible: true
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        groupDiscount: product.groupDiscount
      }];
    });
  };

  const handleAddToGroupCart = (product: Product) => {
    handleAddToCart(product);
    setIsGroupPanelOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onGroupCartClick={() => setIsGroupPanelOpen(true)}
        onChatClick={() => setIsChatOpen(true)}
      />
      
      <Hero
        onStartGroupShopping={() => setIsGroupPanelOpen(true)}
        onTryAI={() => setIsChatOpen(true)}
      />
      
      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        onAddToGroupCart={handleAddToGroupCart}
      />
      
      <MyStyleSection />
      
      <GroupShoppingPanel
        isOpen={isGroupPanelOpen}
        onClose={() => setIsGroupPanelOpen(false)}
      />
      
      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;