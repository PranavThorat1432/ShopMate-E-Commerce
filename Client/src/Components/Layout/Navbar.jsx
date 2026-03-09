import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleCart, toggleSearchBar, toggleSidebar } from "../../Redux/PopupSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cart} = useSelector((state) => state.cart);

  let cartItemsCount = 0;
  if(cart) {
    cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <nav className={`fixed left-0 w-full top-0 z-50 border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LEFT - HAMBURGER MENU */}
          <button onClick={() => dispatch(toggleSidebar())} className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <Menu className={`w-6 h-6 cursor-pointer ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}/>
          </button>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center" onClick={() => navigate('/')}>
            <h1 className={`text-2xl font-bold text-primary cursor-pointer`}>ShopMate</h1>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center space-x-2 ">
            {/* THEME TOGGLE */}
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              {
                theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-gray-100"/>
                ) : (
                  <Moon className="w-5 h-5 text-gray-900"/>
                )
              }
            </button>

            {/* SEARCH OVERLAY */}
            <button onClick={() => dispatch(toggleSearchBar())} className={`p-2 rounded-lg transition-colors cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <Search className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}/>
            </button>

            {/* USER PROFILE */}
            <button onClick={() => dispatch(toggleAuthPopup())} className={`p-2 rounded-lg transition-colors cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}/>
            </button>

            {/* CART */}
            <button onClick={() => dispatch(toggleCart())} className={`relative p-2 rounded-lg transition-colors cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <ShoppingCart className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}/>
              {
                cartItemsCount > 0 && (
                  <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}>{cartItemsCount}</span>
                )
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  )

};

export default Navbar;