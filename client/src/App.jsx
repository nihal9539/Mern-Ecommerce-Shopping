import "./App.css";
import MenProducts from "./pages/MenProducts/MenProducts";
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
import Product from "./pages/Product/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import Checkout from "./pages/Checkout/Checkout";
import Account from "./pages/Account/Account";
import Profile from "./Componenets/Profile/Profile";
import Order from "./Componenets/Order/Order";
import '@mantine/core/styles.css';

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/collection/all" element={<MenProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishList"
          element={user ? <WishList /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/login" />}
        >
          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="wishList"
            element={
              user ? (
                <WishList forAccountPage={true} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="order"
            element={user ? <Order /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Dash board routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ecommerce" element={<Dashboard />} />
          <Route path="products" element={<DashboardProduct />}></Route>
          <Route path="products/add-product" element={<AddProduct />} />
          <Route path="products/:id" element={<Product />} />

          <Route path="orders" element={<DashboardOrders />} />
          <Route index path="employees" element={<DashboardEmployees />} />
          <Route path="customers" element={<DashboardCustomers />} />
        </Route>
      </Routes>
      <ToastContainer style={{ fontSize: "14px", zIndex: "999999" }} />
    </BrowserRouter>
  );
}

export default App;
