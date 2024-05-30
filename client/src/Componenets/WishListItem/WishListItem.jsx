import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../Action/WishlistAction";

const WishListItem = ({ data,setReload }) => {
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
      setWishlist(!WishList);
      setReload(true)
    }
  };
  return (
    <div className="card w-64 h-[26rem] max-sm:w-56  bg-base-100 shadow-xl rounded-xl">
      <figure>
        <div className="z-40  absolute top-3 right-3 cursor-pointer bg-white w-8 h-8 rounded-md shadow-lg grid place-content-center">
          <Heart
            onClick={handleWishlist}
            className=""
            fill={`${WishList ? "red " : "transparent"}`}
            stroke={`${WishList ? "red " : "black"}`}
          />
        </div>
        <div className="h-64 max-sm:h-60 w-full">
          <img src={data?.image} className="w-full h-full" alt="Shoes" />
        </div>
      </figure>
      <div className="card-body p-2">
        <h2 className="card-title">{data?.productname}</h2>
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

        <div className="card-actions justify-center">
          <button className="btn  bg-black text-white hover:bg-gray-950">
            Add to Cart <img src="./shopping-cart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
