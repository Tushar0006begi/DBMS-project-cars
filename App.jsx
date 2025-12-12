<div className="p-6">
  <div className="text-4xl font-bold text-red-600">TAILWIND TEST — should be red & big</div>
</div>

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Phone, Mail, MapPin, Star, Calendar, Gauge, Cog, Shield, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';

// Sample data based on the SQL file
const carsData = [
  { id: 101, model: 'Maruti Suzuki Swift', km: 50000, transmission: 'Manual', condition: 'Good', accident: 'No', price: 550000, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500', supplierId: 1, year: 2020 },
  { id: 102, model: 'Hyundai i20', km: 70000, transmission: 'Automatic', condition: 'Excellent', accident: 'No', price: 620000, image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500', supplierId: 1, year: 2019 },
  { id: 103, model: 'Honda City', km: 30000, transmission: 'Manual', condition: 'Fair', accident: 'Yes', price: 750000, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500', supplierId: 2, year: 2021 },
  { id: 104, model: 'Tata Nexon', km: 90000, transmission: 'Automatic', condition: 'Good', accident: 'No', price: 820000, image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=500', supplierId: 2, year: 2018 },
  { id: 105, model: 'Mahindra Thar', km: 40000, transmission: 'Manual', condition: 'Excellent', accident: 'No', price: 950000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500', supplierId: 3, year: 2020 },
  { id: 106, model: 'Kia Seltos', km: 20000, transmission: 'Automatic', condition: 'Good', accident: 'No', price: 1100000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500', supplierId: 3, year: 2022 },
  { id: 107, model: 'Toyota Innova', km: 60000, transmission: 'Manual', condition: 'Fair', accident: 'Yes', price: 480000, image: 'https://images.unsplash.com/photo-1566023888770-75432e72c99f?w=500', supplierId: 4, year: 2019 },
  { id: 108, model: 'Renault Kwid', km: 35000, transmission: 'Automatic', condition: 'Excellent', accident: 'No', price: 370000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500', supplierId: 4, year: 2021 },
  { id: 109, model: 'Ford EcoSport', km: 5000, transmission: 'Manual', condition: 'New', accident: 'No', price: 890000, image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=500', supplierId: 5, year: 2023 },
  { id: 110, model: 'Volkswagen Polo', km: 15000, transmission: 'Automatic', condition: 'Good', accident: 'No', price: 650000, image: 'https://images.unsplash.com/photo-1597404294360-feeadb5d0711?w=500', supplierId: 5, year: 2022 },
  { id: 111, model: 'Maruti Suzuki Baleno', km: 75000, transmission: 'Manual', condition: 'Good', accident: 'No', price: 580000, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500', supplierId: 6, year: 2019 },
  { id: 112, model: 'Hyundai Creta', km: 45000, transmission: 'Automatic', condition: 'Excellent', accident: 'No', price: 940000, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500', supplierId: 7, year: 2020 },
];

const suppliers = [
  { id: 1, name: 'Prem Chaudari', regNo: 'MH39PC0007', city: 'Nandurbar', state: 'Maharashtra' },
  { id: 2, name: 'Tushar Nagwani', regNo: 'MP07NA1821', city: 'Gwalior', state: 'Madhya Pradesh' },
  { id: 3, name: 'Anil Kapoor', regNo: 'KA18NB8823', city: 'Bangalore', state: 'Karnataka' },
  { id: 4, name: 'Suresh Reddy', regNo: 'TS07AK9933', city: 'Hyderabad', state: 'Telangana' },
  { id: 5, name: 'Neha Gupta', regNo: 'WB18NQ8123', city: 'Kolkata', state: 'West Bengal' },
  { id: 6, name: 'Amitabh Singh', regNo: 'DL07ABD8920', city: 'New Delhi', state: 'Delhi' },
  { id: 7, name: 'Pooja Nair', regNo: 'MH01KL9992', city: 'Mumbai', state: 'Maharashtra' },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTransmission, setFilterTransmission] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1200000]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCars = carsData.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTransmission = filterTransmission === 'all' || car.transmission === filterTransmission;
    const matchesCondition = filterCondition === 'all' || car.condition === filterCondition;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    return matchesSearch && matchesTransmission && matchesCondition && matchesPrice;
  });

  const addToCart = (car) => {
    if (!cart.find(item => item.id === car.id)) {
      setCart([...cart, car]);
      alert(`${car.model} added to cart!`);
    } else {
      alert('This car is already in your cart!');
    }
  };

  const removeFromCart = (carId) => {
    setCart(cart.filter(item => item.id !== carId));
  };

  const viewCarDetails = (car) => {
    setSelectedCar(car);
    setCurrentPage('details');
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Header Component
  const Header = () => (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Phantom Cars</h1>
              <p className="text-xs text-blue-300">Pvt Ltd</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-blue-400 transition ${currentPage === 'home' ? 'text-blue-400' : ''}`}>Home</button>
            <button onClick={() => setCurrentPage('inventory')} className={`hover:text-blue-400 transition ${currentPage === 'inventory' ? 'text-blue-400' : ''}`}>Inventory</button>
            <button onClick={() => setCurrentPage('about')} className={`hover:text-blue-400 transition ${currentPage === 'about' ? 'text-blue-400' : ''}`}>About</button>
            <button onClick={() => setCurrentPage('contact')} className={`hover:text-blue-400 transition ${currentPage === 'contact' ? 'text-blue-400' : ''}`}>Contact</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('cart')} 
              className="relative hover:text-blue-400 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-400">Home</button>
            <button onClick={() => { setCurrentPage('inventory'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-400">Inventory</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-400">About</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-400">Contact</button>
          </nav>
        )}
      </div>
    </header>
  );

  // Home Page
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-4">Find Your Perfect Pre-Owned Car</h2>
            <p className="text-xl mb-8 text-blue-200">Quality certified vehicles with transparent pricing and complete service history</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentPage('inventory')}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition"
              >
                Browse Inventory
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">150+</h3>
              <p className="text-gray-600">Cars Sold</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">500+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">10+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">100%</h3>
              <p className="text-gray-600">Verified Cars</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsData.slice(0, 6).map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage('inventory')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              View All Cars
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Phantom Cars?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Every vehicle undergoes rigorous inspection and comes with a detailed service history</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges. What you see is what you pay with complete documentation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Verified Suppliers</h3>
              <p className="text-gray-600">All our suppliers are registered and verified with complete legal compliance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Car Card Component
  const CarCard = ({ car }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48 overflow-hidden">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {car.condition}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{car.model}</h3>
        <p className="text-2xl font-bold text-blue-500 mb-3">{formatPrice(car.price)}</p>
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Gauge className="w-4 h-4 mr-1" />
            {car.km.toLocaleString()} km
          </div>
          <div className="flex items-center">
            <Cog className="w-4 h-4 mr-1" />
            {car.transmission}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {car.year}
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-1" />
            {car.accident === 'No' ? 'No Accidents' : 'Accident'}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => viewCarDetails(car)}
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg transition"
          >
            View Details
          </button>
          <button 
            onClick={() => addToCart(car)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Inventory Page
  const InventoryPage = () => (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Our Inventory</h2>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Transmission</label>
              <select
                value={filterTransmission}
                onChange={(e) => setFilterTransmission(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Condition</label>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="New">New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <div className="text-sm text-gray-600 mb-1">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </div>
              <input
                type="range"
                min="0"
                max="1200000"
                step="50000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-gray-600">
          Showing {filteredCars.length} of {carsData.length} cars
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cars found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );

  // Car Details Page
  const CarDetailsPage = () => {
    if (!selectedCar) return null;
    const supplier = suppliers.find(s => s.id === selectedCar.supplierId);

    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => setCurrentPage('inventory')}
            className="mb-6 text-blue-500 hover:text-blue-600 flex items-center"
          >
            ← Back to Inventory
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6">
                <img src={selectedCar.image} alt={selectedCar.model} className="w-full h-96 object-cover rounded-lg" />
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{selectedCar.model}</h1>
                <p className="text-3xl font-bold text-blue-500 mb-6">{formatPrice(selectedCar.price)}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600 flex items-center">
                      <Gauge className="w-5 h-5 mr-2" /> Kilometers Driven
                    </span>
                    <span className="font-semibold">{selectedCar.km.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600 flex items-center">
                      <Cog className="w-5 h-5 mr-2" /> Transmission
                    </span>
                    <span className="font-semibold">{selectedCar.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" /> Year
                    </span>
                    <span className="font-semibold">{selectedCar.year}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600 flex items-center">
                      <Shield className="w-5 h-5 mr-2" /> Condition
                    </span>
                    <span className="font-semibold">{selectedCar.condition}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" /> Accident Record
                    </span>
                    <span className={`font-semibold ${selectedCar.accident === 'No' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCar.accident === 'No' ? 'No Accidents' : 'Has Accident History'}
                    </span>
                  </div>
                </div>

                {supplier && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold mb-2">Supplier Information</h3>
                    <p className="text-sm text-gray-600">Name: {supplier.name}</p>
                    <p className="text-sm text-gray-600">Registration: {supplier.regNo}</p>
                    <p className="text-sm text-gray-600">Location: {supplier.city}, {supplier.state}</p>
                  </div>
                )}

                <button 
                  onClick={() => addToCart(selectedCar)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Page
  const CartPage = () => {
    const total = cart.reduce((sum, car) => sum + car.price, 0);

    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
              <button 
                onClick={() => setCurrentPage('inventory')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
              >
                Browse Cars
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {cart.map(car => (
                  <div key={car.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <img src={car.image} alt={car.model} className="w-32 h-24 object-cover rounded-lg" />
                    <div className="flex-1 ml-4">
                      <h3 className="font-bold text-lg">{car.model}</h3>
                      <p className="text-gray-600 text-sm">{car.km.toLocaleString()} km | {car.transmission}</p>
                      <p className="text-xl font-bold text-blue-500 mt-2">{formatPrice(car.price)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(car.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items ({cart.length})</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold">{formatPrice(total * 0.18)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-blue-500">{formatPrice(total * 1.18)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition mb-2">
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={() => setCurrentPage('inventory')}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Phantom Cars Pvt Ltd</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Phantom Cars Pvt Ltd has been a trusted name in the pre-owned car market for over a decade. 
              We started with a simple mission: to make buying used cars transparent, reliable, and hassle-free.
            </p>
            <p className="text-gray-700 mb-4">
              Today, we've helped thousands of customers find their perfect vehicle, backed by our commitment 
              to quality, transparency, and customer satisfaction.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Quality Assurance</h4>
                  <p className="text-gray-700">Every vehicle undergoes comprehensive inspection by certified mechanics</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Transparency</h4>
                  <p className="text-gray-700">Complete disclosure of vehicle history, maintenance records, and pricing</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Customer First</h4>
                  <p className="text-gray-700">Dedicated support team to guide you through every step of your purchase</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-4">Our Network</h3>
            <p className="text-gray-700 mb-4">
              We work with verified suppliers across India, ensuring a diverse inventory of quality vehicles. 
              All our suppliers are registered and comply with legal requirements.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{suppliers.length}+</p>
                <p className="text-gray-600">Verified Suppliers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{carsData.length}+</p>
                <p className="text-gray-600">Cars Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">8+</p>
                <p className="text-gray-600">States Covered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">100%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">+91 98765 43211</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@phantomcars.com</p>
                      <p className="text-gray-600">sales@phantomcars.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Head Office</p>
                      <p className="text-gray-600">123 Business Park,</p>
                      <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Phantom Cars</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner in finding quality pre-owned vehicles across India.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setCurrentPage('inventory')} className="hover:text-white">Inventory</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Buy Pre-Owned Cars</li>
              <li>Car Inspection</li>
              <li>Vehicle History Report</li>
              <li>Financing Options</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +91 98765 43210
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@phantomcars.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Mumbai, Maharashtra
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 Phantom Cars Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'inventory' && <InventoryPage />}
        {currentPage === 'details' && <CarDetailsPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
