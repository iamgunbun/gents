import React, { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already verified their age during a previous visit
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      setIsOpen(true);
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsOpen(false);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  const handleDeny = () => {
    // Redirects underage users away from the site
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#04351e] border-2 border-[#eebf1c] rounded-lg p-8 max-w-md w-full text-center shadow-2xl animate-fade-up">
        
        <img src="/Sticker.png" alt="Armoury Logo" className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#eebf1c] bg-white object-cover" />
        
        <h2 className="text-2xl font-serif font-bold text-[#eebf1c] mb-4 uppercase tracking-widest">
          Age Verification
        </h2>
        
        <p className="text-white mb-8 font-sans leading-relaxed">
          You must be at least 18 years old to enter this site. Please verify your age to continue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleConfirm} 
            className="bg-[#eebf1c] text-[#04351e] px-6 py-3 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors w-full sm:w-auto"
          >
            I am 18 or older
          </button>
          
          <button 
            onClick={handleDeny} 
            className="bg-transparent border border-gray-400 text-gray-300 px-6 py-3 rounded font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
          >
            I am under 18
          </button>
        </div>
        
      </div>
    </div>
  );
}
