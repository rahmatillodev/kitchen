import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function ProductItems({ products, onAdd }) {
  return (
    <div className="w-full h-full pt-4">
      <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4 text-center">
        {products.map(category => (
          <button
            key={category.id}
            className="font-semibold text-base whitespace-nowrap px-4 py-2 rounded-md hover:bg-gray-100  transition-colors"
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 h-full border-t">
        {products.map(category => (
          <div key={category.id} className="mb-8 border-l-2 p-1">
            <div className="grid grid-cols-3 gap-1">
              {category.items
                .filter(product => product.is_available)
                .map(product => (
                  <Card
                    onClick={() => onAdd(product)}
                    key={product.id}
                    className="shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer gap-1 flex flex-col h-full p-0 rounded-md"
                  >
                    <div className="overflow-hidden ">
                      <img
                        src={`https://kitchenapi.pythonanywhere.com${product.image}`}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    <CardContent className="p-0.5">
                      <h3 className="text-[10px] font-semibold line-clamp-1 whitespace-nowrap">{product.name}</h3>
                      <p className="text-gray-600 text-xs mt-1 whitespace-nowrap">
                        {parseInt(product.price).toLocaleString()} so'm
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
