import React, { useEffect, useState } from "react";
import currencyFormatter from "currency-formatter";
import { useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import Navbar from "../../Componenets/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../Action/WishlistAction";
import LoginModel from "../../Componenets/LoginModel/LoginModel";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { addToCart } from "../../Action/CartAction";
import { v4 as uuidv4 } from 'uuid';

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { products } = useSelector((state) => state.productReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const [selectSize, setSelectSize] = useState("S");
  const [wishlistbtn, setWishlist] = useState();
  const [quantity, setQuantity] = useState(1);

  // userId from redux store
  const user = useSelector((state) => state.authReducer?.authData?.user?._id);

  // wishlist fetching
  useEffect(() => {
    dispatch(fetchWishlist(user));
  }, []);

  // checking product is available or not
  useEffect(() => {
    const product = products?.find((product) => product._id === id);
    if (product) {
      setProductData(product);
    } else {
      setProductData(null);
      setError("This product is not available.");
    }
  }, [id, products]);

  // handling the size of the product
  const handleSize = (buttonId) => {
    setSelectSize((prevSelectedButton) =>
      prevSelectedButton === buttonId ? null : buttonId
    );
  };

  //  handle the wishlist add and remove
  const handleWishlist = () => {
    if (!user) {
      document.getElementById("my_modal_1").showModal();
    } else {
      if (wishlistbtn) {
        dispatch(removeFromWishlist(user, id));
        setWishlist(false);
      } else {
        dispatch(createWishlist(user, id));
        setWishlist(true);
      }
    }
  };

  useEffect(() => {
    wishlist.find((data) => data._id == id)
      ? setWishlist(true)
      : setWishlist(false);
  }, [products, id]);

  // handle add to cART
  const handleAddToCart = () => {
    const data = {
      quantity,
      productId: productData?._id,
      size: selectSize,
      price: productData?.price,
      uuid:uuidv4()
    };
    dispatch(addToCart(user, data,navigate));
    
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
              src={productData?.images?.url}
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
                    onClick={() => handleSize(size.size)}
                    key={size.size}
                    className={`${
                      selectSize === size.size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }  disabled:text-gray-400 cursor-pointer disabled:border-gray-400 disabled:hover:bg-white p-2 border border-gray-500 rounded-md min-w-10 min-h-10 flex justify-center items-center`}
                  >
                    <h1 className="">{size.size} </h1>
                  </button>
                ))}
              </div>
              <div className="flex flex-row  gap-5 items-center">
                Quantity :
                <div className="flex justify-center items-center gap-5 rounded-2xl border border-gray-700 px-3 p-1.5">
                  <button
                    className=""
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    <RiSubtractLine color={quantity <= 1 ? "gray" : "black"} />
                  </button>
                  <div>{quantity}</div>
                  <button
                    className=""
                    disabled={quantity >= 20}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <IoMdAdd color={quantity >= 20 ? "gray" : "black"} />
                  </button>
                </div>
              </div>
            </div>

            <div className="my-4">
              <h1 className="font-semibold tracking-widest">PRODUCT DETAILS</h1>
              <p className="pr-12">{productData?.description}</p>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <button
                onClick={handleAddToCart}
                className="border 
              hover:scale-[.97]
              max-lg:hover:scale-95
              
              duration-500 bg-black text-white border-black p-2.5 rounded-sm"
              >
                ADD TO CART
              </button>

              <button
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
