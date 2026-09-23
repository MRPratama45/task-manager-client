import { useState, useEffect } from "react";
import api from "../services/api";



// Custom Hook untuk mengelola state & operasi untuk tasks
export function useTasks () {
  // 1. state untuk menyimpan tasks
  const [tasks, setTasks] = useState([]);

  // 2. state untuk loading
  const [loading, setLoading] = useState(true);

  // 3. state untuk error
  const [error, setError] = useState(null);

  // 4. fungsi: fetch all tasks
  const fetchTasks = async () =>{
    try {
      setLoading (true)
      setError (null)

      // 4a.get /api/tasks
      const response = await api.get('tasks')

      // 4b.simpan tasks ke state
      setTasks (response.data.data)
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal memuat tasks';
      setError(errorMessage);
      console.log('Fetch tasks error: ', error);
    }
    finally {
      setLoading (false)
    }
  }

  // 5. fungsi: update task
  const updateTask = async (id, taskData) => {
    try{
      setError (null)

      const response = await api.put(`/tasks/${id}`, taskData)

      // 5a. update task di state
      setTasks(tasks.map((task) => task.id === id? response.data.data : task ))

      return {success: true, data: response.data.data}
    }

    catch (error){
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate task'
      setError(errorMessage)
      return {success: false, message: errorMessage}
    }
    
  }

  // 6. Fungsi: delete Task
  const deleteTask = async (id) => {
    try {
      setError(null)
      await api.delete(`/tasks/${id}`)

      // 6a. Hapus task di state
      setTasks(tasks.filter((task) => task.id !== id))

      return {success: true}
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal menghapus task'
      setError(errorMessage)
      return {success: false, message: errorMessage}
    }
  }


  // 7. fungsi: create taks
  const createTask = async (taskData) => {
    try{
      setError (null)

      // 5a.post /api/tasks
      const response = await api.post('/tasks', taskData)

      // 5b.tambah task baru ke state
      setTasks([response.data.data, ...tasks])

      return {
        success: true,
        message: 'Task berhasil dibuat'
      }
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal membuat task';
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    }
  }

  // 8. fetch saat komponen mount
  useEffect (() => {
    fetchTasks()
  }, [])

  // 9. return 
  return {
    tasks,      // data tasks
    loading,    // status laoding
    error,      // pesan error
    fetchTasks,   // fungsi refresh/get semua tasks
    createTask,   // fungsi create
    updateTask,   // fungsi update
    deleteTask    // fungsi delete
  }
}


