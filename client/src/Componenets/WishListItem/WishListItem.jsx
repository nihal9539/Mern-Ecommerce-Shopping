import { Heart } from 'lucide-react';
import React, { useState } from 'react'

const WishListItem = () => {
    const [WishList, setWishlist] = useState(true);

  return (
    <div className="card w-64 max-sm:w-44 bg-base-100 shadow-xl rounded-xl">
            <figure>
              <div className="z-40  absolute top-3 right-3 bg-white w-8 h-8 rounded-md shadow-lg grid place-content-center">
                <Heart
                  onClick={() => setWishlist(!WishList)}
                  className=""
                  fill={`${WishList ? "red " : "transparent"}`}
                  stroke={`${WishList ? "red " : "black"}`}
                />
              </div>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body p-2">
              <h2 className="card-title">Man shirt</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-center">
                <button className="btn  bg-black text-white hover:bg-gray-950">
                  Add to Cart <img src="./shopping-cart.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
  )
}

export default WishListItem
