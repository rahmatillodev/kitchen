import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCategoriesStore } from '../stores/useCategoryStore';
import { useTipAmountStore } from '../stores/useTip_amountStore';
import { useOrderCreateStore, useOrderUpdateStore } from '../stores/useOrderStore';
import { useCartStore } from '../stores/cartStore';

import FilterDashboard from '../components/home/filterDashboard';
import ProductItems from '../components/home/productItems';
import MenuBar from '../components/home/menuBar';

export default function HomePage() {
  const location = useLocation();
  const {
    selectedItems,
    peopleCount,
    tableNumber,
    editingOrder,
    clearItems,
    setPeopleCount,
    setTableNumber,
    addItem,increaseQty,decreaseQty
  } = useCartStore();
  

  const { updateOrder } = useOrderUpdateStore();
  const { createOrder } = useOrderCreateStore();
  const { categories, loading } = useCategoriesStore();
  const { tipAmount } = useTipAmountStore();

  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   if (isEditMode && editingOrder) {
  //   }
  // }, [isEditMode, editingOrder]);

  const handleSubmitOrder = async () => {
    if (!peopleCount.trim() || !tableNumber || selectedItems.length === 0) {
      toast.warn("Iltimos, barcha maydonlarni to'ldiring va kamida bitta taom tanlang");
      return;
    }

    const orderItems = selectedItems.map((item) => ({
      menu: item.id,
      quantity: item.quantity,
    }));

    const newOrder = {
      table: Number(tableNumber),
      items: orderItems,
      tip_amount: Number(tipAmount) || 0,
      client_count: Number(peopleCount),
    };

    try {
      if (editingOrder) {
        console.log(editingOrder);
        await updateOrder(editingOrder.id, newOrder);
      } else {
        await createOrder({
          ...newOrder,
        });
      }

      clearItems();
    } catch (error) {
      console.error("Buyurtmani jo'natishda xatolik:", error);
      toast.error("Buyurtmani yuborishda xatolik yuz berdi.");
    }
  };

  const filteredProducts = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);
  

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
          {loading ? (
            <p className="p-4">Menyular yuklanmoqda...</p>
          ) : (
            <ProductItems products={filteredProducts} onAdd={addItem} />
          )}
        </main>
      </section>

      <aside className="w-1/5 h-full overflow-y-auto relative">
        <MenuBar
          selectedItems={selectedItems}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          clearItems={clearItems}
          peopleCount={peopleCount}
          PEOPLE_PRICE={tipAmount}
          tableNumber={tableNumber}
          onSubmitOrder={handleSubmitOrder}
          isEditMode={!!editingOrder}
        />
      </aside>
    </div>
  );
}
