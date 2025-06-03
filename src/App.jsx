// App.jsx
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/authLayout';
import { DashboardLayout } from './layouts/dashboardLayout';
import Home from './pages/home';
// import { Login } from './pages/auth/Login';
// import { Home } from './pages/dashboard/Home';
// import { Orders } from './pages/dashboard/Orders';
// import { Products } from './pages/dashboard/Products';
 const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Home />} />
          {/* <Route path="/dashboard/orders" element={<Orders />} /> */}
          {/* <Route path="/dashboard/products" element={<Products />} /> */}
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;