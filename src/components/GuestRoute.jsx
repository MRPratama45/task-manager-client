import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// 1. guest route (agar tidak bisa back setelah login)
function GuestRoute ({ children }) {
  // 1a. ambil data user & loading dari context
  const {user, loading} = useAuth();

  // 1b. jika masih loading, tampilkan loading
  if (loading) {
    return (
      <div className= "min-h-screen flex items-center justify-center bg-gray-100">
        <div className= "text-center">
          <div className= "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // 1c. jika user ada/sudah login, redirect ke dashboard page
  if (user) {
    // replace agar menghapus dan mengganti halaman saat ini
    return <Navigate to="/dashboard" replace />; 
  }

  // 1d. jika user tidak ada, tampilkan children
  return children;
} 

export default GuestRoute