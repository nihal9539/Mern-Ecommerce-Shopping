import React, { useEffect, useState } from "react";
import currencyFormatter from "currency-formatter";
import { useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import Navbar from "../../Componenets/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createWishlist,
  removeFromWishlist,
} from "../../Action/WishlistAction";
import LoginModel from "../../Componenets/LoginModel/LoginModel";

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { products } = useSelector((state) => state.productReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const [selectedButton, setSelectedButton] = useState(null);
  const [wishlistbtn, setWishlist] = useState();
 
  useEffect(() => {
    wishlist.find((data)=>data._id == id) ? setWishlist(true) : setWishlist(false);
  }, [products, id]);


  useEffect(() => {
    const product = products?.find((product) => product._id === id);
    if (product) {
      setProductData(product);
    } else {
      setProductData(null);
      setError("This product is not available.");
    }
  }, [id, products]);
  const selectButton = (buttonId) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonId ? null : buttonId
    );
  };

  const userid = useSelector((state) => state?.authReducer?.authData?.user?._id);



  const handleWishlist = () => {
    if (!userid) {
      document.getElementById("my_modal_1").showModal();
    } else {
      if (wishlistbtn) {
        dispatch(removeFromWishlist(userid, id));
        setWishlist(false);
      } else {
        dispatch(createWishlist(userid, id));
        setWishlist(true);
      }
    }
  };

  if (!productData && !error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  if (!productData && error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    ); 
  }

  return (
    <div>
      <Navbar bgWhite={true} />
      <div className="p-12 pt-24 h-[100vh] max-lg:h-full max-lg:px-0   flex flex-row">
        <div className="w-full flex justify-center relative items-center flex-row max-lg:flex-col max-lg:gap-5">
          <div className="w-1/2 max-lg:w-full max-lg:px-4 relative top-0 left-0   flex justify-center  items-center ">
            <img
              src={productData.image}
              className="h-[550px] w-[450px] max-lg:h-[400px] max-lg:w-[350px]"
              alt="Loading.."
            />
          </div>
          <div className="w-1/2 h-[80vh] max-lg:h-full overflow-scroll max-lg:w-full max-lg:px-10 flex flex-col">
            <div className="">
              <h2 className="text-4xl font-medium mb-4">{productData.Title}</h2>
              <h2 className="font-semibold">
                Rs.{" "}
                {currencyFormatter.format(productData.price, {
                  code: "IND",
                })}
              </h2>
              <span>(incl. of all taxes)</span>
            </div>

            <div className=" mt-6">
              <span className=" tracking-wider">SELECT A SIZE</span>
              <div className="flex flex-row gap-2 py-4">
                {productData?.sizes.map((size) => (
                  <button
                    onClick={() => selectButton(size.size)}
                    // disabled={size == "S" }
                    key={size.size}
                    className={`${
                      selectedButton === size.size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }  disabled:text-gray-400 cursor-pointer disabled:border-gray-400 disabled:hover:bg-white p-2 border border-gray-500 rounded-md min-w-10 min-h-10 flex justify-center items-center`}
                  >
                    <h1 className="">{size.size} </h1>
                  </button>
                ))}
              </div>
            </div>

            <div className="my-4">
              <h1 className="font-semibold tracking-widest">PRODUCT DETAILS</h1>
              <p className="pr-12">{productData?.description}</p>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <button
                className="border 
              hover:scale-[.97]
              max-lg:hover:scale-95
              
              duration-500 bg-black text-white border-black p-2.5 rounded-sm"
              >
                ADD TO CART
              </button>

              <button
                // style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                // style={{boxShadow:" 0 6px 12px rgba(0, 0, 0, 0.15)"}}
                onClick={handleWishlist}
                className={`
              hover:scale-[.97]
              max-lg:hover:scale-95
              
              duration-500
              border ${
                wishlistbtn ? "bg-black text-white" : "bg-white border-black"
              }  p-2.5 rounded-sm flex justify-center items-center gap-2`}
              >
                {" "}
                <Heart
                  size={20}
                  fill={`${wishlistbtn ? "red" : "white"} `}
                  color={`${wishlistbtn ? "red" : "black"} `}
                />
                <span className="relative -top-0.5">WISHLIST</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoginModel modelOpen={true} />
    </div>
  );
};

export default Product;
