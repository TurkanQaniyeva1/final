import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./assets/store/store";
import "./index.css";
import Home from "./assets/pages/HomePage/Home";
import Footer from "./assets/companents/Footer/Footer";
import Header from "./assets/companents/Header/Header";
import Login from "./assets/pages/Login/Login";
import Register from "./assets/pages/Register/Register";
import Admin from "./assets/pages/Admin/Admin";
import NotFound from "./assets/pages/NotFound/NotFound";
import ProfilePage from "./assets/pages/Profile/Profile";
import AdminLogin from "./assets/pages/Admin/components/AdminLogin/AdminLogin";
import ProtectedRoute from "./assets/pages/Admin/ProtectedRoute";
import Detail from "./assets/pages/Detail/Detail";
import Wishlist from "./assets/features/Wishlist/Wishlist";
import Cart from "./assets/features/Cart/Cart";

const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/discover" element={<><Header /><Home /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile/:id" element={<><Header /><ProfilePage /><Footer /></>} />
          <Route path="/profile" element={<><Header /><ProfilePage /><Footer /></>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/wishlist" element={<><Header/> <Wishlist /> <Footer/></>} />
          <Route path="/cart" element={<><Header/> <Cart /> <Footer/></>} />



        </Routes>
      </Router>
    </Provider>
  );
} else {
  console.error("Root element not found");
}
