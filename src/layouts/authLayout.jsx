import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#4f46e5' }}>Oshxona Tizimi</h1>
          <p style={{ color: '#6b7280' }}>Tizimga kirish</p>
        </div>

        <Outlet />

        {/* Havola */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link 
            to="/register" 
            style={{ 
              color: '#4f46e5',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
};