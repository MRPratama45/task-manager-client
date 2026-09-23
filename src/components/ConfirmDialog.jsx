import Button from "./Button"

// komponen congirmDialog/ dialog konfirmasi

function ConfirmDialog ({ isOpen, onClose, onConfirm, title, message, loading }) {

  // 1. jika tidak di buka, jangan render
  if(!isOpen) return null

  // 2. render, jika di buka. maka render berikut
  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Dialog Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">

        {/* Body */}
        <div className="p-6 text-center">
          {/* Icon Warning */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <span className="text-2xl">⚠️</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            {title || 'Konfirmasi'}
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {message || 'Apakah Anda yakin?'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog