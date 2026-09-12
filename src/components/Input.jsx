function Input ({
  label,                  // Label untuk input
  type = 'text',          // Tipe input ('text', 'email', 'password', dll)
  name,                   // Nama input (untuk form)
  value,                  // Nilai input
  onChange,               // Fungsi saat input berubah
  placeholder,            // Placeholder untuk input
  error,                  // Pesan error (jika ada)
  required = false        // Apakah input wajib diisi?
}){
  return (
    <div className="mb-4">
      {/* label */}
      {label && (
        <label
          htmlFor="{name}"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 
          border rounded-lg 
          focus:outline-none focus:ring-2 
          transition-colors ${error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {/* Pesan Error */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input