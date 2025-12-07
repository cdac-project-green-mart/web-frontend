import FeaturedBrands from "../components/featuredBrands/FeaturedBrands";
import HeroSection from "../components/heroSection/HeroSection";
import HotDeals from "../components/hotDeals/HotDeals";
import InstagramFeed from "../components/instagram/InstagramFeed";
import LatestNews from "../components/latestNews/LatestNews";
import PopularCategories from "../components/popularCategories/PopularCategories";
import FeaturedProducts from "../components/popularProducts/FeaturedProducts";
import PopularProducts from "../components/popularProducts/PopularProducts";
import PromoSection from "../components/promoBanners/PromoSection";
import SummerSale from "../components/summerSale/SummerSale";
import Testimonials from "../components/testimonials/Testimonials";

export default function Home() {
  return (
   <div className="relative px-4 md:px-10">
      <HeroSection/>
      <PopularCategories/>
      <PopularProducts/>
      <PromoSection/>
      <HotDeals/>
      <SummerSale/>
      <FeaturedProducts/>
      <LatestNews/>
      <Testimonials/>
      <FeaturedBrands/>
      <InstagramFeed/>
    </div>
  );
}


