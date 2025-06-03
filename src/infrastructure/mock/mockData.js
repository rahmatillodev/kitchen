export const mockProducts = [
    { id: '1', name: 'Osh', price: 25000, category: 'Milliy taomlar' },
    { id: '2', name: 'Manti', price: 18000, category: 'Milliy taomlar' },
    { id: '3', name: 'Salat', price: 12000, category: 'Salatlar' },
    { id: '4', name: 'Coca-Cola', price: 8000, category: 'Ichimliklar' }
  ];
  
  export const mockUsers = [
    { id: '1', name: 'Ali', role: 'waiter' },
    { id: '2', name: 'Vali', role: 'admin' }
  ];
  
  export const mockOrders = [
    {
      id: 'order-1',
      items: [
        { productId: '1', quantity: 2, price: 25000 },
        { productId: '4', quantity: 1, price: 8000 }
      ],
      status: 'completed',
      createdAt: new Date('2025-01-15')
    },
    {
      id: 'order-2',
      items: [
        { productId: '2', quantity: 3, price: 18000 }
      ],
      status: 'pending',
      createdAt: new Date('2025-01-16')
    }
  ];