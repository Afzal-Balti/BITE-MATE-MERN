import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import LayOut from "./utils/LayOut";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Logout from "./pages/LogOut";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import { ContextProvider } from "./utils/UserContext";
import AddCarts from "./pages/AddCarts";
import Profile from "./pages/Profile";
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
              <Route path="/home/:id" element={<Home />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<Product />} />
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
