import React, { useState, useEffect } from 'react';

function HomeThumbnailCard({ item, onSelect, globalBtnClass }) {
  const hasOptions = item.dropdown_label || item.price_max;

  return (
    <article
      onClick={() => onSelect(item)}
      className="w-[280px] md:w-[320px] flex-shrink-0 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group whitespace-normal"
    >
      <div className="bg-white h-48 p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
        {item.image_url ? (
          <img src={item.image_url} alt={`Preview of ${item.title}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-gray-300 font-mono text-xs">No Image</div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-base font-bold text-[#04351e] mb-3 leading-snug line-clamp-2">{item.title}</h3>
        <div className="mt-auto space-y-1">
          {hasOptions && <span className="text-[10px] text-gray-500 italic block">Starting at</span>}
          <span className="text-[#eebf1c] font-bold text-lg block mb-4">
            ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
          </span>
          <button 
            className={`${globalBtnClass} !py-2 !text-[9px] w-full`}
            onClick={(e) => { e.stopPropagation(); onSelect(item); }}
            aria-label={`Select options for ${item.title}`}
          >
            Select options
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetailView({ product, inventory, onSelectProduct, globalBtnClass, onAddToCart, goBack }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Default');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setCurrentImageIndex(0);
    setQuantity(1);
    setSelectedOption('Default');
    setSpecialInstructions('');
    setActiveTab('description');
    
    if (product && product.dropdown_options) {
        const options = product.dropdown_options.split(',').map(o => o.trim());
        if (options.length > 0) setSelectedOption(options[0]);
    }
  }, [product]);

  if (!product) return null;

  const allImages = [product.image_url, ...(product.alt_images || [])].filter(Boolean);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const handleAdd = () => {
    onAddToCart({
      ...product,
      cart_quantity: quantity,
      cart_selected_option: selectedOption,
      cart_special_instructions: specialInstructions,
      cart_price: (product.price || 0) * quantity
    });
  };

  const relatedItems = inventory.filter(i => i.category === product.category && i.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in text-left">
      <button onClick={goBack} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#eebf1c] transition-colors mb-8 flex items-center gap-2">
        &larr; Back to {product.category || 'Store'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* THE FIX: aspect-square locks the height, and the inner div creates the sliding track for the images */}
          <div className="relative w-full aspect-square bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex items-center">
            
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {allImages.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 md:p-8">
                  <img 
                    src={img} 
                    alt={`${product.title} - View ${idx + 1}`} 
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              ))}
            </div>
            
            {allImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 bg-black/50 hover:bg-[#eebf1c] text-white hover:text-[#04351e] w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md backdrop-blur-sm z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={nextImage} className="absolute right-4 bg-black/50 hover:bg-[#eebf1c] text-white hover:text-[#04351e] w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md backdrop-blur-sm z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </>
            )}
            
            {product.is_limited_edition && (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded shadow-lg animate-pulse z-10">Limited Run</span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[#eebf1c] scale-105 shadow-md' : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover bg-white" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#04351e] mb-3 leading-tight">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
              <span>{product.category}</span>
              {product.sku && <span>• SKU: {product.sku}</span>}
              
              {product.quantity > 5 ? (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">In Stock</span>
              ) : product.quantity > 0 ? (
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Low Stock</span>
              ) : (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Sold Out</span>
              )}
            </div>
          </div>

          {product.is_limited_edition && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 flex items-start gap-3 text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 text-red-600"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Limited Edition Vault Run</h4>
                <p className="text-xs">This is a temporary collection item.</p>
              </div>
            </div>
          )}

          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl md:text-5xl font-black text-[#eebf1c]">${product.price?.toFixed(2) || '0.00'}</span>
              {product.price_max && <span className="text-2xl font-bold text-gray-400 line-through mb-1">- ${product.price_max.toFixed(2)}</span>}
            </div>
            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">* Final cost pricing determined upon custom quote review.</p>
          </div>

          <div className="space-y-6 flex-grow">
            {product.dropdown_label && product.dropdown_options && (
              <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">{product.dropdown_label}</label>
                <select 
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-black text-sm rounded-lg p-3 focus:outline-none focus:border-[#eebf1c] shadow-sm cursor-pointer"
                >
                  {product.dropdown_options.split(',').map((opt, i) => (
                    <option key={i} value={opt.trim()}>{opt.trim()}</option>
                  ))}
                </select>
              </div>
            )}

            {product.allow_special_instructions && (
              <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">Custom Engraving Instructions</label>
                <textarea 
                  rows="3" 
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Describe specific patterns, initials, or logos you would like..."
                  className="w-full bg-gray-50 border border-gray-300 text-black text-sm rounded-lg p-3 focus:outline-none focus:border-[#eebf1c] shadow-sm"
                ></textarea>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">Quantity</label>
              <div className="flex items-center w-32 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-colors font-bold">&minus;</button>
                <input type="text" readOnly value={quantity} className="flex-1 w-full h-10 bg-transparent text-center text-black font-bold focus:outline-none text-sm" />
                <button type="button" onClick={() => setQuantity(product.quantity > quantity ? quantity + 1 : quantity)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-colors font-bold">&#43;</button>
              </div>
            </div>

            {product.requires_ffl && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
                <p className="text-[10px] font-bold text-red-800 uppercase tracking-wider leading-relaxed">
                  FFL REQUIRED: This item is a serialized firearm and must be shipped directly to a valid Federal Firearms License (FFL).
                </p>
              </div>
            )}
          </div>

          <div className="pt-8 mt-auto">
            <button 
              onClick={handleAdd}
              disabled={product.quantity <= 0}
              className={`${globalBtnClass} w-full py-4 text-sm shadow-xl ${product.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {product.quantity <= 0 ? 'Out of Stock' : 'Add to Quote Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
           {['description', 'specs', 'process', 'shipping'].map(tab => {
              if (tab !== 'description' && (!product[`tab_${tab}`] || product[`tab_${tab}`].trim() === '')) return null;
              
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[#eebf1c] text-[#04351e] bg-gray-50' : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50/50'}`}
                >
                  {tab}
                </button>
              );
           })}
         </div>
         <div className="p-8 md:p-12 text-gray-600 font-sans leading-relaxed">
            {activeTab === 'description' && (
              <div className="whitespace-pre-wrap">{product.description || 'No description available.'}</div>
            )}
            {activeTab === 'specs' && product.tab_specs && (
              <div className="whitespace-pre-wrap">{product.tab_specs}</div>
            )}
            {activeTab === 'process' && product.tab_process && (
              <div className="whitespace-pre-wrap">{product.tab_process}</div>
            )}
            {activeTab === 'shipping' && product.tab_shipping && (
              <div className="whitespace-pre-wrap">{product.tab_shipping}</div>
            )}
         </div>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
         <div className="mt-20">
           <h3 className="text-2xl font-serif font-bold text-[#04351e] border-b border-[#eebf1c]/30 pb-3 mb-8">Related {product.category}</h3>
           <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
             {relatedItems.map(item => (
               <HomeThumbnailCard 
                 key={item.id} 
                 item={item} 
                 onSelect={onSelectProduct} 
                 globalBtnClass={globalBtnClass} 
               />
             ))}
           </div>
         </div>
      )}
    </div>
  );
}
