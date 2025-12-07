import HeroSection from "../components/heroSection/HeroSection";
import PopularCategories from "../components/popularCategories/PopularCategories";
import PopularProducts from "../components/popularProducts/PopularProducts";

export default function Home() {
  return (
   <div className="px-4 md:px-10">
      <HeroSection/>
      <PopularCategories/>
      <PopularProducts/>
      {/* other sections will come here */}
    </div>
  );
}


