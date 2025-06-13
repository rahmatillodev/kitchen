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
import { useCartStore } from '../../stores/cartStore';
import { useReactToPrint } from 'react-to-print';

function OrderCard({ order, onCancel, onFinish }) {
  const [openCancel, setOpenCancel] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const printRef = useRef();
  const navigate = useNavigate();
  const setEditingOrder = useCartStore(state => state.setEditingOrder);

  const handleEdit = () => {
    setEditingOrder(order);
    navigate('/dashboard?edit=true', { state: { order } });
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Order-${order.id}-Check`,
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 300);
      }),
      pageStyle: `
      @media print {
        body {
          width: 58mm;
          font-family: monospace;
          font-size: 10px;
          margin: 0;
          padding: 0;
        }
        .flex { display: flex; justify-content: space-between; }
        .bold { font-weight: bold; }
        .center { text-align: center; }
        ul, li { padding: 0; margin: 0; list-style: none; }
      }
    `
  });
  

  return (
    <div className="w-full h-full border p-4 rounded-lg shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-md">ID: #{order.id}</h3>
            <h3 className="font-semibold text-md">Stol {order.table}</h3>
            <p className="text-sm text-gray-500">Odamlar: {order.client_count}</p>
          </div>
        </div>

        <ul className="text-sm text-gray-700 space-y-1 mb-3 h-40 overflow-auto">
          {order.items.map((item, index) => (
            <div key={index} className="border-b mb-2">
              <li>{item.menu_name} × {item.quantity}</li>
              <li className="text-end">{(item.quantity * item.current_price).toLocaleString()} so'm</li>
            </div>
          ))}
        </ul>

        <p className="text-xs text-gray-400">{new Date(order.created_time).toLocaleString()}</p>
        <p className="text-green-600 font-bold mb-2">Jami: {Number(order.total_price).toLocaleString()} so'm</p>
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

      {/* Finish Dialog with Receipt */}
      <Dialog open={openFinish} onOpenChange={setOpenFinish}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buyurtma Cheki</DialogTitle>
            <DialogDescription>Buyurtma yakunlanmoqda, ma'lumotlarni tekshirib chiqing.</DialogDescription>
          </DialogHeader>

          {/* Printable Component */}
          <div ref={printRef} className="text-sm text-gray-700 space-y-2 max-h-[300px] overflow-auto p-4">
            <div className="border-b pb-2">
              <p><span className="font-semibold">Stol raqami:</span> {order.table}</p>
              <p><span className="font-semibold">Odamlar soni:</span> {order.client_count}</p>
              <p><span className="font-semibold">Sana:</span> {new Date(order.created_time).toLocaleString()}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Taomlar:</p>
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between border-b pb-1">
                    <span>{item.menu_name} × {item.quantity}</span>
                    <span>{(item.current_price * item.quantity).toLocaleString()} so'm</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 space-y-1">
              <div className="flex justify-between">
                <span>Odamlar ({order.client_count} × {order.current_tip_amount})</span>
                <span>{(order.client_count * order.current_tip_amount).toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between font-semibold text-md text-green-600">
                <span>Umumiy:</span>
                <span>{Number(order.total_price).toLocaleString()} so'm</span>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <div className='flex justify-between w-full'>
              <Button onClick={() => {
                if (printRef.current) {
                  handlePrint();
                } else {
                  console.error("Hali hech narsa yuklanmagan");
                }
              }}>
                Chekni chiqarish
              </Button>
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

export default OrderCard;
