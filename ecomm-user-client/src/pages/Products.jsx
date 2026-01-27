// src/pages/Products.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../api/productApi';
import ProductCard from '../components/popularProducts/ProductCard';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const search = searchParams.get('q');

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts({ category, search, limit: 20 });

      const allProducts = data.products || data || [];

      const filteredProducts = category
        ? allProducts.filter(
            (p) =>
              p.category &&
              p.category.toLowerCase() === category.toLowerCase()
          )
        : allProducts;

      setProducts(filteredProducts);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [category, search]);


  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category} Products` : search ? `Search: ${search}` : 'All Products'}
      </h1>

      {loading ? (
        <div className="text-center py-20 text-xl">Loading products...</div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}               
              _id={product._id}              
              image={product.images?.[0] || '/placeholder.jpg'}
              title={product.name}
              price={product.price}
              oldPrice={product.originalPrice}
              rating={product.rating || 4}
              sale={product.discount ? `Sale ${product.discount}%` : null}
              selected={false}               
            />
          ))}
        </div>
      )}
    </div>
  );
}