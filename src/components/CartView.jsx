import React, { useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CartView({ cart, setCart, globalBtnClass, continueShopping, refreshInventory }) {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.cart_price || 0), 0);
  };

  const estimatedTotal = calculateTotal();

  const generateCartSummaryForEmail = () => {
    if (cart.length === 0) return 'Cart is empty.';
    
    return cart.map((item, index) => {
      let text = `ITEM #${index + 1}: ${item.title}\n`;
      text += `SKU: ${item.sku || 'N/A'}\n`;
      text += `Quantity: ${item.cart_quantity}\n`;
      text += `Selected Option: ${item.cart_selected_option}\n`;
      if (item.cart_special_instructions) text += `Special Instructions: ${item.cart_special_instructions}\n`;
      text += `Est. Item Total: $${item.cart_price.toFixed(2)}\n`;
      text += `Requires FFL: ${item.requires_ffl ? 'YES' : 'NO'}\n`;
      return text;
    }).join('\n-----------------------------------\n\n');
  };

  const removeFromCart = (indexToRemove) => {
    setCart(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);

      // 1. Deduct Stock from Supabase Inventory Database
      for (const item of cart) {
         const { data: currentItem } = await supabase.from('inventory').select('quantity').eq('id', item.id).single();
         if (currentItem) {
            const newQuantity = Math.max(0, currentItem.quantity - item.cart_quantity);
            await supabase.from('inventory').update({ quantity: newQuantity }).eq('id', item.id);
         }
      }

      // 2. Log Order into Admin Dashboard Database
      await supabase.from('orders').insert([{
         customer_name: formData.get('Name'),
         customer_phone: formData.get('Phone'),
         customer_email: formData.get('Email'),
         items: cart,
         total_estimated: estimatedTotal,
         status: 'Pending'
      }]);

      // 3. Secretly Post to FormSubmit via AJAX (Prevents opening a new tab)
      await fetch('https://formsubmit.co/ajax/thegentlemenartistsarmoury@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      // 4. Clear cart, trigger a live site-wide inventory refresh, and show Success popup
      setCart([]);
      if (refreshInventory) refreshInventory(); 
      setShowSuccessModal(true);

    } catch (err) {
      console.error("Checkout Error:", err);
      alert("There was an issue connecting to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 animate-fade-in relative">
      
      {showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#04351e] mb-4">Quote Received!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Your order request has been securely transmitted. A member of our artisan team will review your specs and contact you shortly to finalize your quote.</p>
            <button 
              onClick={() => { setShowSuccessModal(false); continueShopping(); }}
              className={`${globalBtnClass} w-full`}
            >
              Return to Armoury
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#04351e] uppercase tracking-wide mb-10 text-center">
          Quote Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-gray-300 mx-auto mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h2 className="text-xl font-bold text-[#04351e] mb-4">Your cart is currently empty.</h2>
            <p className="text-gray-500 mb-8">Browse the armoury and add items to your cart to request a custom quote.</p>
            <button onClick={continueShopping} className={`${globalBtnClass} max-w-xs mx-auto`}>Return to Store</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-6 items-start">
                  
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0 p-2">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[10px] font-mono text-gray-400">No Image</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-bold text-lg text-[#04351e] leading-snug">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(idx)}
                          className="text-red-400 hover:text-red-600 p-1 flex-shrink-0 transition-colors"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      
                      <div className="text-xs font-mono text-gray-500 space-y-1 mb-4">
                        <p>Quantity: <strong className="text-black">{item.cart_quantity}</strong></p>
                        {item.cart_selected_option !== 'Default' && <p>Option: <strong className="text-[#eebf1c]">{item.cart_selected_option}</strong></p>}
                        {item.cart_special_instructions && <p className="truncate">Notes: <strong className="text-black italic">{item.cart_special_instructions}</strong></p>}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                      {item.requires_ffl ? (
                         <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">FFL Required</span>
                      ) : <span></span>}
                      
                      <span className="font-bold text-xl text-[#eebf1c]">${item.cart_price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right">
                <button onClick={continueShopping} className="text-[#eebf1c] text-xs font-bold uppercase tracking-widest hover:underline">&larr; Continue Shopping</button>
              </div>
            </div>

            <div className="bg-[#04351e] text-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h3 className="font-serif text-2xl font-bold text-[#eebf1c] border-b border-[#eebf1c]/30 pb-4 mb-6">Quote Summary</h3>
              
              <div className="flex justify-between items-center mb-2 text-sm font-mono">
                <span className="text-gray-300">Subtotal ({cart.length} items)</span>
                <span>${estimatedTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-sm font-mono border-b border-gray-600 pb-6">
                <span className="text-gray-300">Shipping & Custom Fees</span>
                <span className="italic text-[#eebf1c]">Calculated Post-Quote</span>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-sm uppercase tracking-wider text-[#eebf1c]">Estimated Total</span>
                <span className="font-black text-3xl text-white">${estimatedTotal.toFixed(2)}</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmitOrder} className="space-y-4">
                
                <input type="hidden" name="_subject" value="New Multi-Item Custom Quote Request!" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <textarea name="Cart_Order_Details" className="hidden" readOnly value={generateCartSummaryForEmail()} />
                <input type="hidden" name="Estimated_Total_Cost" value={`$${estimatedTotal.toFixed(2)}`} />

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#eebf1c] mb-1">Full Name</label>
                  <input type="text" name="Name" required className="w-full bg-white/10 border border-gray-600 p-3 rounded text-white text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#eebf1c] mb-1">Phone Number</label>
                  <input type="tel" name="Phone" required className="w-full bg-white/10 border border-gray-600 p-3 rounded text-white text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="(555) 555-5555" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#eebf1c] mb-1">Email Address</label>
                  <input type="email" name="Email" required className="w-full bg-white/10 border border-gray-600 p-3 rounded text-white text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="johndoe@email.com" />
                </div>

                {cart.some(item => item.requires_ffl) && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">FFL Dealer Information (Required)</label>
                    <textarea name="FFL_Dealer_Info" required rows="2" className="w-full bg-red-900/20 border border-red-500/50 p-3 rounded text-white text-sm focus:outline-none focus:border-red-400 placeholder-red-300/50" placeholder="Name and zip code of your receiving FFL dealer..."></textarea>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full mt-4 text-[#04351e] font-black uppercase tracking-widest py-4 rounded-lg transition-colors shadow-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#eebf1c] hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-1'}`}
                >
                  {isSubmitting ? 'Processing Order...' : 'Submit Order Request'}
                </button>
                <p className="text-[9px] font-mono text-center text-gray-400 mt-2">No payment is collected today. We will contact you to finalize the quote.</p>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
