import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`/api/products/${id}`)
        .then((res) => setProduct(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    id
      ? await api.put(`/api/products/${id}`, product)
      : await api.post("/api/products", product);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            name="inStock"
            checked={product.inStock}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium">In Stock</span>
        </div>

        <button className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
