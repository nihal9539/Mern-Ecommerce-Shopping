/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../Action/WishlistAction";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../Action/CartAction";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";

const WishListItem = ({ data, setReload, forAccountPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [WishList, setWishlist] = useState(true);
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [showImage, setShowImage] = useState(false);


  const user = useSelector((state) => state?.authReducer?.authData?.user?._id);

  function handleAddrTypeChange(e) {
    setSize(e.target.value);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 500); // 0.5 seconds delay

    return () => clearTimeout(timer);
  }, []);
  const handleWishlist = () => {
    if (WishList) {
      dispatch(removeFromWishlist(user, data?._id));
      setReload(true);
      setWishlist(false)
    }
  };
  const handleAddToCart = () => {
    const formData = {
      quantity,
      productId: data?._id,
      size: size,
      price: data?.price,
    };
    dispatch(addToCart(user, formData, navigate));
  };
  return (
    <div
      className={`card ${
        forAccountPage ? "w-56 max-md:w-40 h-[22rem]" : "w-64 h-[26rem] max-sm:w-56"
      }   bg-base-100 shadow-xl rounded-xl`}
    >
      <figure>
        <div className="z-40   absolute top-3 right-3 cursor-pointer visited:bg-red-400 bg-white w-8 h-8 rounded-md shadow-lg grid place-content-center">
          <div className="hover:scale-90 duration-500">
            <Heart
              onClick={handleWishlist}
              className=""
              fill={"red "}
              stroke={"red"}
            />
          </div>
        </div>
        <Link
          to={`/product/${data?._id}`}
          className="h-56 max-sm:h-60 w-full flex justify-center items-center flex-col"
        >
          
          {showImage ? (
            <img
              src={data?.image[0]?.url}
              className="w-10/12 h-32"
              alt="Image"
            />
          ) : (
            <div className="w-10/12 h-32 bg-gray-200" /> // Placeholder div
          )}
        </Link>
      </figure>
      <h1 className="font-semibold text-center">₹{data?.price}</h1>
      <div className="card-body p-2">
        <h2 className={`${forAccountPage && "text-sm"} font-semibold `}>{data?.productname}</h2>
        {data.sizes ? (
          <select
            name=""
            id=""
            defaultValue={size}
            onChange={handleAddrTypeChange}
            className={`border-2 border-gray-200 rounded-md ${forAccountPage ?"p-1":"p-2"} `}
          >
            {data?.sizes.map((size) => (
              <option value={size?.size} key={size?.size}>
                {size?.size}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}
        <div className={`w-full flex justify-evenly items-center ${forAccountPage ?"h-8":"h-10"} rounded-lg border`}>
          <button
            className={`${quantity <= 1 ? "text-gray-300" : "text-teal-700 "}`}
            disabled={quantity <= 1}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            <RiSubtractLine size={25} />
          </button>
          {quantity}
          <button
            className={`${
              quantity >= 20 ? "text-gray-300" : "text-teal-700 "
            } text-2xl`}
            disabled={quantity >= 20}
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <IoMdAdd size={25} />
          </button>
        </div>

        <div className="card-actions w-full justify-center">
          <button
            onClick={handleAddToCart}
            className={` ${forAccountPage ? "h-9":"h-12"} flex justify-center items-center rounded-md hover:shadow-boxShadow1 duration-300 border-black border-2  bg-black w-10/12 text-white `}
          >
             <img src="./shopping-cart.svg" alt="" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
