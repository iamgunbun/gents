import React, { useRef, useState } from 'react';

export default function ContactView({ globalBtnClass }) {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);
      
      await fetch('https://formsubmit.co/ajax/ammonsgunner@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      setShowSuccessModal(true);
      formRef.current.reset();

    } catch (err) {
      console.error("Form Error:", err);
      alert("There was an issue connecting to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-12 space-y-12 bg-white animate-fade-up min-h-screen relative">
      
      {showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#04351e] mb-4">Message Sent!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Thank you for reaching out to The Gentlemen Artists Armoury. A member of our team will review your inquiry and get back to you shortly.</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className={`${globalBtnClass} w-full`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="text-center space-y-6">
        {/* Added Sticker Here */}
        <div className="flex justify-center mb-6">
          <img src="/Sticker.png" alt="Company Sticker" className="w-28 h-28 object-cover rounded-full shadow-[0_0_15px_rgba(238,191,28,0.3)] border-2 border-[#eebf1c] hover:rotate-6 transition-transform duration-500" />
        </div>
        
        <h2 className="text-5xl font-serif font-bold text-[#04351e] uppercase tracking-wide">Contact Us</h2>
        <div className="space-y-2 text-[#04351e]">
          <p className="text-2xl font-semibold">903-368-2340</p>
          <p className="text-xl">Thegentlemenartistsarmoury@gmail.com</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl border border-[#eebf1c]/30 shadow-lg space-y-6 relative z-10">
                 
        <input type="hidden" name="_subject" value="New Contact Form Request from Website!" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <h3 className="font-serif text-2xl text-[#04351e] mb-4 border-b border-gray-200 pb-2">Send an Order Request</h3>
                 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-bold text-[#04351e] uppercase mb-2">Full Name</label>
             <input type="text" name="Name" required className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#eebf1c] bg-white" placeholder="John Doe" />
           </div>
           <div>
             <label className="block text-sm font-bold text-[#04351e] uppercase mb-2">Phone Number</label>
             <input type="tel" name="Phone" required className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#eebf1c] bg-white" placeholder="(555) 555-5555" />
           </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#04351e] uppercase mb-2">Project Details / Message</label>
          <textarea name="Message" required rows="5" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#eebf1c] bg-white" placeholder="Please describe the firearm and the type of engraving you are looking for..."></textarea>
        </div>
        
        <button 
           type="submit" 
           disabled={isSubmitting}
           className={`${globalBtnClass} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </form>

      {/* Added QR Code Here */}
      <div className="flex justify-center mt-12 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
         <img src="/thegentlemenartistsarmoury_qr.png" alt="Scan to Connect" className="w-40 h-40 md:w-48 md:h-48 object-contain bg-white p-2 rounded-xl border border-gray-200 shadow-md hover:scale-105 transition-transform" />
      </div>
      
      <div className="py-8 border-t border-[#eebf1c]/30 text-center">
        <h3 className="font-bold uppercase text-[#04351e] mb-2 tracking-widest">Hours of Operation</h3>
        <p className="text-[#04351e]">Monday - Friday: 9:00am - 5:00pm</p>
      </div>
    </div>
  );
}