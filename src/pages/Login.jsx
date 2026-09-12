import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../services/api';
import {useAuth} from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

// halaman login
function Login () {
  // state form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // state error
  const [errors, setErrors] = useState({});

  // state message
  const [message, setMessage] = useState('');

  // state loading
  const [loading, setLoading] = useState(false);

  // hook navigasi
  const navigate = useNavigate();

  // fungsi login
  const {login} = useAuth();

  // handle perubahan input
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData ({ ...formData, [name]:value });

    // reset error field ini
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  // validasi 
  const validate = () => {
    const newErrors = {};

    // validasi field email
    if (!formData.email.trim()){
      newErrors.email = 'email tidak boleh kosong';
    }else if (!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = 'Format email tidak valid';
    }

    // validasi field password
    if (!formData.password.trim()){
      newErrors.password = 'Password tidak boleh kosong';
    }

    // set error
    setErrors(newErrors);

    // return true jika tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // validasi form
    if (!validate()){
      return;
    }

    // set loading
    setLoading(true);

    try {
      // 1. ambil data dari login dan kirim ke api
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

       // Debug: cek struktur response
      console.log('Response login:', response.data);

      // 2. ambil data dari respon api dan set user dan token dari response login ke localstorage
      // 2a. terima data dari response login
      const userData = response.data.data;
      
      // 2b. data di kirim ke authContext
      login(userData, userData.token); 

      // 3. redirect ke dashboard
      navigate('/dashboard');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login gagal !';

      // set message
      setMessage(errorMessage);
    
    } finally {
      // set loading
      setLoading(false);
    }
  };

  // render
  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Login
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Masuk untuk mengelola task Anda
            </p>
          </div>

          {/* Pesan error */}
          {message && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              error={errors.password}
              required
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Login'}
            </Button>
          </form>

          {/* Link ke Register */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Login