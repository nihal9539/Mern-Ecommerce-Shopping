import React, { useEffect, useState } from 'react'
import Products from '../../Componenets/Products/Products'
import Footer from '../../Componenets/Footer/Footer'
import Slider from '../../Componenets/Slider/Slider'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className=' h-[85vh] '>
            <div className='w-full h-full bg-[url(./bg-3.jpg)] bg-cover bg-no-repeat relative flex justify-center items-center'>
                <Link to={'/collection/all'}  className=' btn text-white mt-64  rounded-none px-7 font-bold '>
                    Shop Now
                </Link>
            </div>
            <Products />
            <Slider/>
            <Footer />

        </div>
    )
}

export default Home

