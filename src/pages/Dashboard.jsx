import Button from '../components/Button';
import {useAuth} from '../contexts/AuthContext';
import Navbar from '../components/Navbar'
// import {useTheme} from '../contexts/ThemeContext' // hanya untuk tes

function Dashboard() {
  
  // const {theme, toggleTheme} = useTheme(); // hanya untuk tes

  // 1. ambil data user dari context
  const {user} = useAuth();

  // 2. render
  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      
       {/* <Navbar /> */}
      <Navbar />

      {/* tes theme */}
      {/* <div>
        <p>theme sekarang: {theme} </p>
        <buttonn onClick={toggleTheme}>ganti theme</buttonn>
      </div> */}
      {/* tes theme */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* welcome card */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Dashboard Task Manager. <br /> Selamat Datang, {user?.name}!
          </h1>
          <p className= "text-gray-600 dark:text-gray-300">
            Kelola task anda dengan mudah disini
          </p>
        </div>

        {/* stats cards */}
        <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

          {/* card: total task */}
          <div className= "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className= "text-sm text-gray-500 dark:text-gray-400">
              Total Task
            </p>
            <p className= "text-3xl font-bold text-blue-500 mt-2">
              0
            </p>
          </div>
          {/* Card: Pending */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              0
            </p>
          </div>

          {/* Card: Completed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              0
            </p>
          </div>
        </div>

        {/* Task List Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Daftar Task
            </h2>
            <Button variant="primary">
              + Tambah Task
            </Button>
          </div>

          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Belum ada task.</p>
            <p className="text-sm mt-2">
              Klik "Tambah Task" untuk memulai.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;