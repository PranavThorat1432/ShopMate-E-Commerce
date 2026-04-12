import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle, ArrowLeft, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { placeOrder } from "../Redux/orderSlice";
import PaymentForm from "../Components/PaymentForm";

const Orders = () => {

  const {authUser} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if(!authUser) {
    return (
      navigate('/products')
    )
  }

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    loadStripe(
      'pk_test_51RuV0PLZh2ftOIm7Op5cwu0AouyVoGQ6UX63vFhIQAN5qjxu1flcFTE7zF5yu3QU3ETlzC6mOvaPzjPyvpV2Laje00e036W6U6'
    ).then((stripe) => {
      setStripePromise(stripe);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const {orderStep} = useSelector((state) => state.order);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    state: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    country: 'India'
  });


  const total = cart.reduce((sum, item) => sum + item.product?.price * item.quantity, 0);

  let totalWithTax = total + total * 0.18;
  if(total > 50) {
    totalWithTax += 2;
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setShippingDetails({...shippingDetails, phone: value});
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setShippingDetails({...shippingDetails, pincode: value});
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('full_name', shippingDetails.fullName);
    formData.append('state', shippingDetails.state);
    formData.append('phone', shippingDetails.phone);
    formData.append('address', shippingDetails.address);
    formData.append('city', shippingDetails.city);
    formData.append('pincode', shippingDetails.pincode);
    formData.append('country', shippingDetails.country);
    formData.append('orderedItems', JSON.stringify(cart));

    dispatch(placeOrder(formData));
  };

  
  if(cart.length === 0) {
    return (
      <div className='min-h-screen pt-20 flex items-center justify-center'>
        <div className='text-center glass-panel max-w-md'>
          <h1 className='text-3xl font-bold text-foreground mb-4'>No items in cart</h1>
          <p className='text-muted-foreground mb-8'>Add some items to your cart before processing to checkout.</p>
          <Link to={'/products'} className='inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-primary-foreground gradient-primary hover:glow-on-hover animate-smooth font-semibold'>
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const indianStates = [
    "Andhra Pradesh", 
    "Arunachal Pradesh", 
    "Assam", 
    "Bihar", 
    "Chhattisgarh", 
    "Goa", 
    "Gujarat", 
    "Haryana", 
    "Himachal Pradesh", 
    "Jharkhand", 
    "Karnataka", 
    "Kerala", 
    "Madhya Pradesh", 
    "Maharashtra", 
    "Manipur", 
    "Meghalaya", 
    "Mizoram", 
    "Nagaland", 
    "Odisha", 
    "Punjab", 
    "Rajasthan", 
    "Sikkim", 
    "Tamil Nadu", 
    "Telangana", 
    "Tripura", 
    "Uttar Pradesh", 
    "Uttarakhand", 
    "West Bengal", 
    "Andaman and Nicobar Islands", 
    "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", 
    "Jammu and Kashmir", 
    "Ladakh", 
    "Lakshadweep", 
    "Puducherry"
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", 
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", 
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", 
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
    "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", 
    "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", 
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
    "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", 
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", 
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", 
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
    "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", 
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", 
    "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", 
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", 
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link to={'/cart'} className='p-2 glass-card hover:glow-on-hover animate-smooth'>
              <ArrowLeft className="w-5 h-5 text-primary"/>
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {/* Step - 1 */}
              <div className={`flex items-center space-x-2 ${orderStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 1 ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {orderStep > 1 ? <Check className='w-5 h-5'/> : '1'}
                </div> 
                <span className="font-medium">Details</span>
              </div>

              <div className={`w-12 h-0 ${orderStep >= 2 ? 'bg-primary' : 'bg-border'}`}/>

              
              {/* Step - 2 */}
              <div className={`flex items-center space-x-2 ${orderStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 2 ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}`}>
                  2                </div> 
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {
                orderStep === 1 ? (
                  // STEP - 1: User Details
                  <form onSubmit={handlePlaceOrder} className="glass-panel">
                    <h2 className="text-xl font-semibold mb-6 ">Shipping Information</h2>
                    <div className="mb-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required 
                          value={shippingDetails.fullName} 
                          onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"
                          placeholder="Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label 
                          className="block text-sm font-medium text-foreground mb-2">
                            State<span className="text-red-500">*</span>
                        </label>

                        <select 
                          value={shippingDetails.state} 
                          onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"

                        >
                          <option value="">Select State</option>
                            {indianStates.sort().map((state) => (
                              <option 
                                key={state} 
                                value={state}
                              >
                                {state}
                              </option>
                            ))}
                        </select>

                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          required 
                          value={shippingDetails.phone} 
                          onChange={handlePhoneChange}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"
                          placeholder="Mob. No."
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Address <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required 
                          value={shippingDetails.address} 
                          onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"
                          placeholder="Address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label 
                          className="block text-sm font-medium text-foreground mb-2">
                            City<span className="text-red-500">*</span>
                        </label>

                        <input 
                          type="text" 
                          required 
                          value={shippingDetails.city} 
                          onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"
                          placeholder="City"
                        />

                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Pin Code <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required 
                          value={shippingDetails.pincode} 
                          onChange={handlePincodeChange}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"
                          placeholder="Pin Code"
                          maxLength={6}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Country <span className="text-red-500">*</span></label>
                        
                        <select 
                          value={shippingDetails.country} 
                          onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                          className="w-full py-3 px-4 bg-secondary border border-border rounded-lg text-foreground border-none outline-none"

                        >
                          <option value="">Select Country</option>
                            {countries.sort().map((country) => (
                              <option 
                                key={country} 
                                value={country}
                              >
                                {country}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover cursor-pointer animate-smooth font-bold">
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <>
                    {/* STEP - 2: Payment */}
                    <Elements stripe={stripePromise}>
                      <PaymentForm/>
                    </Elements>
                  </>
                )
              }
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-panel sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-2">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-3"
                      >
                        <img 
                          src={item.product.images[0].url} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-cover  rounded"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>

                        <p className="text-xm font-semibold">${Number(item.product.price) * item.quantity}</p>
                      </div>
                    ))
                  }
                </div>

                <div className="space-y-2 border-t border-[hsla(var(--glass-border))] pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground ">Subtotal:</span>
                    <span >${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground ">Shipping:</span>
                    <span className=' text-green-500'>
                      {totalWithTax >= 50 ? 'Free' : '$2'}
                    </span>                  
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground ">Tax:</span>
                    <span >
                      ${(total * 0.18).toFixed(2)}
                    </span>                  
                  </div>

                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[hsla(var(--glass-border))]">
                    <span >Total:</span>
                    <span className="text-primary">
                      ${totalWithTax.toFixed(2)}
                    </span>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;