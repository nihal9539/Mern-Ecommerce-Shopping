import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { getUserCart } from "../../Action/CartAction";

// eslint-disable-next-line react/prop-types
const Navbar = ({ bgWhite }) => {
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);
  const user = useSelector((state) => state.authReducer.authData);
  const { quantity,cartData } = useSelector((state) => state.cartReducer);

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);
  return (
    <header
      ref={navbarRef}
      className={`flex justify-between items-center p-3 lg:px-16 md:px-10 max-lg:px-8 w-full ${
        bgWhite
          ? "bg-white border-b-2 border-gray-300"
          : header
          ? "bg-white border-b-2 border-gray-300"
          : ""
      } fixed pr-28 top-0 left-0 z-[99]`}
    >
      <Helmet>
        <title>Fashio UX - Online Shopping</title>
        <meta
          name="description"
          content="Explore a wide range of products at Fashio UX. Shop online for the latest trends in fashion, electronics, and more."
        />
      </Helmet>

      <div className="text-4xl font-bold cursor-pointer" onClick={handleClick}>
        <img
          src="/web_logo/logo_2_2.jpeg"
          className="rounded-lg"
          width={90}
          alt="logo"
        />
      </div>
      <ul className="max-lg:hidden flex gap-14 items-center text-2xl font-semibold relative">
        <Link to={"/"}>Home</Link>
        <Link to={"/collection/all"}>Shop</Link>
        <Link to={"/cart"}  className="relative">
          Cart
          {quantity !== 0 && cartData?.length !== 0  && (
            <div className="text-sm bg-black text-white grid place-items-center rounded-full w-[1.5rem] h-[1.5rem] absolute -top-2 -right-3">
              {quantity}
            </div>
          )}
        </Link>
        <Link to={"/wishlist"}>Wishlist</Link>
        {user ? (
          <User
            className="cursor-pointer"
            onClick={() => {
              navigate("/account");
              setOpen(false);
            }}
          />
        ) : (
          <Link
            to={"/login"}
            className="p-1 px-5 border-2 border-black flex rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOGIN
          </Link>
        )}
      </ul>

      <button
        onClick={() => setOpen(!isOpen)}
        className={`navbar-toggler cursor-pointer hidden mr-5 max-lg:block position-relative ${
          isOpen ? "" : "collapsed"
        }`}
        id="navbarToggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="icon-bar top-bar"></span>
        <span className="icon-bar middle-bar"></span>
        <span className="icon-bar bottom-bar"></span>
      </button>
      <ul
        className={`${
          isOpen
            ? "inline-block right-1 duration-700"
            : "right-[-100%] duration-700"
        } border border-gray-300 duration-700 absolute rounded-md top-[6rem] bg-white flex flex-col gap-10 p-12 max-sm:p-6 max-sm:px-16 px-36 items-center text-2xl font-semibold`}
      >
        <Link to={"/"} onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to={"/collection/all"} onClick={() => setOpen(false)}>
          Shop
        </Link>
        <Link to={"/cart"} onClick={() => setOpen(false)}>
          Cart
        </Link>
        <Link to={"/wishlist"} onClick={() => setOpen(false)}>
          Wishlist
        </Link>
        {user ? (
          <User
            className="cursor-pointer"
            onClick={() => {
              navigate("/account/profile");
              setOpen(false);
            }}
          />
        ) : (
          <Link
            to={"/login"}
            className="p-1 px-5 border-2 border-black flex rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]"
          >
            LOGIN
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
