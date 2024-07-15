import { Instagram, Twitter } from "lucide-react";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer max-md:hidden  bg-black/95 grid-cols-4 text-white p-10 max-md:px-2">
        <nav>
          <h2 className="footer-title">Navigate</h2>

          <Link className="link link-hover" to={"/"}>Home</Link>
          <Link className="link link-hover" to={"/collection/all"}>Shop</Link>
          <Link className="link link-hover" to={"/cart"}>Cart</Link>
          <Link className="link link-hover" to={"/wishlist"}>Wishlist</Link>
        </nav>        
        <nav>
          <h2 className="footer-title">Customer Service</h2>
          <a className="link link-hover">About US</a>
          <a className="link link-hover">Terms Of Use</a>
          <a className="link link-hover">Returns & Exchanges</a>
          <a className="link link-hover">Shipping Terms</a>
        </nav>
       
        <nav>
          <h2 className="footer-title">Socila Media</h2>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">TikTok</a>
          <a className="link link-hover">Twitter</a>
        </nav>
        <nav>
          <h2 className="footer-title">Contact</h2>
          <a className="link link-hover">mohammednihal691@gmail.com</a>
          <a className="link link-hover">+91 9539949151</a>
        </nav>
      </footer>

      <footer className="footer bg-black/95 border-t text-white border-gray-600 place-items-center py-4">
        <aside className=" place-items-center">
          <p className="text-center">Copyright © 2024 - All right reserved by <br className="max-md:block hidden" /> <span className="max-md:text-lg">Fashio UX</span></p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
