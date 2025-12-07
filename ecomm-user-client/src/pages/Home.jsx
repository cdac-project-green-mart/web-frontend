import HeroSection from "../components/heroSection/HeroSection";
import HotDeals from "../components/hotDeals/HotDeals";
import PopularCategories from "../components/popularCategories/PopularCategories";
import PopularProducts from "../components/popularProducts/PopularProducts";
import PromoSection from "../components/promoBanners/PromoSection";
import SummerSale from "../components/summerSale/SummerSale";

export default function Home() {
  return (
   <div className="px-4 md:px-10">
      <HeroSection/>
      <PopularCategories/>
      <PopularProducts/>
      <PromoSection/>
      <HotDeals/>
      <SummerSale/>
      {/* other sections will come here */}
    </div>
  );
}


