import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function CheckModal({ order, trigger }) {
  if (!order) return null;

  // Print uchun maxsus CSS qo'shish (inline yoki global CSS orqali)
  // Modal ichida chek ko'rinishi uchun oddiy, ixcham va printer friendly dizayn
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm p-4 font-mono bg-white rounded-md shadow-md print:max-w-full print:p-0 print:shadow-none">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold mb-2">
            Buyurtma Cheki
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-800 space-y-2 max-h-[350px] overflow-auto print:max-h-full">
          <div className="border-b border-dashed pb-2">
            <p>
              <strong>Stol raqami:</strong> {order.table}
            </p>
            <p>
              <strong>Odamlar soni:</strong> {order.client_count}
            </p>
            <p>
              <strong>Sana:</strong> {new Date(order.created_time).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="font-semibold mt-2 mb-1 border-b border-dashed pb-1">
              Taomlar:
            </p>
            <ul className="space-y-1">
              {order.items?.length ? (
                order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b border-dashed pb-1"
                  >
                    <span>
                      {item.menu_name} × {item.quantity}
                    </span>
                    <span>{(item.current_price * item.quantity).toLocaleString()} so'm</span>
                  </li>
                ))
              ) : (
                <li>Buyurtma elementlari mavjud emas</li>
              )}
            </ul>
          </div>

          <div className="border-t border-dashed pt-2 space-y-1 mt-4">
            <div className="flex justify-between">
              <span>
                Odamlar soni: ({order.client_count})
              </span>
            </div>
            <div className="flex justify-between font-semibold text-green-700 text-lg">
              <span>Umumiy:</span>
              <span>{Number(order.total_price).toLocaleString()} so'm</span>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 flex justify-between print:hidden">
          <Button
            onClick={() => {
              window.print();
            }}
            className="bg-green-600"
          >
            Chop etish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
