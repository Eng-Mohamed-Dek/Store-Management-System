import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Pencil, Trash2 } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Link
            to="/create"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{p.description}</p>
                <p className="font-bold mb-2">₹ {p.price}</p>

                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full ${
                    p.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>

                <div className="flex justify-end gap-4 mt-4">
                  {/* Edit Icon */}
                  <Link
                    to={`/edit/${p._id}`}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                    title="Edit Product"
                  >
                    <Pencil size={20} />
                  </Link>

                  {/* Delete Icon */}
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer transition"
                    title="Delete Product"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
