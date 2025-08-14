import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

interface FlavorNavigationProps {
  currentProductId: number;
}

export const FlavorNavigation: React.FC<FlavorNavigationProps> = ({ currentProductId }) => {
  const currentIndex = products.findIndex(p => p.id === currentProductId);
  if (currentIndex === -1) return null;

  const otherProducts = products.filter(p => p.id !== currentProductId);

  return (
    <nav className="bg-black py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-2xl font-serif text-white mb-6">Explore Other Flavors</h3>
        <div className="flex justify-center space-x-8">
          {otherProducts.map(product => (
            <Link
              key={product.id}
              to={product.path}
              className="text-center text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <img 
                src={product.bottleImage} 
                alt={product.name} 
                className="h-48 mx-auto mb-2"
              />
              <span className="font-semibold">{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};