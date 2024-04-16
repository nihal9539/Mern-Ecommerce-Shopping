import React, { useEffect, useState } from 'react'
import Products from '../../Componenets/Products/Products'
import Footer from '../../Componenets/Footer/Footer'
import Slider from '../../Componenets/Slider/Slider'

const Home = () => {





    return (
        <div className=' h-[85vh] '>
            <div className='w-full h-full bg-[url(./bg-3.jpg)] bg-cover bg-no-repeat relative'>
            </div>
            <Products />
            
            <Slider/>
            <Footer />

        </div>
    )
}

export default Home

