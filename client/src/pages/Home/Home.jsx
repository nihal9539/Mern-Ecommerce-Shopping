import { Link } from "react-router-dom";
import HomeGridImages from "../../Componenets/HomeGridImages/HomeGridImages";
import Products from "../../Componenets/Products/Products";
import Slider from "../../Componenets/Slider/Slider";
import Footer from "../../Componenets/Footer/Footer";
import ChooseCategory from "../../Componenets/ChooseCategory/ChooseCategory";
import Services from "../../Componenets/Services/Services";
import LeatestTrend from "../../Componenets/LeatestTrend/LeatestTrend";

const Home = () => {
  return (
    <div className=" h-[85vh] ">
      <div
        className={`w-full h-full  max-md:h-80 bg-[url(./bg-3.jpg)]  bg-cover bg-no-repeat relative flex justify-center items-center`}
      >
        <Link
          to={"/collection/all"}
          className=" btn text-white absolute bottom-5  rounded-none px-7 font-bold "
        >
          Shop Now
        </Link>
      </div>
      <Products />
      <ChooseCategory />
      <Slider />
      <LeatestTrend/>
      <section className="h-20 place-content-center text-white text-2xl max-lg:text-xs  w-full bg-black/95 my-10 mb-16 uppercase">
           <h1 className="text-center">
           Shop Now, Enjoy Express Delivery, and Take Advantage of Free Returns within 28 Days!            </h1>
      </section>
      <HomeGridImages />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
