import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Vector.png";
import { 
  FaHome,
  FaShoppingCart,
  FaHistory,
} from "react-icons/fa";
import { MdMenu } from 'react-icons/md';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b h-16">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold text-gray-800">Kirish - Coca Coffeetalk</h1>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[#828487] hover:text-[#ff5c00] transition-colors duration-300 group"
          >
            <FaHome className="h-5 w-5 group-hover:text-[#ff5c00] transition-colors duration-300" />
            <span className="font-medium">Bosh Sahifa</span>
          </Link>
          
          <Link 
            to="/dashboard/orders" 
            className="flex items-center gap-2 text-[#828487] hover:text-[#ff5c00] transition-colors duration-300 group"
          >
            <FaShoppingCart className="h-5 w-5 group-hover:text-[#ff5c00] transition-colors duration-300" />
            <span className="font-medium">Buyurtmalar</span>
          </Link>
          
          <Link 
            to="/dashboard/history" 
            className="flex items-center gap-2 text-[#828487] hover:text-[#ff5c00] transition-colors duration-300 group"
          >
            <FaHistory className="h-5 w-5 group-hover:text-[#ff5c00] transition-colors duration-300" />
            <span className="font-medium">Tarix</span>
          </Link>
        </nav>

        {/* Mobil menyu tugmasi */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#828487] hover:text-[#ff5c00] transition-colors duration-300"
        >
          <MdMenu className='size-6'/>
        </button>
      </div>

      {/* Mobil menyu (faqat ochilganda ko'rinadi) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#828487] hover:text-[#ff5c00] py-2 px-3 rounded hover:bg-gray-50 transition-colors duration-300"
            >
              <FaHome className="h-5 w-5" />
              <span>Bosh Sahifa</span>
            </Link>
            <Link 
              to="/orders" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#828487] hover:text-[#ff5c00] py-2 px-3 rounded hover:bg-gray-50 transition-colors duration-300"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span>Buyurtmalar</span>
            </Link>
            <Link 
              to="/history" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-[#828487] hover:text-[#ff5c00] py-2 px-3 rounded hover:bg-gray-50 transition-colors duration-300"
            >
              <FaHistory className="h-5 w-5" />
              <span>Tarix</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}