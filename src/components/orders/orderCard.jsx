import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function OrderCard({ order }) {
  const totalFormatted = order.finalTotal.toLocaleString();

  // Modalni boshqaruvchi state'lar
  const [openCancel, setOpenCancel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);

  const handleCancel = () => {
    setOpenCancel(false);
    console.log("Buyurtma bekor qilindi:", order.id);
  };

  const handleEdit = () => {
    setOpenEdit(false);
    console.log("Buyurtma o'zgartirilmoqda:", order.id);
  };

  const handleFinish = () => {
    setOpenFinish(false);
    console.log("Buyurtma tugatildi:", order.id);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white relative">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold text-md">Stol: {order.tableNumber}</h3>
          <p className="text-sm text-gray-500">Odamlar: {order.peopleCount}</p>
        </div>
        <span className="text-green-600 font-bold">{totalFormatted} so'm</span>
      </div>

      <ul className="text-sm text-gray-700 space-y-1 mb-3">
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} × {item.qty} = {(item.qty * item.price).toLocaleString()} so'm
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mb-4">Yaratilgan: {new Date(order.createdAt).toLocaleString()}</p>

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="destructive" size="sm" onClick={() => setOpenCancel(true)}>
          Bekor qilish
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenEdit(true)}>
          O'zgartirish
        </Button>
        <Button variant="default" size="sm" onClick={() => setOpenFinish(true)}>
          Tugatish
        </Button>
      </div>

      {/* Bekor qilish Modal */}
      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtmani bekor qilmoqchimisiz?</DialogTitle>
            <DialogDescription>
              Ushbu amalni bekor qilib bo'lmaydi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenCancel(false)}>Yo‘q</Button>
            <Button variant="destructive" onClick={handleCancel}>Ha, bekor qil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* O‘zgartirish Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtmani o‘zgartirmoqchimisiz?</DialogTitle>
            <DialogDescription>
              Siz bu buyurtmani qayta tahrirlaysiz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenEdit(false)}>Yo‘q</Button>
            <Button onClick={handleEdit}>Ha, o‘zgartiraman</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tugatish Modal */}
      <Dialog open={openFinish} onOpenChange={setOpenFinish}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtmani tugatmoqchimisiz?</DialogTitle>
            <DialogDescription>
              Tugatilgan buyurtmalar ro‘yxatiga qo‘shiladi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenFinish(false)}>Yo‘q</Button>
            <Button onClick={handleFinish}>Ha, tugat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
