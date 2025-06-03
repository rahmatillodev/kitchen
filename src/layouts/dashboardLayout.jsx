import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

export const DashboardLayout = () => {
  return (
    <div>
        <Navbar/>
      <div>
        <Outlet />
      </div>
    </div>
  );
};