import HeroSection from "../components/heroSection/HeroSection";
import HotDeals from "../components/hotDeals/HotDeals";
import PopularCategories from "../components/popularCategories/PopularCategories";
import PopularProducts from "../components/popularProducts/PopularProducts";
import PromoSection from "../components/promoBanners/PromoSection";

export default function Home() {
  return (
   <div className="px-4 md:px-10">
      <HeroSection/>
      <PopularCategories/>
      <PopularProducts/>
      <PromoSection/>
      <HotDeals/>
      {/* other sections will come here */}
    </div>
  );
}


