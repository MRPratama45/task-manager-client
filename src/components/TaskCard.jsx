import Button from "./Button";

// komponen TaskCard, menampilka satu task
function TaskCard ({ task, onEdit, onDelete }) {  // task, onEdit, onDelete = props dari parent
  // 1. warna status
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  }

  // 2. label status
  const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  }

  // 3. format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  // 4. render
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {/* Header: Title & Status */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-semibold text-gray-800 dark:text-white flex-1">
          {task.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.due_date && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          📅 {formatDate(task.due_date)}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="secondary"
          onClick={() => onEdit(task)}
          className="flex-1 text-sm"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(task)}
          className="flex-1 text-sm"
        >
          Hapus
        </Button>
      </div>
    </div>
  );
}

// 5. export
export default TaskCard