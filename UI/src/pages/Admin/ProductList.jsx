import AdminMenu from "./AdminMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container  sm:mx-[2rem] ">
      <div className="flex flex-col md:flex-row items-center justify-center w-full ">
        <AdminMenu />
        <div className="md:w-3/4 p-5">
          <h1 className="text-2xl font-bold mb-5">Create Product</h1>

          {/* Image Upload Section */}
          {imageUrl && (
            <div className="text-center mb-5">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg"
              />
            </div>
          )}
          <div className="mb-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-3 bg-gray-800">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name and Price */}
              <div>
                <label htmlFor="name" className="block font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price" className="block font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity and Brand */}
              <div>
                <label htmlFor="quantity" className="block font-bold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="brand" className="block font-bold mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              {/* Stock and Category */}
              <div>
                <label htmlFor="stock" className="block font-bold mb-2">
                  Count In Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" className="block font-bold mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                className="p-3 w-full border rounded-lg bg-[#101011] text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="py-3 px-8 rounded-lg text-lg font-bold bg-pink-600 text-white hover:bg-pink-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
