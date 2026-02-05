import FeaturedBrands from '../components/featuredBrands/FeaturedBrands'
import HeroSection from '../components/heroSection/HeroSection'
import HotDeals from '../components/hotDeals/HotDeals'
import InstagramFeed from '../components/instagram/InstagramFeed'
import LatestNews from '../components/latestNews/LatestNews'
import PopularCategories from '../components/popularCategories/PopularCategories'

import PopularProducts from '../components/popularProducts/PopularProducts'
import PromoSection from '../components/promoBanners/PromoSection'

import Testimonials from '../components/testimonials/Testimonials'

// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';

// ... other imports

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const [popularRes, featuredRes] = await Promise.all([
          getAllProducts({ limit: 10 }),
          getAllProducts({ limit: 8 }),
        ]);

        const toArray = (data) => {
          if (Array.isArray(data)) return data;
          if (data?.products && Array.isArray(data.products)) return data.products;
          if (data?.data && Array.isArray(data.data)) return data.data;
          return [];
        };
        setPopularProducts(toArray(popularRes));
        setFeaturedProducts(toArray(featuredRes));
      } catch (error) {
        console.error('Failed to load products:', error);
        setPopularProducts([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative px-4 md:px-10">
      <HeroSection />
      <PopularCategories />

      <PopularProducts products={popularProducts} loading={loading} />
      <PromoSection />
      <HotDeals products={featuredProducts ?? []} loading={loading} />

      <LatestNews />
      <Testimonials />
      <FeaturedBrands />
      <InstagramFeed />
    </div>
  );
}