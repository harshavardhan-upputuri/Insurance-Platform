
import Home from '../Pages/Home'
import Navbar from '../Components/Navbar'
import './App.css'
import Footer from '../Components/Footer'
import Products from '../Pages/Products'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SingleProduct from '../Components/SingleProduct'
import Cart from '../Pages/Cart'
import Applications from '../Pages/Applications'
import Login from '../Pages/Login'
import SignUp from '../Pages/Signup'


// Admin Pages

import AgentNav from '../Pages/Agent/AgentNav'
import AgentProduct from '../Pages/Agent/AgentProduct'
import AgentAddProducts from '../Pages/Agent/AgentAddProducts'
import Clients from '../Pages/Agent/Clients'
import Request from '../Pages/Agent/Request'
 

// App Wrapper for Layout Logic
const AppWrapper = () => {
  const location = useLocation();

  // Hide Navbar/Footer for admin routes
  const isAgentRoute = location.pathname.startsWith("/agent");

  return (
    <>
      {!isAgentRoute && <Navbar />}
      {isAgentRoute && <AgentNav />}
      <Routes>
        {/* Public/Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/application/:id" element={<Applications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Agent Routes */}
      
        
        <Route path="/agent/products" element={<AgentProduct/>} />
        <Route path="/agent/addproducts" element={<AgentAddProducts/>}/>
        <Route path="/agent/clients" element={<Clients/>}/>
        <Route path="/agent/requests" element={<Request/>}/>
        <Route path="/agent/login" element={<Login />} />
        <Route path="/agent/signup" element={<SignUp />} />
      </Routes>

      {!isAgentRoute && <Footer />}
    </>
  );
};

// Main App
function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

