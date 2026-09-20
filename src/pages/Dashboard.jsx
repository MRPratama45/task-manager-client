import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useTasks} from '../hooks/useTasks';
import Navbar from '../components/Navbar'
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
// import {useTheme} from '../contexts/ThemeContext' // hanya untuk tes

function Dashboard() {
  
  // const {theme, toggleTheme} = useTheme(); // hanya untuk tes

  // 1. ambil data user dari context
  const {user} = useAuth();

  // 2. task hooks
  const {tasks, loading, error, fetchTasks, createTask} = useTasks();

  // 3. state modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. hitung statistik
  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    in_progress: tasks.filter((task) => task.status === 'in_progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  }

  // 5. handle create
  const handleCreateTask = async (taskData) => {
    return await createTask(taskData)
  }

  // 6. handle edit (onproses)
  const handleEditTask = (task) => {
    console.log('Edit Task: ', task);
  }

  // 7. handle delete (onproses)
  const handleDeleteTask = (task) => {
    console.log('Delete Task: ', task);
  }

  // 8. render
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
              {stats.total}
            </p>
          </div>

          {/* Card: Pending */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </p>
          </div>

          {/* Card: In Progress */}
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-blue-500 mt-1">{stats.in_progress}</p>
          </div>

          {/* Card: Completed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {stats.completed}
            </p>
          </div>
        </div>

        {/* Task List Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Daftar Task
            </h2>
            <Button 
              onClick={() => setIsModalOpen(true)} 
              variant="primary">
              + Tambah Task
            </Button>
          </div>
          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-500">Memuat task...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {error}
              <button
                onClick={fetchTasks}
                className="ml-2 underline font-medium"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>Belum ada task.</p>
              <p className="text-sm mt-2">
                Klik "Tambah Task" untuk memulai.
              </p>
            </div>
          )}

          {/* Task Grid */}
          {!loading && !error && tasks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}

export default Dashboard;