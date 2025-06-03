import React from 'react';
import OrderCard from '../components/orders/orderCard';
import { mockOrders } from '../infrastructure/mock/mockData';
function Orders() {
    if (mockOrders.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Buyurtmalar mavjud emas</p>;
    }
    return (
        <div className="min-h-screen bg-gray-50">
      <div className="p-6 border-b bg-white">
        <h1 className="text-2xl font-bold">Buyurtmalar</h1>
      </div>
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {mockOrders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    </div>
    );
}

export default Orders