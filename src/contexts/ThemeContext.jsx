// import 
import {createContext, useContext, useState, useEffect}from 'react';

// 1. buat context (createContext = wadah data global)
const ThemeContext = createContext(); 

// 2. buat provider (provider = komponen penyedia data)
export function ThemeProvider({ children }) {
  
    // 2a.state them (default: light)
    const [theme, setTheme] = useState (() => {

      // 2b. ambil dari localstorage saat pertama kali
      return localStorage.getItem('theme') || 'light';
    })


  // 2c. simpan ke localstorage setiap kali theme berubah
  useEffect (() => {
    // console.log ('theme berubah menjadi: ', theme)
    localStorage.setItem('theme', theme)

    // const htmlElement = document.documentElement;

    // 2d. update class di html element (untuk tailwind dark mode)
    if(theme === 'dark'){
      // htmlElement.classList.add('dark');
      // console.log('classList setelah add: ', htmlElement.classList);
      
      document.documentElement.classList.add('dark')
    }else {
      // htmlElement.classList.add('dark');
      // console.log('classList setelah add: ', htmlElement.classList);

      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  // 2e. fungsi toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // 2f. value yg di share
  const value = {
    theme, toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      { children }
    </ThemeContext.Provider>
  );
}

// 3. custome hook (custome hook = bungkus useContext, useContext = akses data dari context, state = data yg dishare)
export function useTheme () {
  const context = useContext (ThemeContext)
  if(!context){
    throw new Error ('useTheme Harus dipakai di dalam ThemeProvider');
  }
  return context;
}