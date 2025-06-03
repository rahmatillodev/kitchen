import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { TbTrash } from 'react-icons/tb';

export default function MenuBar({ selectedItems, onIncrease, onDecrease, clearItems, peopleCount, PEOPLE_PRICE, onSubmitOrder }) {

  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const peopleCountNumber = parseInt(peopleCount) || 0;


  return (
    <div className="absolute right-0 top-0 bottom-0 w-full flex flex-col border-l overflow-hidden">
      <div className="p-1 pt-2 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Tanlangan taomlar</h2>
          <p className="text-xs text-gray-500">{selectedItems.length} ta mahsulot</p>
        </div>
        <TbTrash className='cursor-pointer size-6 mr-4' onClick={clearItems} />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {selectedItems.length === 0 ? (
          <div className="text-center py-1">
            <p className="text-gray-500 text-sm">Savatcha bo'sh</p>
            <p className="text-xs text-gray-400 mt-1">Taomlar tanlang</p>
          </div>
        ) : (
          selectedItems.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow text-sm p-0 rounded-md">
              <CardContent className="p-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      {item.price.toLocaleString()} so'm x {item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onDecrease(item.id)}
                    >
                      <Minus size={12} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onIncrease(item.id)}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                </div>
                <div className="mt-1 text-right font-medium text-sm">
                  Jami: {(item.price * item.qty).toLocaleString()} so'm
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="p-3 border-t bg-white sticky bottom-0">
        <div className="flex justify-between text-sm mb-1">
          <span>Taomlar:</span>
          <span>{totalPrice.toLocaleString()} so'm</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Odamlar ({peopleCountNumber} × {PEOPLE_PRICE}):</span>
          <span>{(peopleCountNumber * PEOPLE_PRICE).toLocaleString()} so'm</span>
        </div>
        <div className="flex justify-between font-semibold text-md">
          <span>Umumiy:</span>
          <span>{(totalPrice + peopleCountNumber * PEOPLE_PRICE).toLocaleString()} so'm</span>
        </div>
        <Button
          className="w-full warning-bg"
          size="sm"
          onClick={onSubmitOrder}
        >
          Buyurtmani qo'shish
        </Button>
      </div>

    </div>
  );
}