import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

export const DashboardLayout = () => {
  return (
    <div>
        <Navbar/>
      <div style={{ flex: 1, padding: '2rem', background: '#f3f4f6' }}>
        <Outlet />
      </div>
    </div>
  );
};