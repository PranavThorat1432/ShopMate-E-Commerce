import { Search, Sparkles, Star, Filter } from "lucide-react";
import { categories } from "../Data/products";
import ProductCard from "../Components/Products/ProductCard";
import Pagination from "../Components/Products/Pagination";
import AISearchModal from "../Components/Products/AISearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Redux/productSlice";
import { toggleAIModal } from "../Redux/PopupSlice";

const Products = () => {

  const {products, totalProducts} = useSelector((state) => state.product);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = query.get('search');
  const searchedCategory = query.get('category');

  const [searchQuery, setSearchQuery] = useState(searchTerm || '');
  const [selectedCategory, setSelectedCategory] = useState(searchedCategory || '');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllProducts({
      category: selectedCategory,
      price: `${priceRange[0]} - ${priceRange[1]}`,
      search: searchQuery,
      ratings: selectedRating,
      availability: availability,
      page: currentPage,      
    }));
  }, [dispatch, selectedCategory, priceRange, searchQuery, selectedRating, availability, currentPage]);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <div className="min-h-screen pt-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} 
            className="lg:hidden mb-4 p-3 glass-card hover:glow-on-hover animate-smooth flex items-center space-x-2"
          >
            <Filter className="w-5 h-5"/>
            <span>Filters</span>
          </button>

          {/* Sidebar Filters */}
          <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} w-full lg:w-80 space-y-6`}>
            <div className="glass-panel">
              <h2 className="text-xl font-semibold text-foreground mb-6">Filters</h2>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  Price Range
                </h3>

                <div className="space-y-2 ">
                  <input 
                    type="range" 
                    min={0} 
                    max={10000} 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} 
                    className="w-full cursor-pointer"
                  />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  Ratings
                </h3>

                <div className="space-y-2">
                  {
                    [5, 4, 3, 2, 1].map((rating) => {
                      return (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(
                            selectedRating === rating ? 0 : rating
                          )}
                          className={`flex items-center space-x-2 w-full p-2 rounded ${selectedRating === rating ? 'bg-primary/20' : 'hover:bg-secondary'} cursor-pointer`}
                        >
                          {
                            [...Array(5)].map((_, index) => {
                              return (
                                <Star 
                                  key={index} 
                                  className={`w-4 h-4 ${index < rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'}`
                                  }
                                />
                              )
                            })
                          }
                        </button>
                      )
                    })
                  }
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  Availability
                </h3>

                <div className="space-y-2 ">
                  {
                    ['in-stock', 'limited', 'out-of-stock'].map((status) => (
                      <button key={status} onClick={() => setAvailability(availability === status ? '' : status)} className={`w-full p-2 text-left rounded ${availability === status ? 'bg-primary/20' : 'hover:bg-secondary'} cursor-pointer`}>
                        {
                          status === 'in-stock' ? 'In Stock' : status === 'limited' ? 'Limited Stock' : 'Out of Stock'
                        }
                      </button>
                    ))
                  }
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  Categories
                </h3>

                <div className="space-y-2">
                  <button onClick={() => setSelectedCategory('')} className={`w-full p-2 text-left rounded ${!selectedCategory ? 'bg-primary/20' : 'hover:bg-secondary'} cursor-pointer`}>
                    All Categories
                  </button>

                  {categories.map((c) => {
                    return (
                      <button 
                        key={c.id} 
                        onClick={() => setSelectedCategory(c.name)} 
                        className={`w-full p-2 text-left rounded ${selectedCategory === c.name ? 'bg-primary/20' : 'hover:bg-secondary'} cursor-pointer`}
                      >
                        {c.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search bar */}
            <div className="mb-8 flex max-[440px]:flex-col items-center gap-2 ">
              <div className="relative w-[-webkit-fill-available]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* AI Search button */}
              <button
                className="relative inline-flex items-center justify-center p-0.5 
                overflow-hidden text-sm font-medium rounded-lg group 
                bg-linear-to-br from-purple-500 to-pink-500 
                hover:from-purple-600 hover:to-pink-600 text-white 
                focus:ring-4 focus:outline-none focus:ring-purple-200 
                max-[440px]:min-w-full min-w-32 transition-all duration-200 cursor-pointer"
                onClick={() => dispatch(toggleAIModal())}
              >
                <span className="relative w-full px-3 py-3.5 bg-white text-gray-900
                rounded-md group-hover:bg-transparent group-hover:text-white
                transition-all duration-75 flex justify-center items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Search</span>
                </span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {
                  products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                  ))
                }
            </div>

            {/* Pagination */}
            {
              totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )
            }

            {/* No results */}
            {
              products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg ">
                    No products found your search
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* AI Search Modal */}
      <AISearchModal />
    </div>
  );
};

export default Products;