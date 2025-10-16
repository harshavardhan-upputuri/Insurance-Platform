


import Navbar from './Customer/Components/Navbar';
import SingleProduct from './Customer/Components/SingleProduct';
import Home from './Customer/Pages/Home';
import './App.css'
import Footer from './Customer/Components/Footer';
import Products from './Customer/Pages/Products'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cart from './Customer/Pages/Cart'
import Applications from './Customer/Pages/Applications'
import Login from './Customer/Pages/Login'
import SignUp from './Customer/Pages/Signup'


// Admin Pages


import Profile from './Customer/Pages/Profile'
import SellerMainPage from './Seller/Components/SellerMainPage'
import SellerNavbar from './Seller/Components/SellerNavbar'
import AdminNavbar from './Admin/Components/AdminNavbar'
import BecomeSeller from './Seller/Pages/Become Seller/BecomeSeller'
import DisplayApplication from './Customer/Pages/Applications/DisplayApplication';
import InsuranceOrder from './Customer/Pages/InsuranceOrder';
import PaymentSuccess from './Customer/Pages/PaymentSuccess';
import UserOrders from './Customer/Pages/UserOrders';
import UserTransactions from './Customer/Pages/UserTransactions';
import Account from './Customer/Pages/Account';
import About from './Customer/Pages/About';
import ProtectedRoute from './ProtectedRoute';
import AdminProfile from './Admin/Pages/AdminProfile';
import AdminDashboard from './Admin/Pages/AdminDashboard';
import AdminUsersTable from './Admin/Pages/AdminUsersTable';
import AdminSellersTable from './Admin/Pages/AdminSellersTable';
import AdminTransactionTable from './Admin/Pages/AdminTransactionTable';
import AdminOrdersTable from './Admin/Pages/AdminOrdersTable';
import AdminAccount from './Admin/Pages/AdminAccout';
import OAuth2RedirectHandler from './Util/OAuth2RedirectHandler';



// App Wrapper for Layout Logic
const AppWrapper = () => {
  const location = useLocation();

  // Hide Navbar/Footer for admin routes
  const isAgentRoute = location.pathname.startsWith("/admin");
  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <>
      {!isAgentRoute && !isSellerRoute && <Navbar />}
      {isAgentRoute && <AdminNavbar />}
      {isSellerRoute && <SellerNavbar />}

      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/singleproduct/:id" element={<SingleProduct />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/about" element={<About />} />
    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
  {/* Customer Protected Routes */}
  <Route
    path="/profile/*"
    element={
      <ProtectedRoute role="ROLE_CUSTOMER">
        <Account />
      </ProtectedRoute>
    }
  />
  <Route
    path="/cart"
    element={
      <ProtectedRoute role="ROLE_CUSTOMER">
        <Cart />
      </ProtectedRoute>
    }
  />
  <Route
    path="/orders"
    element={
      <ProtectedRoute role="ROLE_CUSTOMER">
        <UserOrders />
      </ProtectedRoute>
    }
  />
  <Route
    path="/transactions"
    element={
      <ProtectedRoute role="ROLE_CUSTOMER">
        <UserTransactions />
      </ProtectedRoute>
    }
  />

  {/* Seller Protected Routes */}
  <Route
    path="/seller/*"
    element={
      <ProtectedRoute role="ROLE_SELLER">
        <SellerMainPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/become-seller"
    element={
      <BecomeSeller />
    }
  />

  {/* Admin Protected Routes */}
  <Route
    path="/admin/*"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminAccount/>
      </ProtectedRoute>
    }
  />

  {/* <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminDashboard/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminUsersTable/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/sellers"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminSellersTable/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/transactions"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminTransactionTable/>
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/orders"
    element={
      <ProtectedRoute role="ROLE_ADMIN">
        <AdminOrdersTable/>
      </ProtectedRoute>
    }
  /> */}
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

// <Routes>
//         {/* Public/Main Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/singleproduct/:id" element={<SingleProduct />} />
//         {/* <Route path="/cart" element={<Cart />} /> */}
//         {/* <Route path="/applications" element={<DisplayApplication />} /> */}
//         <Route path="/insuranceOrder/:id" element={<InsuranceOrder />} />
//         {/* <Route path="/orders" element={<UserOrders />} /> */}
//         <Route path="/profile/*" element={<Account />} />
//         <Route path="/application/:id" element={<Applications />} />
        
//         {/* <Route path="/transactions" element={<UserTransactions />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         <Route path="/payment-success/:orderId" element={<PaymentSuccess />}   />

//         <Route path='/about' element={<About/>}/>
//         <Route path='/seller/about' element={<About/>}/>

//         {/* Agent Routes */}


//         <Route path="/agent/products" element={<AgentProduct />} />
//         <Route path="/agent/addproducts" element={<AgentAddProducts />} />
//         <Route path="/agent/clients" element={<Clients />} />
//         <Route path="/agent/requests" element={<Request />} />
//         <Route path="/agent/login" element={<Login />} />
//         <Route path="/agent/signup" element={<SignUp />} />


//         {/* Seller Routes */}
//         <Route path="/seller/*" element={<SellerMainPage />} />
//         <Route path='/become-seller' element={<BecomeSeller />} />
//       </Routes>