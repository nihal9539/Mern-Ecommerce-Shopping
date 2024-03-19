import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    
    const [header, setHeader] = useState<boolean>(false)

    // window.addEventListener("scroll", function () {
    //     var header = document.getElementById("header");
    //     header?.classList.toggle("stickt", window.scrollY > 0)
    // })

    useEffect(() => {
        const handleScroll = () => {
            setHeader(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div className={`flex flex-row  justify-between p-5 px-16 w-full ${header ? "bg-white border-b-2 border-gray-300" : ""} fixed  pr-28  top-0 left-0 z-50 `}>
    <h2 className='text-4xl font-bold'>LOGO</h2>
    <ul className='flex [&>*]:cursor-pointer flex-row gap-14 items-center text-2xl font-semibold  relative'>
        <Link to={"/"} className=''>Home</Link>
        <Link to={'/product'} className=''>Product</Link>
        <li>Cart</li>
        <li>Favourite</li>
        <li>About</li>
        <li className=' p-1 px-5  border-2 border-black flex rounded-md   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.12)]' >LOGIN</li>
    </ul>
</div>
  )
}

export default Header
