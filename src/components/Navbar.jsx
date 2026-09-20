// import
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'


// komponen navbar
function Navbar () {
  // 1.ambil user &logout dari context
  const {user, logout} = useAuth();

  // 2. ambil theme & toggleTheme dari context
  const {theme, toggleTheme} = useTheme();

  // 3. hook navigate
  const navigate = useNavigate();

  // 4. handle logout 
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // 5. render
  return (
    <nav className= "bg-white shadow-md dark:bg-gray-800">
      <div className= "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className= "flex justify-between items-center h-16">
          {/* logo/judul */}
          <div className= "flex items-center">
            <h1 className= "text-xl font-bold text-gray-800 dark:text-white">
              Task Manager
            </h1>
          </div>
          {/* menu kanan */}
          <div className= "flex items-center gap-2 sm:gap-4">
            <span className= "text-gray-600 dark:text-white hidden sm:block">
              Halo, <span className= "font-semibold">{user?.name}</span>
            </span>
            <button 
            onClick={toggleTheme} 
            className= "p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors
            title= {theme === 'light' ? 'Ganti ke tema gelap' : 'Ganti ke tema terang'}">
              {theme === 'light' ? '🌜' : '🌞'}
            </button>

            {/* button logout */}
            <button variant= "danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// 6. export 
export default Navbar