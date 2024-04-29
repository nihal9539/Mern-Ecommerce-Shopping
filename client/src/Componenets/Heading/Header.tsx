import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";

const Header = () => {
  const [header, setHeader] = useState<boolean>(false);

  const menuRef = useRef();

//   useEffect(() => {
//     let handler = (e) => {
//       if (!menuRef.current.contains(e.target)) {
//         setOpen(false);
//         console.log(menuRef.current);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//   }, [menuRef]);
  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-row fixed  justify-between p-3 lg:px-16 md:px-10 max-lg:px-8  w-full ${
        header ? "bg-white border-b-2 border-gray-300" : ""
      } fixed  pr-28  top-0 left-0 z-50 `}
    >
      <h2 className="text-4xl font-bold">
        <img src="./web_logo/logo_2_2.jpeg" style={{mixBlendMode:"multiply"}} className="rounded-lg"  width={90} alt="" />
      </h2>
      <ul className="max-lg:hidden flex [&>*]:cursor-pointer flex-row gap-14 items-center text-2xl font-semibold  relative">
        <Link to={"/"} className="">
          Home
        </Link>
        <Link to={"/all_products"} className="">
          Men
        </Link>
        {/* <Link to={"/women"} className="">
          Women
        </Link> */}
        <li>Cart</li>
        <li>Favourite</li>
        <li>About</li>
        <Link to={'/login'} className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]">
          LOGIN
        </Link>
      </ul>
      <TfiAlignJustify
        onClick={() => setOpen(!isOpen)}
        className="max-lg:block hidden"
        size={30}
      />
      <ul
        // ref={menuRef}
        className={`${
          isOpen
          ? "inline-block right-1  duration-700"
          : "right-[-100%]  duration-700 "
      } border border-gray-300 duration-700    absolute rounded-md  top-[6rem] bg-white flex [&>*]:cursor-pointer flex-col gap-14 p-12 max-sm:p-6 max-sm:px-16 px-36 items-center text-2xl font-semibold  `}
      >
        <Link to={"/"} className="">
          Home
        </Link>
        <Link to={"/all_products"} onClick={()=>setOpen(false)} className="">
          Men
        </Link>
        {/* <Link to={"/women"} onClick={()=>setOpen(false)} className="">
          Women
        </Link> */}
        <li>Cart</li>
        <li>WishList</li>
        <li>About</li>
        <Link to={'/login'} className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]">
          LOGIN
        </Link>
      </ul>
    </div>
  );
};

export default Header;
