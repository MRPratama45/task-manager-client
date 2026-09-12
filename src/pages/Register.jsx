import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';


// halaman register
function Register () {
  
  // state untuk input form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // state untuk error per field
  const [errors, setErrors] = useState({});

  // state untuk pesan error/success global
  const [message, setMessage] = useState('');

  // state untuk loading
  const [loading, setLoading] = useState(false);

  // hook untuk navigasi
  const navigate = useNavigate();

  // handle perubahan input
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData ({
      ...formData,
      [name]:value
    })

    // reset error field ini
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // handle form
  const validate = () => {
    const newErrors = {}

    // validasi field name
    if (!formData.name.trim()){
      newErrors.name = 'Nama tidak boleh kosong';
    }else if (formData.length < 3){
      newErrors.name = 'Nama minimal 3 karakter';
    }

    // validasi field email
    if (!formData.email.trim()){
      newErrors.email = 'email tidak boleh kosong';
    }else if (!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = 'Format email tidak valid';
    }

    // validasi field password
    if (!formData.password.trim()){
      newErrors.password = 'Password tidak boleh kosong';
    }else if (formData.password.length < 6){
      newErrors.password = 'Password minimal 6 karakter';
    }

    // validasi field confirm password
    if (!formData.confirmPassword.trim()){
      newErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
    }else if (formData.confirmPassword !== formData.password){
      newErrors.confirmPassword = 'Konfirmasi password tidak sesuai';
    }
  
    // set error
    setErrors(newErrors);
    
    // return true jika ada error
    return Object.keys(newErrors).length === 0;
}
    
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

    try{
      // buat akun
      const response = await api.post('/auth/registrasi', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // set message
      setMessage('Registrasi berhasil ! Silahkan Login.');
      
      // redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // set error
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
      setMessage(errorMessage);

    } finally {
      // set loading
      setLoading(false);
    }
  }

  // render
  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Daftar Akun
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Buat akun untuk mulai mengelola task
            </p>
          </div>

          {/* Pesan error/success */}
          {message && (
            <div className={`
              p-3 rounded-lg mb-4 text-sm
              ${message.includes('berhasil')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }
            `}>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Nama Lengkap"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              error={errors.name}
              required
            />

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
              placeholder="Minimal 6 karakter"
              error={errors.password}
              required
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </Button>
          </form>

          {/* Link ke Login */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;