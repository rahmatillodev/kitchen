  import React, { useState } from 'react';
  import OrderCard from '../components/orders/OrderCard';
  import { mockOrders as initialOrders, mockHistory as historyStore } from '../infrastructure/mock/mockData';

  function Orders() {
    const [orders, setOrders] = useState(initialOrders);

    const handleCancel = (id) => {
      setOrders(prev => prev.filter(order => order.id !== id));
      console.log("Buyurtma bekor qilindi:", id);
      // TODO: API chaqiruv uchun joy
    };

    const handleFinish = (order) => {
      setOrders(prev => prev.filter(o => o.id !== order.id));
      historyStore.push(order);
      console.log("Buyurtma tugatildi va tarixga qo‘shildi:", order.id);
    };

    if (orders.length === 0) {
      return <p className="text-center text-gray-500 mt-10">Buyurtmalar mavjud emas</p>;
    }

    return (
      <div className="bg-gray-50">
        <div className="p-6 border-b bg-white">
          <h1 className="text-2xl font-bold">Buyurtmalar</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-4">
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={handleCancel}
              onFinish={handleFinish}
            />
          ))}
        </div>
      </div>
    );
  }

  export default Orders;
