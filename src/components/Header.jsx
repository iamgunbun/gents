import React, { useState, useEffect, useRef } from 'react';

export default function Header({ currentPage, setCurrentPage, inventory = [], cartCount = 0, onSelectProduct }) {
  const navItems = ['Home', 'Rifles', 'Handguns', 'Accessories', 'Gallery', 'Contact'];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open, blank string prevents double scrollbar
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; 
    }
  }, [isMobileMenuOpen]);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : inventory.filter(item => 
        item.category !== 'Gallery' && (
          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
          (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 6);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-[#f9f7f2]">
        <img src="/Header for web.jpg" alt="The Gentlemen Artists Armoury Banner" className="w-full h-auto block object-contain animate-fade-up" style={{ animationDelay: '0ms' }} />
      </header>

      <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
        <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between h-14 md:h-16 relative">
          
          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 text-[#04351e] hover:text-[#eebf1c] transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex justify-center gap-10">
            {navItems.map((page, index) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  aria-label={`Maps to ${page}`}
                  onClick={() => setCurrentPage(page)}
                  className={`relative font-sans text-[14px] tracking-wide transition-all duration-300 h-16 flex items-center shrink-0 cursor-pointer animate-slide-in-left hover:-translate-y-0.5 hover:text-[#eebf1c] ${
                    isActive 
                      ? 'text-black font-bold border-b-[3px] border-[#eebf1c]' 
                      : 'text-gray-500 font-medium border-b-[3px] border-transparent'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE ICONS (Search, Cart & Instagram) */}
          <div className="flex items-center gap-2 md:gap-4 animate-slide-in-left" style={{ animationDelay: '500ms' }}>
            
            <div className="relative flex items-center" ref={searchRef}>
              <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${isSearchOpen ? 'w-40 md:w-56 opacity-100 pr-2' : 'w-0 opacity-0'}`}>
                 <input 
                   type="text" 
                   aria-label="Search Armoury"
                   placeholder="Search armoury..." 
                   className="w-full bg-gray-50 border border-gray-300 rounded-full py-1.5 px-4 text-[11px] md:text-xs font-mono text-[#04351e] focus:outline-none focus:border-[#eebf1c] focus:bg-white shadow-inner"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>

              <button 
                aria-label="Toggle Search Bar"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery(''); 
                }}
                className="relative p-2 md:p-3 text-[#04351e] hover:text-[#eebf1c] hover:-translate-y-1 transition-all flex items-center group cursor-pointer shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-5 md:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute top-[120%] right-0 w-[80vw] max-w-xs md:w-80 bg-white border border-[#eebf1c]/30 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden flex flex-col z-[100] animate-fade-up">
                  {searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <div 
                        key={res.id} 
                        className={`p-3 hover:bg-[#eebf1c]/10 cursor-pointer flex items-center gap-3 transition-colors ${i !== searchResults.length - 1 ? 'border-b border-gray-100' : ''}`}
                        onClick={() => {
                          onSelectProduct(res);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {res.image_url ? (
                          <img src={res.image_url} alt="" className="w-12 h-12 object-cover rounded border border-gray-200 bg-white" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[9px] text-gray-400 font-mono">N/A</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#04351e] truncate">{res.title}</p>
                          <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">{res.category} {res.price ? `• $${res.price}` : ''}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                     <div className="p-6 text-center text-xs text-gray-500 font-mono">No matching records found.</div>
                  )}
                </div>
              )}
            </div>

            <button 
              aria-label="View Shopping Cart"
              onClick={() => setCurrentPage('Cart')}
              className="relative p-2 md:p-3 text-[#04351e] hover:text-[#eebf1c] hover:-translate-y-1 transition-all flex items-center group cursor-pointer shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 md:top-1.5 md:right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#eebf1c] text-[9px] font-bold text-[#04351e] shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* INSTAGRAM ICON HEADER */}
            <a 
              href="https://www.instagram.com/thegentlemenartistsarmoury?igsh=MXI1eG94Y2ozbm9vaQ==" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram"
              className="relative p-2 md:p-3 text-[#04351e] hover:text-[#eebf1c] hover:-translate-y-1 transition-all flex items-center group cursor-pointer shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-5 md:h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

          </div>
        </nav>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER MENU */}
      <div 
         className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
         onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
           className={`absolute top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
           onClick={(e) => e.stopPropagation()}
        >
           <div className="p-6 bg-[#04351e] border-b-4 border-[#eebf1c] flex justify-between items-center">
             <img src="/Sticker.png" alt="Logo" className="w-12 h-12 rounded-full border border-[#eebf1c]" />
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-black p-2">&times;</button>
           </div>
           
           <nav className="flex flex-col p-6 space-y-6 overflow-y-auto">
             {navItems.map((page) => {
               const isActive = currentPage === page;
               return (
                 <button
                   key={page}
                   onClick={() => handleNavClick(page)}
                   className={`text-left text-xl font-serif uppercase tracking-widest border-b pb-4 transition-colors ${
                     isActive ? 'text-[#eebf1c] font-black border-[#eebf1c]' : 'text-[#04351e] font-bold border-gray-100 hover:text-[#eebf1c]'
                   }`}
                 >
                   {page}
                 </button>
               );
             })}
           </nav>
        </div>
      </div>
    </>
  );
}
