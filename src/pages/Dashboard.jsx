import Button from '../components/Button';
import {useAuth} from '../contexts/AuthContext';

function Dashboard() {
  
  const {user} = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard Task Manager
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Selamat datang {user?.name}, di Task Manager!
          </p>

          <div className="flex gap-2">
            <Button variant="primary">Tambah Task</Button>
            <Button variant="secondary">Filter</Button>
            <Button variant="danger">Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;