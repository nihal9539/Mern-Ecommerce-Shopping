
import { Link } from 'react-router-dom'
import HomeGridImages from '../../Componenets/HomeGridImages/HomeGridImages'
import Products from '../../Componenets/Products/Products'
import Slider from '../../Componenets/Slider/Slider'
import Footer from '../../Componenets/Footer/Footer'
import ChooseCategory from '../../Componenets/ChooseCategory/ChooseCategory'
import Services from '../../Componenets/Services/Services'

const Home = () => {
   

    return (
        <div className=' h-[85vh] '>
            
            <div className={`w-full h-full  max-md:h-80 bg-[url(./bg-3.jpg)]  bg-cover bg-no-repeat relative flex justify-center items-center`}>
                <Link to={'/collection/all'}  className=' btn text-white absolute bottom-5  rounded-none px-7 font-bold '>
                    Shop Now
                </Link>
            </div>
            <Products />
            <ChooseCategory/>
            <Slider/>
            <HomeGridImages/>
            <Services/>
            <Footer />

        </div>
    )
}

export default Home

