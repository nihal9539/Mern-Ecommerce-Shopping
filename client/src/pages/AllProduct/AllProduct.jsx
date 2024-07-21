import  { useEffect, useState } from "react";
("react-accessible-accordion");
import "react-accessible-accordion/dist/fancy-example.css";
import Card from "../../Componenets/Card/Card";
import ProductsAccordian from "../../Componenets/ProductFilter/ProductFilter";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon, X } from "lucide-react";
import { getAllProduct } from "../../Action/ProductAction";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const AllProduct = () => {
  const { products } = useSelector((state) => state?.productReducer);
  const [isOpen, setOpen] = useState(false);
  const genderFilterData = useSelector((state) => state?.filterReducer?.gender);
  const { maxPrice, minPrice, categoryFilter } = useSelector(
    (state) => state?.filterReducer
  );
  
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const filteredProducts = products.filter((item) => {

    const matchesCategory =
      categoryFilter.length === 0 ||
      item.category.some((cat) => categoryFilter.includes(cat));
    const matchesGender =
      genderFilterData.length === 0 || genderFilterData.includes(item.gender);
    const matchesPrice =
      (minPrice.length === 0 || item.price >= minPrice[0]) &&
      (maxPrice.length === 0 || item.price <= maxPrice[0]);
    const matchesSearch =
      item.productname.toLowerCase().includes(filter.toLowerCase()) ||
      item.subTitle.toLowerCase().includes(filter.toLowerCase());

    return matchesCategory && matchesGender && matchesPrice && matchesSearch;
  });
  return (
    <div>
      <div className="p-12 max-md:px-0 pt-32 relative  flex flex-row">
        <div className="w-[20%] h-[100vh] pb-10 overflow-auto sticky top-20 max-md:hidden  p-1">
          <h1 className="text-2xl p-4 tracking-wider font-bold">FILTERS</h1>
          <hr className="w-full h-1 my-2 " />
          <ProductsAccordian />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center max-md:justify-between justify-end max-md:px-2">
            <div className="  p-2 px-1 ">
              <div className="  flex items-center gap-2 p-2 max-md:p-1.5 w-80 max-md:w-72  border-2 hover:border-black/80 bg-gray-200  hover:bg-white rounded-3xl">
                <form action="" className=" flex w-full p-1 gap-2">
                  <button type="submit">
                    {" "}
                    <SearchIcon size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={filter}
                    onChange={handleChange}
                    className="border-none bg-transparent  outline-none w-full "
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
            <HiOutlineAdjustmentsHorizontal
              size={30}
              strokeWidth={2}
              onClick={() => {
                setOpen(!isOpen);
              }}
              className="hidden max-md:block max-md:mr-2 cursor-pointer"
            />
          </div>

          <div className="w-full gap-4 grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-sm:grid-cols-2 p-2 max-md:px-5">
            {filteredProducts.map((data, index) => (
              <ProductObserver key={index} data={data} />
            ))}
           
          </div>
          {filteredProducts.length === 0 && (
              <div className=" flex flex-col items-center h-screen  justify-center gap-2 p-2">
                No products found
              </div>
            )}
          {/* Right side bar */}
          <div
            className={`${
              isOpen
                ? "inline-block right-0 duration-300 opacity-100"
                : "right-[-100%] duration-300  opacity-0"
            } border border-gray-300 duration-300 fixed rounded-md top-0  z-[99999] h-screen bg-black/20 w-full flex justify-end`}
          >
            <div className="bg-black/80 cursor-pointer  h-8 w-8 grid place-items-center">
              <X
                color="white"
                size={30}
                onClick={() => {
                  setOpen(!isOpen);
                }}
              />
            </div>
            <div className="w-3/4 pl-10 bg-white relative h-screen float-right right-0 p-5">
              <ProductsAccordian />
              <button
                onClick={() => {
                  setOpen(!isOpen);
                }}
                className="absolute bottom-0 right-0 w-full p-3 bg-black/90 text-white"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// eslint-disable-next-line react/prop-types
const ProductObserver = ({ data }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1, // Adjust the threshold as needed
  });

  return (
    <div ref={ref}>
      {isIntersecting ? <Card data={data} /> : <div style={{ height: '300px', width: '100%' }} />} {/* Adjust placeholder height and width as needed */}
    </div>
  );
};

export default AllProduct;
