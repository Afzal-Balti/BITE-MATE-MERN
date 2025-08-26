import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import LayOut from "./components/utils/LayOut";
import Shop from "./components/products/Shop";
import Product from "./components/products/product";
import Logout from "./components/Auth/Logout";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Home from "./components/pages/Home";
import Shopping from "./components/products/Shopping";
import { ContextProvider } from "./components/utils/UserContext";
import AddCarts from "./components/pages/AddCarts";
import Profile from "./components/pages/Profile";
import Contact from "./components/Header/Contact";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<LayOut />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/allproducts" element={<Shopping />} />
              <Route path="/allcarts/:id" element={<AddCarts />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/product" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
