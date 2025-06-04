import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function ProductItems({ products, onAdd }) {
  return (
    <div className="p-2 pb-3 flex flex-wrap gap-2 w-full">
      {products.map(product => (
        <Card 
          onClick={() => onAdd(product)} 
          key={product.id} 
          className="shadow-md w-18 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer flex flex-col h-full p-0 gap-0 rounded-md"
        >
          <div className="overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square object-cover"
            />
          </div>
          <CardContent className="p-1">
            <h3 className="text-sm font-bold line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-[10px] mt-1 whitespace-nowrap">
              {product.price.toLocaleString()} so'm
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}