import React from 'react';

export default function Footer({ currentPage, setCurrentPage, hasSession }) {
  const currentYear = new Date().getFullYear();

  const handleFAQClick = () => {
    setCurrentPage('Contact');
    // Gives the DOM a moment to mount the Contact page before scrolling to the bottom
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="bg-[#04351e] text-[#eebf1c] py-12 border-t-4 border-[#eebf1c]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        <div className="space-y-4">
          <img src="/Sticker.png" alt="Armoury Logo" className="w-20 h-20 mx-auto md:mx-0 rounded-full border-2 border-[#eebf1c] object-cover bg-white" />
          <h4 className="font-serif text-xl font-bold uppercase tracking-widest">The Gentlemen Artists Armoury</h4>
          <p className="text-sm font-sans text-gray-300 leading-relaxed">Precision laser engraving meets heirloom quality. Custom-tailored designs forged right here in East Texas.</p>
        </div>

        <div className="space-y-3 flex flex-col items-center md:items-start">
          <h4 className="font-bold uppercase tracking-widest mb-2 border-b border-[#eebf1c]/30 pb-2 w-1/2 md:w-full">Quick Links</h4>
          {['Home', 'Rifles', 'Handguns', 'Accessories', 'Gallery', 'Contact'].map(page => (
            <button 
              key={page} 
              onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="text-sm hover:text-white transition-colors cursor-pointer"
            >
              {page}
            </button>
          ))}
          {/* FAQ Auto-Scroll Link */}
          <button 
            onClick={handleFAQClick} 
            className="text-sm hover:text-white transition-colors cursor-pointer text-white font-bold"
          >
            FAQ
          </button>
        </div>

        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h4 className="font-bold uppercase tracking-widest mb-2 border-b border-[#eebf1c]/30 pb-2 w-1/2 md:w-full">Contact Details</h4>
          <p className="text-sm font-mono">903-368-2340</p>
          <a href="mailto:Thegentlemenartistsarmoury@gmail.com" className="text-sm hover:text-white hover:underline transition-all">Thegentlemenartistsarmoury@gmail.com</a>
          <div className="mt-4 pt-4 border-t border-[#eebf1c]/20 w-1/2 md:w-full">
            <p className="text-sm uppercase tracking-widest font-bold mb-1">Hours</p>
            <p className="text-sm text-gray-300">Monday - Friday</p>
            <p className="text-sm text-gray-300">9:00am - 5:00pm</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#eebf1c]/20 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-400 gap-4">
        <p>&copy; {currentYear} The Gentlemen Artists Armoury. All rights reserved.</p>
        <div className="flex gap-4 items-center">
          <p>Built by StaX Web Designs</p>
          {hasSession ? (
            <button onClick={() => { setCurrentPage('Admin'); window.scrollTo({ top: 0 }); }} className="text-[#eebf1c] hover:text-white transition-colors font-bold cursor-pointer">ADMIN PORTAL</button>
          ) : (
            <button onClick={() => { setCurrentPage('Admin'); window.scrollTo({ top: 0 }); }} className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Admin Login</button>
          )}
        </div>
      </div>
    </footer>
  );
}
