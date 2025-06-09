const BASE_URL = "https://kitchenapi.pythonanywhere.com/api/v1";

export const API_ENDPOINTS = {
  tables: `${BASE_URL}/tables/`,
  menus: `${BASE_URL}/menus/`,
  ordersCreate: `${BASE_URL}/order/create/`,
  ordersGet: `${BASE_URL}/orders/?s=p`,
  orders: `${BASE_URL}/orders/`,
  udateOrder: `${BASE_URL}/order/`,
  amount: `${BASE_URL}/tip-amount/`,
  ordersStatusUpdate: `${BASE_URL}/order/status/`,
};
