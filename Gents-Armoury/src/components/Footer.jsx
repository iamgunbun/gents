import React from 'react';

export default function Footer({ currentPage, setCurrentPage, hasSession }) {
  const navItems = ['Home', 'Rifles', 'Handguns', 'Accessories', 'Gallery', 'Contact'];

  return (
    <footer className="bg-[#04351e] border-t-4 border-[#eebf1c] py-12 px-6 text-center text-[#eebf1c]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Contact Info & QR Code */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-left">
          <h4 className="font-serif font-bold text-xl md:text-2xl uppercase tracking-widest text-white mb-2">The Gentlemen Artists Armoury</h4>
          <p className="font-sans text-sm md:text-base font-medium">903-368-2340</p>
          <p className="font-sans text-sm md:text-base font-medium">Thegentlemenartistsarmoury@gmail.com</p>
          
          {/* QR Code Container */}
          <div className="pt-4 animate-fade-in">
             <img 
               src="/thegentlemenartistsarmoury_qr.png" 
               alt="Scan to Contact" 
               className="w-24 h-24 md:w-28 md:h-28 bg-white p-1.5 rounded-xl border-2 border-[#eebf1c]/50 shadow-lg object-contain hover:scale-105 transition-transform duration-300"
             />
          </div>
        </div>

        {/* Center Sticker & New Navigation */}
        <div className="flex flex-col items-center justify-center">
          <img 
             src="/Sticker.png" 
             alt="Armoury Sticker" 
             className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-[#eebf1c] shadow-[0_0_20px_rgba(238,191,28,0.3)] object-cover mb-6 hover:rotate-6 transition-transform duration-500" 
           />
           {/* Footer Navigation */}
           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {navItems.map(page => (
                <button 
                  key={page} 
                  onClick={() => setCurrentPage(page)} 
                  className="text-xs uppercase tracking-widest font-sans font-bold hover:text-white transition-colors"
                >
                  {page}
                </button>
              ))}
           </div>
        </div>

        {/* Hours of Operation */}
        <div className="flex flex-col items-center md:items-end space-y-2 text-right">
          <h4 className="font-sans font-bold uppercase tracking-widest text-white mb-2">Hours of Operation</h4>
          <p className="font-sans text-sm md:text-base font-medium">Monday - Friday</p>
          <p className="font-sans text-sm md:text-base font-medium">9:00am - 5:00pm</p>
        </div>
      </div>

      {/* Copyright & Admin Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#eebf1c]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-wider opacity-80">
        <p>&copy; {new Date().getFullYear()} The Gentlemen Artists Armoury. Made by StaX Web Designs</p>
        <button 
           onClick={() => setCurrentPage('Admin')}
          className={`uppercase font-bold tracking-widest hover:text-white transition-colors ${hasSession ? 'text-[#eebf1c]' : 'text-gray-400'}`}
        >
          {hasSession ? 'Admin Dashboard Active' : 'Admin Login'}
        </button>
      </div>
    </footer>
  );
}