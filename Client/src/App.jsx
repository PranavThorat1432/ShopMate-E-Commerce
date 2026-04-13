import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar";
import SearchOverlay from "./Components/Layout/SearchOverlay";
import CartSidebar from "./Components/Layout/CartSidebar";
import ProfilePanel from "./Components/Layout/ProfilePanel";
import LoginModal from "./Components/Layout/LoginModal";
import Footer from "./Components/Layout/Footer";

// Pages
import Index from "./Pages/Home.jsx";
import Products from "./Pages/Products.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Cart from "./Pages/Cart.jsx";
import Orders from "./Pages/Orders.jsx";
import Payment from "./Pages/Payment.jsx";
import About from "./Pages/About.jsx";
import FAQ from "./Pages/FAQ.jsx";
import Contact from "./Pages/Contact.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/authSlice.js";
import { Loader } from "lucide-react";
import { fetchAllProducts } from "./Redux/productSlice.js";

const App = () => {

  const {authUser, isCheckingAuth} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    dispatch(fetchAllProducts({
      category: '',
      price: '0-10000',
      search: '',
      ratings: '',
      availability: '',
      page: 1,      
    }));
  }, []);

  const {products} = useSelector((state) => state.product)

  if((isCheckingAuth && !authUser) || !products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <SearchOverlay />
            <CartSidebar />
            <ProfilePanel />
            <LoginModal />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/password/reset/:token" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;