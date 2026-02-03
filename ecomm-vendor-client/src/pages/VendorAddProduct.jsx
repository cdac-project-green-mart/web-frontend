import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  createVendorProduct,
  updateVendorProduct,
  getProductById,
} from "../api/products";
import { getInventory, setStock } from "../api/inventory";
import { normalizeApiError } from "../api/axios";

export default function VendorAddProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    imageFile: null,
    imagePreview: "",
  });

  // Fetch product data when in edit mode
  useEffect(() => {
    if (isEditMode && editId) {
      const fetchProduct = async () => {
        setFetching(true);
        setError(null);
        try {
          const product = await getProductById(editId);
          let stockQty = "";
          try {
            const inv = await getInventory(editId);
            stockQty = inv?.quantity ?? inv?.stock ?? "";
          } catch {
            stockQty = "";
          }
          setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            stock: stockQty?.toString() || "",
            category: product.category || "",
            image: product.images?.[0] || "",
          });
        } catch (err) {
          setError(normalizeApiError(err).message || "Failed to load product");
        } finally {
          setFetching(false);
        }
      };
      fetchProduct();
    }
  }, [isEditMode, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }));
    } else {
      setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Basic validation
      if (!formData.name || !formData.price || !formData.stock) {
        throw new Error("Please fill in all required fields (Name, Price, Stock)");
      }

      // Description is required by backend
      if (!formData.description || formData.description.trim() === "") {
        throw new Error("Product description is required");
      }

      // At least one image is required (either file upload or URL)
      const hasImageFile = formData.imageFile !== null;
      const hasImageUrl = formData.image && formData.image.trim() !== "";
      if (!hasImageFile && !hasImageUrl) {
        throw new Error("At least one product image is required (upload a file or provide a URL)");
      }

      // If a file is selected, submit as FormData (multipart)
      let productData;
      if (hasImageFile) {
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("description", formData.description);
        fd.append("price", Number(formData.price));
        fd.append("category", formData.category || "General");
        // append file(s) under `images` to match server multer setup
        fd.append("images", formData.imageFile);
        // also include image URL if provided
        if (hasImageUrl) fd.append("images", formData.image);
        productData = fd;
      } else {
        // Only URL provided (no file upload)
        productData = {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category || "General",
          images: [formData.image],
        };
      }

      let productId;

      if (isEditMode && editId) {
        // Update existing product
        await updateVendorProduct(editId, productData);
        productId = editId;
      } else {
        // Create new product
        const created = await createVendorProduct(productData);
        productId = created._id || created.id;
      }

      // Update stock
      if (productId && formData.stock != null && formData.stock !== "") {
        try {
          await setStock(productId, { quantity: Number(formData.stock) });
        } catch {
          // Inventory may not exist yet; product is still created/updated
        }
      }

      navigate("/inventory");
    } catch (err) {
      setError(
        normalizeApiError(err).message ||
        `Failed to ${isEditMode ? "update" : "create"} product. Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            <Link to="/inventory" className="hover:text-green-600">
              Inventory
            </Link>{" "}
            › {isEditMode ? "Edit Product" : "Add Product"}
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your product..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Media *
            </h2>
            <p className="text-sm text-gray-500 mb-4">At least one product image is required. You can either upload a file or provide a URL.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product-image.jpg"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a direct link to an image.
              </p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or upload image
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <p className="text-xs text-gray-500 mt-1">
                Upload a local image file (preferred).
              </p>

              {(formData.imagePreview || formData.image) && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Preview
                  </div>
                  <div className="w-48 h-48 bg-gray-50 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={formData.imagePreview || formData.image}
                      alt="preview"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300?text=No+Image";
                      }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="px-6 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
