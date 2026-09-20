// import
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// 1. buat protected route
function ProtectedRoute ({ children }) {
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

  // 1c. jika user tidak ada redirect ke login page
  if (!user) {
    // replace agar menghapus dan mengganti halaman saat ini
    return <Navigate to="/login" replace />; 
  }

  // 1d. jika user ada, tampilkan children
  return children;
}

// 2. export fungsi
export default ProtectedRoute;