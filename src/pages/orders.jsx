import React from 'react';
import OrderCard from '../components/orders/orderCard.jsx';
import { useOrderStore } from '../stores/useOrderStore.js';
import { useOrderUpdateStore } from './../stores/statusUpdate';

function Orders() {
  const { orders, loading, removeOrder } = useOrderStore();
  const { updateStatus } = useOrderUpdateStore();

  const handleCancel = async (id) => {
    const res = await updateStatus({ id, status: "cancelled" });
    if (res?.success) {
      removeOrder(id);
      console.log("Buyurtma bekor qilindi:", id);
    }
  };

  const handleFinish = async (order) => {
    const res = await updateStatus({ id: order.id, status: "completed" });
    if (res?.success) {
      removeOrder(order.id);
      console.log("Buyurtma tugatildi va tarixga qo‘shildi:", order.id);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 border-b bg-white">
        <h1 className="text-2xl font-bold">
          Buyurtmalar {orders.length} ta
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-4">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          orders
            .sort((a, b) => new Date(b.created_time) - new Date(a.created_time))
            .map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onCancel={handleCancel}
                onFinish={handleFinish}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default Orders;
