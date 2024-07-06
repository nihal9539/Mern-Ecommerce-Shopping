import React from "react";

const Footer = () => {
  return (

    <footer className="footer bg-black/90 relative  text-white p-10">
      <aside className="self-end ">
        <p>Copyright © 2024 - All right reserved by Fashio UX</p>
      </aside>
      {/* <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav> */}
      <nav>
        <h6 className="footer-title">Help</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact Us</a>
        <a className="link link-hover">FAQ</a>
        <a className="link link-hover">Accessibility</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
