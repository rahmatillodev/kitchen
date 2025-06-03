import React, { useState } from 'react';
import MenuBar from '../components/home/menuBar';
import ProductItems from '../components/home/productItems';
import FilterDashboard from '../components/home/filterDashboard';
import { mockProducts } from '../infrastructure/mock/mockData';
import { useOrderStore } from '../stores/cartStore';
import { mockOrders, PEOPLE_PRICE } from '../infrastructure/mock/mockData';
import { toast } from 'react-toastify';

export default function Home() {
  const [search, setSearch] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [tableNumber, setTableNumber] = useState('');


  const selectedItems = useOrderStore(state => state.selectedItems);
  const addItem = useOrderStore(state => state.addItem);
  const increaseQty = useOrderStore(state => state.increaseQty);
  const decreaseQty = useOrderStore(state => state.decreaseQty);
  const clearItems = useOrderStore(state => state.clearItems);


  // yakuniy buyurtmalarni saqlash uchun
  const handleSubmitOrder = () => {
    if (!peopleCount.trim()) {
      toast.warn("Iltimos, odamlar sonini kiriting");
      return;
    }

    if (!tableNumber.trim()) {
      toast.warn("Iltimos, stol raqamini tanlang");
      return;
    }

    if (selectedItems.length === 0) {
      toast.warn("Iltimos, kamida bitta taom tanlang");
      return;
    }

    const baseTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const peopleCountNumber = parseInt(peopleCount);
    const peopleCountPrice = peopleCountNumber * PEOPLE_PRICE;
    const finalTotal = baseTotal + peopleCountPrice;

    const newOrder = {
      id: Date.now(),
      items: selectedItems,
      peopleCount: peopleCountNumber,
      tableNumber,
      peopleCountPrice,
      baseTotal,
      finalTotal,
      createdAt: new Date().toISOString(),
    };

    mockOrders.push(newOrder);
    toast.success("Buyurtma muvaffaqiyatli qo‘shildi!");

    clearItems();
    setPeopleCount('');
    setTableNumber('');
  };





  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="h-[calc(100vh-64px)] flex gap-0 overflow-hidden">
      <div className="w-4/5 flex flex-col">
        <div className="border-b">
          <FilterDashboard
            search={search}
            setSearch={setSearch}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ProductItems products={filteredProducts} onAdd={addItem} />
        </div>
      </div>

      <div className="w-1/5 h-full overflow-y-auto relative">
        <MenuBar
          selectedItems={selectedItems}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          clearItems={clearItems}
          peopleCount={peopleCount}
          PEOPLE_PRICE={PEOPLE_PRICE}
          tableNumber={tableNumber}
          onSubmitOrder={handleSubmitOrder}
        />
      </div>
    </div>
  );
}
