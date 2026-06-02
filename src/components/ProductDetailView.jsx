import React, { useState, useEffect } from 'react';

// Lightweight Thumbnail Card specifically for the Related Products section
function RelatedThumbnailCard({ item, onSelect, globalBtnClass }) {
  const hasOptions = item.dropdown_label || item.price_max;

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group animate-fade-in"
    >
      <div className="bg-white h-48 md:h-56 p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-gray-300 font-mono text-xs">No Image</div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-[#04351e] mb-3 leading-snug line-clamp-2">{item.title}</h3>
        <div className="mt-auto space-y-1">
          {hasOptions && <span className="text-[10px] text-gray-500 italic block">Starting at</span>}
          <span className="text-[#eebf1c] font-bold text-lg block mb-2">
            ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
          </span>
          <button 
            className={`${globalBtnClass} !py-2 !text-[9px] w-full mt-auto`}
            onClick={(e) => { e.stopPropagation(); onSelect(item); }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailView({ product, inventory, onSelectProduct, globalBtnClass, onAddToCart, goBack }) {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Image Carousel Logic
  const images = [product.image_url, ...(product.alt_images || [])].filter(url => url && url.trim() !== '');
  const [imgIndex, setImgIndex] = useState(0);

  // Live Inventory Status Logic
  const getStatusDisplay = () => {
    if (product.quantity <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    if (product.quantity > 0 && product.quantity < 3) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  };
  const statusObj = getStatusDisplay();

  // Reset states when the product changes
  useEffect(() => {
    setImgIndex(0);
    setQuantity(1);
    setSelectedOption('');
    setSpecialInstructions('');
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const nextImg = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  const dropdownOptionsArray = product.dropdown_options 
    ? product.dropdown_options.split(',').map(o => o.trim()) 
    : [];

  const handleAddToCart = () => {
    const configuredItem = {
      ...product,
      cart_quantity: quantity,
      cart_selected_option: selectedOption || 'Default',
      cart_special_instructions: specialInstructions,
      cart_price: product.price ? parseFloat(product.price) * quantity : 0
    };
    onAddToCart(configuredItem);
  };

  const getRelatedProducts = () => {
    if (!inventory) return [];
    
    const stopWords = ['custom', 'engraved', 'engraving', 'with', 'and', 'the', 'for', 'of', 'in', 'on'];
    const getWords = (str) => str.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !stopWords.includes(w));
    
    const targetWords = getWords(product.title);

    let related = inventory
      .filter(item => item.id !== product.id && item.category === product.category)
      .map(item => {
        const itemWords = getWords(item.title);
        const overlap = itemWords.filter(w => targetWords.includes(w)).length;
        return { ...item, similarity: overlap };
      })
      .sort((a, b) => b.similarity - a.similarity);

    return related.slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        <button 
          onClick={goBack}
          className="text-gray-500 hover:text-[#eebf1c] font-mono text-xs uppercase tracking-widest flex items-center gap-2 mb-8 transition-colors"
        >
          <span>&larr;</span> Back to {product.category || 'Store'}
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col lg:flex-row mb-16">
          
          <div className="lg:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-4 group flex items-center justify-center">
              {images.length > 0 ? (
                <div 
                  className="flex h-full w-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${imgIndex * 100}%)` }}
                >
                  {images.map((img, i) => (
                    <div key={i} className="min-w-full h-full flex-shrink-0 flex items-center justify-center p-2 relative bg-white">
                      <img src={img} alt={product.title} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 font-mono text-sm">No Image Available</div>
              )}
              
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#eebf1c] text-white hover:text-[#04351e] rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow">
                    &#10094;
                  </button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#eebf1c] text-white hover:text-[#04351e] rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow">
                    &#10095;
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setImgIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${imgIndex === i ? 'border-[#eebf1c] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover bg-white" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2 p-6 md:p-12 flex flex-col">
            <h1 className="text-3xl md:text-5xl font-bold text-[#04351e] font-serif mb-2 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-6">
              <span>{product.category}</span>
              {product.sku && <span>• SKU: {product.sku}</span>}
              <span className={`px-2 py-0.5 rounded font-bold ${statusObj.color}`}>
                {statusObj.label}
              </span>
            </div>

            {product.is_limited_edition && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
                <h4 className="text-red-800 font-bold uppercase tracking-widest text-xs mb-1.5 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                  Limited Edition Vault Run
                </h4>
                <p className="text-[11px] text-red-700 font-medium pl-6 leading-relaxed">
                  This is a temporary collection item. {product.limited_time_end && (
                    <span>Available only until <b>{new Date(product.limited_time_end).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b>.</span>
                  )}
                </p>
              </div>
            )}

            <div className="mb-8">
               <span className="text-[#eebf1c] font-black text-4xl block">
                 ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'} 
                 {product.price_max ? <span className="text-xl text-gray-400 font-normal"> - ${parseFloat(product.price_max).toFixed(2)}</span> : ''}
               </span>
               <p className="text-[10px] text-gray-400 font-mono uppercase mt-1">* Final exact pricing determined upon custom quote review.</p>
            </div>

            <div className="space-y-6 mb-8 flex-grow">
              
              {dropdownOptionsArray.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">
                    {product.dropdown_label || 'Select Option'}
                  </label>
                  <select 
                    className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:border-[#eebf1c] focus:ring-1 focus:ring-[#eebf1c] transition-shadow"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="" disabled>-- Choose {product.dropdown_label || 'an option'} --</option>
                    {dropdownOptionsArray.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}

              {product.allow_special_instructions && (
                <div>
                  <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">
                    Custom Engraving Instructions
                  </label>
                  <textarea 
                    rows="3" 
                    placeholder="Describe specific patterns, initials, or logos you would like..."
                    className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:border-[#eebf1c] focus:ring-1 focus:ring-[#eebf1c] transition-shadow resize-none"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  ></textarea>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg w-32 overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-200 text-gray-600 transition-colors">-</button>
                  <span className="flex-1 text-center font-bold text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.quantity || 1, quantity + 1))} className="px-4 py-2 hover:bg-gray-200 text-gray-600 transition-colors">+</button>
                </div>
              </div>

              {product.requires_ffl && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3 items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-[10px] text-red-800 leading-relaxed font-bold uppercase tracking-wide">
                    FFL Required: This item is a serialized firearm and must be shipped directly to a valid Federal Firearms Licensee (FFL).
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
               <button 
                 onClick={handleAddToCart}
                 disabled={product.quantity <= 0}
                 className={`${globalBtnClass} ${product.quantity <= 0 ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''}`}
               >
                 {product.quantity <= 0 ? 'Out of Stock' : 'Add to Quote Cart'}
               </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-20">
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
            {['description', 'specs', 'process', 'shipping'].map(tab => {
              if (tab === 'specs' && !product.tab_specs) return null;
              if (tab === 'process' && !product.tab_process) return null;
              if (tab === 'shipping' && !product.tab_shipping) return null;
              
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'bg-white text-[#eebf1c] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          
          <div className="p-8 md:p-12 text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
             {activeTab === 'description' && (product.description || 'No description provided.')}
             {activeTab === 'specs' && product.tab_specs}
             {activeTab === 'process' && product.tab_process}
             {activeTab === 'shipping' && product.tab_shipping}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16 pb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#04351e] uppercase tracking-wide">
                Similar Products
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedItem) => (
                <RelatedThumbnailCard 
                  key={relatedItem.id} 
                  item={relatedItem} 
                  onSelect={onSelectProduct} 
                  globalBtnClass={globalBtnClass} 
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}