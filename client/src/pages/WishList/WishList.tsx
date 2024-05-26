import React from "react";
import WishListItem from "../../Componenets/WishListItem/WishListItem";
import Navbar from "../../Componenets/Navbar/Navbar";
import { useSelector } from "react-redux";

const WishList = () => {
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  console.log(wishlist);

  if (wishlist.length <= 0) {
    return (
      <>
          <Navbar bgWhite={true} />
        <div className="w-full text-2xl h-screen font-semibold flex text-red-700 justify-center items-center">
          Wishlist is empty!
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar bgWhite={true} />
      <div className="p-12 px-36 max-lg:px-5 max-sm:px-2  pt-32 grid place-items-center  grid-cols-4 max-lg:grid-cols-3 max-md:grid-col-2 max-sm:grid-cols-2   gap-y-8">
        {wishlist.map(() => (
          <WishListItem />
        ))}
      </div>
    </div>
  );
};

export default WishList;
