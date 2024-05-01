import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Action/AuthAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [header, setHeader] = useState<boolean>(false);
  const user = useSelector((state) => state.authReducer.authData);

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
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`flex flex-row fixed  justify-between items-center p-3 lg:px-16 md:px-10 max-lg:px-8  w-full ${
        header ? "bg-white border-b-2 border-gray-300" : ""
      } fixed  pr-28  top-0 left-0 z-50 `}
    >
      <div className="text-4xl font-bold" onClick={handleClick}>
        <img
          src="./web_logo/logo_2_2.jpeg"
          style={{ mixBlendMode: "multiply" }}
          className="rounded-lg cursor-pointer"
          width={90}
          alt=""
        />
      </div>
      <ul className="max-lg:hidden flex [&>*]:cursor-pointer flex-row gap-14 items-center text-2xl font-semibold  relative">
        <Link to={"/"} className="">
          Home
        </Link>
        <Link to={"/collection/all"} className="">
        Shop
        </Link>

        <Link to={'/cart'}>Cart</Link>
        <li>WishList</li>
        <li>About</li>
        {user ? (
          <li
            onClick={handleLogout}
            className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOG OUT
          </li>
        ) : (
          <Link
            to={"/login"}
            className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOGIN
          </Link>
        )}
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
        <Link to={"/collection/all"} onClick={() => setOpen(false)} className="">
        Shop
        </Link>
        {/* <Link to={"/women"} onClick={()=>setOpen(false)} className="">
          Women
        </Link> */}
        <Link to={'/cart'}>Cart</Link>
        <li>WishList</li>
        <li>About</li>
        {user ? (
          <li
            onClick={handleLogout}
            className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOG OUT
          </li>
        ) : (
          <Link
            to={"/login"}
            className=" p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOGIN
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Header;
