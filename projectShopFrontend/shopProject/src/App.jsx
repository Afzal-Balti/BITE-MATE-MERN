import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import LayOut from "./components/LayOut";
import Shop from "./components/Shop";
import Product from "./components/product";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import { ContextProvider } from "./components/UserContext";
import AddCarts from "./components/AddCarts";
import Profile from "./components/Profile";
import Contact from "./components/Contact";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes inside layout */}
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
