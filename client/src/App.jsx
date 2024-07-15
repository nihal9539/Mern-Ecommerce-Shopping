import "./App.css";
import Layout from "./Componenets/Layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// componenets
import Cart from "./pages/Cart/Cart";
import WishList from "./pages/WishList/WishList";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NoMatch from "./Componenets/NoMatch/NoMatch";
import DashboardLayout from "./Componenets/Dashboard/DashboardLayout/DashboardLayout";
import DashboardOrders from "./Componenets/Dashboard/DashboardOrders/DashboardOrders";
import DashboardEmployees from "./Componenets/Dashboard/DashboardEmployees/DashboardEmployees";
import Dashboard from "./Componenets/Dashboard/Dashboard/Dashboard";
import DashboardProduct from "./Componenets/Dashboard/DashboardProduct/DashboardProduct";
import AddProduct from "./Componenets/Dashboard/AddProduct/AddProduct";
import Product from "./pages/Product/Product";
import Checkout from "./pages/Checkout/Checkout";
import Account from "./pages/Account/Account";
import Profile from "./Componenets/Profile/Profile";
import Order from "./Componenets/Order/Order";
import EditProduct from "./Componenets/Dashboard/EditProduct/EditProduct";
import ViewProduct from "./Componenets/Dashboard/ViewProduct/ViewProduct";
import AllProduct from "./pages/AllProduct/AllProduct";

import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import OrderById from "./pages/OrderById/OrderById";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const admin = useSelector((state) => state.authReducer.admin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="collection/all" element={<AllProduct />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="wishList"
            element={user ? <WishList /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="checkout"
            element={user ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="account"
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
            <Route
              path="order/:id"
              element={user ? <OrderById /> : <Navigate to="/login" />}
            />
          </Route>
        </Route>
        {/* admin login */}
        <Route
          path="admin-login"
          element={admin ? <Navigate to={"/dashboard"} /> : <AdminLogin />}
        />
        {/* Dash board routes */}
        <Route
          path="/"
          element={
            admin ? <DashboardLayout /> : <Navigate to={"/admin-login"} />
          }
        >
          <Route
            path="dashboard"
            element={admin ? <Dashboard /> : <Navigate to={"/admin-login"} />}
          />
          <Route
            path="ecommerce"
            element={admin ? <Dashboard /> : <Navigate to={"/admin-login"} />}
          />
          <Route
            path="products"
            element={
              admin ? <DashboardProduct /> : <Navigate to={"/admin-login"} />
            }
          ></Route>
          <Route
            path="products/add-product"
            element={admin ? <AddProduct /> : <Navigate to={"/admin-login"} />}
          />
          <Route
            path="products/edit-product/:id"
            element={admin ? <EditProduct /> : <Navigate to={"/admin-login"} />}
          />
          <Route
            path="products/:id"
            element={admin ? <ViewProduct /> : <Navigate to={"/admin-login"} />}
          />

          <Route
            path="orders"
            element={
              admin ? <DashboardOrders /> : <Navigate to={"/admin-login"} />
            }
          />
          <Route
            path="orders/:id"
            element={
              admin ? (
                <OrderById dashboard={true} />
              ) : (
                <Navigate to={"/admin-login"} />
              )
            }
          />
          <Route
            index
            path="employees"
            element={
              admin ? <DashboardEmployees /> : <Navigate to={"/admin-login"} />
            }
          />
        </Route>
      </Routes>
      <ToastContainer style={{ fontSize: "14px", zIndex: "999999" }} />
    </BrowserRouter>
  );
}

export default App;
