import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../Action/WishlistAction";

const WishListItem = ({ data, setReload }) => {
  const dispatch = useDispatch();
  const [WishList, setWishlist] = useState(true);
  const [size, setSize] = useState("S");
  const userid = useSelector(
    (state) => state?.authReducer?.authData?.user?._id
  );

  function handleAddrTypeChange(e) {
    setSize(e.target.value);
  }
  const handleWishlist = () => {
    if (WishList) {
      dispatch(removeFromWishlist(userid, data?._id));
      setReload(true);
    }
  };
  return (
    <div className="card w-64 h-[26rem] max-sm:w-56  bg-base-100 shadow-xl rounded-xl">
      <figure>
        <div className="z-40  absolute top-3 right-3 cursor-pointer visited:bg-red-400 bg-white w-8 h-8 rounded-md shadow-lg grid place-content-center">
          <Heart
            onClick={handleWishlist}
            className=""
            fill={`${WishList ? "red " : "transparent"}`}
            stroke={`${WishList ? "red " : "black"}`}
          />
        </div>
        <div className="h-56 max-sm:h-60 w-full flex justify-center items-center flex-col">
          <img src={data?.image} className="w-10/12 p-3 h-full" alt="Shoes" />
        </div>
      </figure>
          <h1 className="font-semibold text-center">₹{data?.price}</h1>
      <div className="card-body p-2">
        <h2 className=" font-semibold">{data?.productname}</h2>
        {data.sizes ? (
          <select
            name=""
            id=""
            defaultValue={size}
            onChange={handleAddrTypeChange}
            className="border-2 border-gray-200 rounded-md p-2 "
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

        <div className="card-actions w-full justify-center">
          <button className="btn  bg-black w-10/12 text-white hover:bg-gray-950">
            Add to Cart <img src="./shopping-cart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
