// src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { getStock } from '../api/inventoryApi';
import { addToCart } from '../utils/cartUtils';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addMessage, setAddMessage] = useState(null);
  const [inventory, setInventory] = useState(null); // { productId, productName, stock } from backend-inventory-service

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const load = async () => {
      try {
        const stock = await getStock(id);
        setInventory(stock);
      } catch {
        setInventory(null);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    setAddMessage(null);
    const result = await addToCart(
      {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image,
      },
      quantity
    );

    if (result.success) {
      setAddedToCart(true);
      if (result.message) setAddMessage(result.message);
      setTimeout(() => {
        setAddedToCart(false);
        setAddMessage(null);
      }, 3000);
    } else if (result.message) {
      setAddMessage(result.message);
      setTimeout(() => setAddMessage(null), 3000);
    }
  };

  if (loading) return <div className="text-center py-20">Loading product...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img 
            src={product.images?.[0] || product.image || '/placeholder.jpg'} 
            alt={product.name} 
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-green-600 font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="mb-4"><strong>Category:</strong> {product.category}</p>
          {/* Stock from backend-inventory-service via inventoryApi */}
          {inventory !== null && (
            <p className={`mb-4 ${inventory.stock === 0 ? 'text-red-600 font-semibold' : ''}`}>
              <strong>Stock:</strong>{' '}
              {inventory.stock === 0 ? 'Out of stock' : `${inventory.stock} available`}
            </p>
          )}

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(inventory ? inventory.stock : Infinity, q + 1))}
                className="px-4 py-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                disabled={inventory !== null && quantity >= inventory.stock}
              >
                +
              </button>
            </div>
            {inventory && inventory.stock > 0 && (
              <span className="text-sm text-gray-500">(max {inventory.stock})</span>
            )}
          </div>

          {addMessage && (
            <p className={`mb-4 text-sm ${addMessage.includes('Only') ? 'text-amber-600' : 'text-red-600'}`}>
              {addMessage}
            </p>
          )}

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={inventory !== null && inventory.stock === 0}
              className={`px-8 py-3 rounded-lg font-medium transition ${
                addedToCart
                  ? 'bg-green-700 text-white'
                  : inventory !== null && inventory.stock === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {inventory !== null && inventory.stock === 0
                ? 'Out of stock'
                : addedToCart
                ? '✓ Added to Cart!'
                : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}