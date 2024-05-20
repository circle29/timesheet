const CustomModal = ({
  isOpen,
  onClose,
  input,
  onClick,
  title,
  label,
  cancel,
  submit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-2xl mb-4">{title}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              {label}
            </label>
            <input
              className="mt-3 p-4 block h-7 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={input}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-1500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {cancel}
            </button>
            <button
              type="submit"
              onClick={onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-1500 hover:bg-red hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
