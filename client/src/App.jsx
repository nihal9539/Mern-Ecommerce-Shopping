
import './App.css'
import Home from "./pages/Home/Home"
import AllProduct from "./pages/AllProducts/AllProduct"
// import Products from "./Componenets/Products/Products"
import Layout from "./Componenets/Layout/Layout"
import NoMatch from "./Componenets/NoMatch/NoMatch"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/all_product' element={<AllProduct />} />
      
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App

