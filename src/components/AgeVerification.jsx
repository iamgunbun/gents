import React, { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already verified their age during this browser session
    const isVerified = sessionStorage.getItem('ageVerified');
    if (!isVerified) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    // Save verification to session storage so it doesn't pop up on every page load
    sessionStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
  };

  const handleDeny = () => {
    // Redirects underage users away from the site
    window.location.href = 'https://www.google.com'; 
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center border-t-4 border-[#eebf1c]">
        
        <img 
          src="/Sticker.png" 
          alt="Armoury Logo" 
          className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#eebf1c] shadow-md object-cover" 
        />
        
        <h2 className="text-3xl font-serif font-bold text-[#04351e] mb-4 uppercase tracking-widest">
          Age Verification
        </h2>
        
        <p className="text-gray-600 mb-8 font-sans leading-relaxed">
          The Gentlemen Artists Armoury features content and products related to firearms. You must be 21 years of age or older to enter this site.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleConfirm}
            className="bg-[#04351e] text-[#eebf1c] px-8 py-3 rounded uppercase font-bold tracking-widest hover:bg-[#0a4a2c] transition-colors border border-[#04351e] w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            I am 21 or older
          </button>
          
          <button 
            onClick={handleDeny}
            className="bg-transparent text-gray-500 border border-gray-300 px-8 py-3 rounded uppercase font-bold tracking-widest hover:bg-gray-100 hover:text-black transition-colors w-full sm:w-auto"
          >
            I am under 21
          </button>
        </div>
        
      </div>
    </div>
  );
}