const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    button = 'submit',
    handleDelete,
}) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3 text-ce">
                <input
                    type="text"
                    placeholder="Create Category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="px-10 py-4 text-black rounded w-full cursor-pointer"
                />
                <div className="flex justify-between">
                    <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline focus:ring-pink-500 focus:ring-opacity-50 text-center">
                        {button}
                    </button>
                    {handleDelete && (
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
