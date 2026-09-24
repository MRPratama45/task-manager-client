import {useState, useEffect} from 'react';
import Input from './Input';
import Button from './Button';

// komponen TaskModal, form unutk tambah/edit task
function TaskModal ({ isOpen, onClose, onSubmit, task = null }) {
  // 1. state form 
  const [formData, setFormData] = useState ({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  })

  // 2. state error
  const [errors, setErrors] = useState ({})

  // 3. state Loading
  const [loading, setLoading] = useState (false)

  // 4. reset form saat modal dibuka
  useEffect (() => {
    if (isOpen) {
      if (task) {
        // 4a. edit mode: isi form dengan data task
        setFormData ({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'pending',
          due_date: task.due_date ? task.due_date.split('T')[0] : '',
        })
      } else {
        // 4b. create mode: kosoongkan form
        setFormData ({
          title: '',
          description: '',
          status: 'pending',
          due_date: '',
        })
      }

      // 4c. reset error
      setErrors ({})
    }
  }, [isOpen, task])

  // 5. handle change/perubahan
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData ({ ...formData, [name]: value })

    if (errors[name]) {
      setErrors ({ ...errors, [name]: '' })
    }
  }

  // 6. validasi
  const validate = () => {
    const newErrors = {}
    // 6a. validasi title
    if (!formData.title.trim()) {
      newErrors.title = 'Title Wajib diisi'
    }else if (formData.title.length < 3) {
      newErrors.title = 'Title minimal 3 karakter'
    }

    // Description wajib
    if (!formData.description.trim()) {
      newErrors.description = 'Description wajib diisi';
    } else if (formData.description.length < 3) {
      newErrors.description = 'Description minimal 3 karakter';
    } else if (formData.description.length > 255) {
      newErrors.description = 'Description maksimal 255 karakter';
    }

    // Status wajib (biasanya sudah ada default 'pending', jadi selalu ada)
    if (!formData.status) {
      newErrors.status = 'Status wajib dipilih, jika tidak makan default akan PENDING';
    }

    // Due date wajib
    if (!formData.due_date) {
      newErrors.due_date = 'Due date wajib diisi';
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 7. handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    // 7a. kirim data ke parent
    const result = await onSubmit (formData)

    setLoading(false)

    // 7b. jika berhasil create task, tutup modal
    if (result?.success) {
      onClose ()
    }else {
      setErrors ({general: result.message})
    }
  }

  // 8. jika modal tidak dibuka maka jangan di render
  if (!isOpen) return null

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideIn">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {task ? 'Edit Task' : 'Tambah Task Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">

          {/* Error umum */}
          {errors.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {errors.general}
            </div>
          )}

          {/* Title */}
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Contoh: Belajar React"
            error={errors.title}
            required
          />

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi task"
              rows="3"
              className={`
                w-full px-3 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 
                dark:bg-gray-700 dark:text-white
                ${errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
              `}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`
                w-full px-3 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 
                dark:bg-gray-700 dark:text-white
                ${errors.status 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
              `}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className={`
                w-full px-3 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 
                dark:bg-gray-700 dark:text-white
                ${errors.due_date 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
              `}
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Menyimpan...' : (task ? 'Update' : 'Simpan')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal