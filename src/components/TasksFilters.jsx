// komponen taskFilters (search, filter status, sort)

function TaskFilters ({filters, onFilterChange}) {
  // 1.handle perubahan input
  const handleChange = (e) => {
    const {name, value} = e.target
    onFilterChange ({...filters, [name]: value})
  }

  // 2. render komponen
  return (
     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* Search */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            🔍 Cari Task
          </label>
          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Cari judul task..."
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Filter Status */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            📊 Filter Status
          </label>
          <select
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            🔄 Urutkan
          </label>
          <select
            name="sort"
            value={filters.sort ? `${filters.sort}-${filters.order}` : ''}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-');
              onFilterChange({ ...filters, sort, order });
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Terbaru (default)</option>
            <option value="created_at-desc">Terbaru</option>
            <option value="created_at-asc">Terlama</option>
            <option value="title-asc">Judul A-Z</option>
            <option value="title-desc">Judul Z-A</option>
            <option value="due_date-asc">Due Date Terdekat</option>
            <option value="due_date-desc">Due Date Terjauh</option>
          </select>
        </div>
      </div>
    </div>
  )

}

export default TaskFilters