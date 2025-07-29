import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    sku: "",
    brand: "",
    sizes: "",
    colors: "",
    category: "",
    collections: "",
    material: "",
    gender: "",
    imageUrl: "", // Single image URL for now
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: Number(formData.discountPrice),
      countInStock: Number(formData.countInStock),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      colors: formData.colors.split(",").map((c) => c.trim()),
      images: [
        {
          url: formData.imageUrl,
          altText: `${formData.name} Image`,
        },
      ],
    };

    try {
      await dispatch(createProduct(payload)).unwrap();
      navigate("/admin/products");
    } catch (error) {
      alert("Product creation failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Stock Count"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="collections"
          placeholder="Collection"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
