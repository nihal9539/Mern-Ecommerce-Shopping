import React, { useState } from "react";
import HeaderTwo from "../../Componenets/HeaderTwo/HeaderTwo";
import { Heart } from "lucide-react";
import WishListItem from "../../Componenets/WishListItem/WishListItem";

const WishList = () => {
  return (
    <div>
      <HeaderTwo />
      <div className="p-12 px-36 max-lg:px-5 max-sm:px-2  pt-32 grid place-items-center  grid-cols-4 max-lg:grid-cols-3 max-md:grid-col-2 max-sm:grid-cols-2   gap-y-8">
        {[1, 2, 3, 4, 5, 6, 5, 5, 5, 5, 5, 5].map(() => (
          <WishListItem/>
        ))}
      </div>
    </div>
  );
};

export default WishList;
