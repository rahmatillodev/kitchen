import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { BiCheck, BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useOrderStore } from '../../stores/cartStore';

 function OrderCard({ order, onCancel, onFinish }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const printRef = useRef();
  const navigate = useNavigate();
  const setEditingOrder = useOrderStore(state => state.setEditingOrder);

  const totalFormatted = Number(order.finalTotal).toLocaleString();

  const handleEdit = () => {
    setEditingOrder(order);
    navigate('/dashboard');
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`
      <html>
        <head>
          <title>Chek</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .flex { display: flex; justify-content: space-between; }
            .bold { font-weight: bold; }
            .green { color: green; }
            ul { padding: 0; list-style: none; }
            li { margin-bottom: 6px; }
            .border-b { border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 6px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="w-full h-full border p-4 rounded-lg shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-semibold text-md">{order.tableNumber}</h3>
            <p className="text-sm text-gray-500">Odamlar: {order.peopleCount}</p>
          </div>
        </div>

        <ul className="text-sm text-gray-700 space-y-1 mb-3 h-40 overflow-auto">
          {order.items.map((item) => (
            <div key={item.id} className="border-b mb-2">
              <li>{item.name} × {item.qty}</li>
              <li className="text-end">{(item.qty * item.price).toLocaleString()} so'm</li>
            </div>
          ))}
        </ul>

        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
        <p className="text-green-600 font-bold mb-2">Jami: {totalFormatted} so'm</p>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant="destructive" size="sm" onClick={() => setOpenCancel(true)}>
          <MdDelete />
        </Button>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <BiEdit />
        </Button>
        <Button variant="default" className="bg-green-600" size="sm" onClick={() => setOpenFinish(true)}>
          <BiCheck />
        </Button>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtmani bekor qilmoqchimisiz?</DialogTitle>
            <DialogDescription>Bu amalni bekor qilib bo‘lmaydi.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenCancel(false)}>Yo‘q</Button>
            <Button variant="destructive" onClick={() => onCancel(order.id)}>Ha, bekor qil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Finish Dialog with Check */}
      <Dialog open={openFinish} onOpenChange={setOpenFinish}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buyurtma Cheki</DialogTitle>
            <DialogDescription>Buyurtma yakunlanmoqda, ma'lumotlarni tekshirib chiqing.</DialogDescription>
          </DialogHeader>

          <div ref={printRef} className="text-sm text-gray-700 space-y-2 max-h-[300px] overflow-auto">
            <div className="border-b pb-2">
              <p><span className="font-semibold">Stol raqami:</span> {order.tableNumber}</p>
              <p><span className="font-semibold">Odamlar soni:</span> {order.peopleCount}</p>
              <p><span className="font-semibold">Sana:</span> {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Taomlar:</p>
              <ul className="space-y-1">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between border-b pb-1">
                    <span>{item.name} × {item.qty}</span>
                    <span>{(item.price * item.qty).toLocaleString()} so'm</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span>Odamlar ({order.peopleCount} × {(order.peopleCountPrice / order.peopleCount).toLocaleString()}):</span>
                <span>{Number(order.peopleCountPrice).toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between font-semibold text-md text-green-600">
                <span>Umumiy:</span>
                <span>{Number(order.finalTotal).toLocaleString()} so'm</span>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2 ">
            <div className='flex justify-between w-full'>
              <Button onClick={handlePrint}>Chekni olish</Button>
              <div className='flex gap-2'>
                <Button variant="ghost" onClick={() => setOpenFinish(false)}>Orqaga</Button>
                <Button onClick={() => {
                  onFinish(order);
                  setOpenFinish(false);
                }}>
                  Ha, tugat
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default OrderCard