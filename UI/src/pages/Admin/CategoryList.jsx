import CategoryForm from "../../Components/CategoryForm";
import Modal from "../../Components/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryByIdMutation,
} from "../../Redux/api/CategorySlice";

const CategoryList = () => {
    const { data: categoriesFromApi, error } = useGetAllCategoriesQuery();
    const [categories, setCategories] = useState(categoriesFromApi || []);

    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateName, setUpdateName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryByIdMutation();

    // Update categories list when the API data changes
    useEffect(() => {
        if (categoriesFromApi) {
            setCategories(categoriesFromApi);
        }
    }, [categoriesFromApi]);

    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category name is required');
            return;
        }
        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} is created`);

                // Add the newly created category to the categories list
                setCategories(prevCategories => [...prevCategories, result]);
            }
        } catch (error) {
            console.log(error);
            toast.error('Creating Category failed. Try again');
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updateName) {
            toast.error('Category name is required');
            return;
        }
        try {
            const result = await updateCategory({ id: selectedCategory._id, updatedCategory: { name: updateName } }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);

                // Update the category in the list
                setCategories(prevCategories =>
                    prevCategories.map(category =>
                        category._id === result._id ? result : category
                    )
                );

                setSelectedCategory(null);
                setUpdateName("");
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('Updating Category failed. Try again');
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is deleted`);

                // Remove the deleted category from the categories list
                setCategories(prevCategories =>
                    prevCategories.filter(category => category._id !== selectedCategory._id)
                );
                setSelectedCategory(null);
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Category deleting error");
        }
    };

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <div className="md:w-3/4 p-3">
                <div className="h12 text-center">Manage Category</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmitCategory} />
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories.map((category) => (
                        <div key={category._id}>
                            <button
                                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setModalVisible(true);
                                    setSelectedCategory(category);
                                    setUpdateName(category.name);
                                }}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm
                        value={updateName}
                        setValue={setUpdateName}
                        handleSubmit={handleUpdateCategory}
                        button="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default CategoryList;
