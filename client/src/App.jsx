
import './App.css'
import Home from "./pages/Home/Home"
import MenProducts from "./pages/MenProducts/MenProducts"
// import WomenProducts from "./pages/WomenProducts/WomenProducts"
import Product from "./pages/Product/Product"
// import Products from "./Componenets/Products/Products"
import Layout from "./Componenets/Layout/Layout"
import NoMatch from "./Componenets/NoMatch/NoMatch"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
function App() {

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path='/all_products' element={<MenProducts />} />
          {/* <Route path='/women' element={<WomenProducts />} /> */}
          <Route path='/product/:id' element={<Product />} />
      
          <Route path='/login' element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

