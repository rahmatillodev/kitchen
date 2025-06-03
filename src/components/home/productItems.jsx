import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function ProductItems({ products, onAdd }) {
  return (
    <div className="p-2 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 w-full">
      {products.map(product => (
        <Card 
          onClick={() => onAdd(product)} 
          key={product.id} 
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer flex flex-col h-full p-0 gap-0 rounded-md"
        >
          <div className="overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square object-cover"
            />
          </div>
          <CardContent className="p-2">
            <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {product.price.toLocaleString()} so'm
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}