import {createContext, useContext, useState, useEffect} from 'react';

// buat context untuk cara share state ke seluruh komponen
const AuthContext = createContext();

// wrapper yg menyediakan state auth ke semua child
export function AuthProvider ({ children}) {
  
  // state user (null jika belum login)
  const [user, setUser] = useState(null);

  // state loading (untuk cek token di awal)
  const [loading, setLoading] = useState(true); 
  
  // cek token saat aplikasi dibuka
  useEffect(() => {
  try{
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

  // cek token dan userData ada dan bukan string "undefined"
  if (token && userName) { 
    setUser({name: userName});
  }
    setLoading(false)
  } catch (error) {
    console.log('Error parsing user data: ', error);
    
    // hapus data yg rusak
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
  } finally {
    setLoading(false)
  }
  }, []);

  // fungsi login
  const login = (user, token) => {
    // 1. simpan dan set token ke localstorage dengan key 'token' value token
    localStorage.setItem('token', token); 

    // 2. simpan dan set user ke localstorage dengan key 'user' value user
    localStorage.setItem('user', user.name); 

    // 3. update state user di react
    setUser(user); // set state user
  };

  // fungsi logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // value yg dibagikan ke child
  const value = {
    user,     // data user
    login,    // fungsi login
    logout,   // fungsi logout
    loading,  // status loading
  };

  return (
    <AuthContext.Provider value = {value}>
      {children}
    </AuthContext.Provider>
  )

}

// custome hook. cara pakai: const {user, login, logout, loading} = useAuth();
export function useAuth () {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context
}