// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useOrderStore } from '../stores/cartStore';
import FilterDashboard from '../components/home/filterDashboard';
import ProductItems from '../components/home/productItems';
import MenuBar from '../components/home/menuBar';

import { mockProducts, mockOrders, PEOPLE_PRICE } from '../infrastructure/mock/mockData';

export default function HomePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isEditMode = query.get('edit');

  const {
    selectedItems,
    addItem,
    increaseQty,
    decreaseQty,
    clearItems,
    editingOrder,
    peopleCount,
    tableNumber,
    setPeopleCount,
    setTableNumber,
    setEditingOrder,
  } = useOrderStore();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isEditMode && editingOrder) {
      setEditingOrder(editingOrder); // Hammasini update qiladi
    }
  }, [isEditMode, editingOrder, setEditingOrder]);

  const handleSubmitOrder = () => {
    if (!peopleCount.trim() || !tableNumber.trim() || selectedItems.length === 0) {
      toast.warn("Iltimos, barcha maydonlarni to'ldiring va kamida bitta taom tanlang");
      return;
    }

    const baseTotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const peopleCountNumber = parseInt(peopleCount);
    const peopleCountPrice = peopleCountNumber * PEOPLE_PRICE;
    const finalTotal = baseTotal + peopleCountPrice;

    const newOrder = {
      id: editingOrder?.id || Date.now(),
      items: selectedItems,
      peopleCount: peopleCountNumber,
      tableNumber,
      peopleCountPrice,
      baseTotal,
      finalTotal,
      createdAt: editingOrder?.createdAt || new Date().toISOString(),
    };

    if (editingOrder) {
      const index = mockOrders.findIndex((o) => o.id === editingOrder.id);
      if (index !== -1) {
        mockOrders[index] = newOrder;
        toast.success('Buyurtma o‘zgartirildi!');
      }
    } else {
      mockOrders.push(newOrder);
      console.log(newOrder);
      toast.success('Buyurtma qo‘shildi!');
    }

    clearItems();
  };

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      <section className="w-4/5 flex flex-col">
        <header className="border-b">
          <FilterDashboard
            search={search}
            setSearch={setSearch}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
          />
        </header>
        <main className="flex-1 overflow-y-auto">
          <ProductItems products={filteredProducts} onAdd={addItem} />
        </main>
      </section>

      <aside className="w-1/5 h-full overflow-y-auto relative">
        <MenuBar
          selectedItems={selectedItems}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          clearItems={clearItems}
          peopleCount={peopleCount}
          PEOPLE_PRICE={PEOPLE_PRICE}
          tableNumber={tableNumber}
          onSubmitOrder={handleSubmitOrder}
          isEditMode={!!editingOrder}
        />

      </aside>
    </div>
  );
}
