import "./App.css";
import MenProducts from "./pages/MenProducts/MenProducts";
// import WomenProducts from "./pages/WomenProducts/WomenProducts"
import Product from "./pages/Product/Product";
// import Products from "./Componenets/Products/Products"
import Layout from "./Componenets/Layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Cart from "./pages/Cart/Cart";
import WishList from "./pages/WishList/WishList";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NoMatch from "./Componenets/NoMatch/NoMatch";
import DashboardLayout from "./Componenets/DashboardLayout/DashboardLayout";
import DashboardOrders from "./Componenets/DashboardOrders/DashboardOrders";
import DashboardEmployees from "./Componenets/DashboardEmployees/DashboardEmployees";
import DashboardCustomers from "./Componenets/DashboardCustomers/DashboardCustomers";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardProduct from "./Componenets/DashboardProduct/DashboardProduct";
import AddProduct from "./Componenets/AddProduct/AddProduct";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/collection/all" element={<MenProducts />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ecommerce" element={<Dashboard />} />
          <Route path="products" element={<DashboardProduct />}>
          </Route>
          <Route path="products/add-product" element={<AddProduct />} />

          <Route path="orders" element={<DashboardOrders />} />
          <Route index path="employees" element={<DashboardEmployees />} />
          <Route path="customers" element={<DashboardCustomers />} />
        </Route>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
