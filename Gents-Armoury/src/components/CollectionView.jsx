import React, { useState } from 'react';

function ThumbnailCard({ item, onSelect, globalBtnClass, index }) {
  const hasOptions = item.dropdown_label || item.price_max;

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${(index % 10) * 100}ms` }}
    >
      <div className="bg-white h-56 md:h-64 p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="text-gray-300 font-mono text-xs">No Image</div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#04351e] mb-4 leading-snug">{item.title}</h3>
        
        <div className="mt-auto space-y-1">
          {hasOptions && <span className="text-xs text-gray-500 italic block">Starting at</span>}
          <span className="text-[#eebf1c] font-bold text-xl block mb-6">
            ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
          </span>
          
          <button 
            className={`${globalBtnClass} !py-2.5 !text-[10px] w-full mt-auto`}
            onClick={(e) => {
              e.stopPropagation(); 
              onSelect(item);
            }}
          >
            Select options
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollectionView({ category, items, onSelectProduct, globalBtnClass, goToContact }) {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getBannerBg = () => {
    switch (category) {
      case 'Rifles': return '/Rifle.jpg';
      case 'Handguns': return '/Handgun.jpg';
      case 'Accessories': return '/Accessories.jpg'; 
      case 'Gallery': return 'Gallery.jpeg'; 
      default: return '';
    }
  };

  const bannerBg = getBannerBg();

  return (
    <div className="min-h-screen bg-white pb-16">
      
      <div className="relative w-full h-64 md:h-80 bg-[#111] flex flex-col items-center justify-center border-b-4 border-[#eebf1c] overflow-hidden">
        {bannerBg && (
          <img 
            src={bannerBg} 
            alt={`${category} Banner`} 
            className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-all duration-[2000ms] ease-out ${imageLoaded ? 'scale-100 opacity-40' : 'scale-105 opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#eebf1c] uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {category}
          </h1>
          
          {category === 'Gallery' && (
            <div className="mt-8 w-64 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {/* FIXED: Uses the React router state function instead of a hard refresh */}
              <button onClick={goToContact} className={globalBtnClass}>
                Request a Quote
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 md:px-8 pt-12 md:pt-16 max-w-7xl mx-auto">
        
        {category === 'Gallery' && (
          <div className="max-w-4xl mx-auto mb-16 text-center animate-fade-up">
            <p className="text-lg md:text-xl font-sans text-[#04351e] leading-relaxed font-medium">
              Explore a curated showcase of our finest custom engravings. From deep-cut scrolls to precision laser stippling, each piece reflects the uncompromising dedication and heritage craftsmanship born right here in East Texas. If you can envision it, we can engrave it.
            </p>
            
            <div className="relative flex pt-12 pb-4 items-center justify-center">
               <div className="flex-grow border-t-2 border-[#eebf1c]"></div>
               <span className="flex-shrink-0 mx-6">
                 <img src="/Sticker.png" alt="Company Sticker" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-[0_0_15px_rgba(238,191,28,0.3)] border-2 border-[#eebf1c]" />
               </span>
               <div className="flex-grow border-t-2 border-[#eebf1c]"></div>
            </div>
          </div>
        )}

        {category === 'Gallery' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedGalleryImage(item.image_url)}
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 border border-[#eebf1c]/30 shadow-md hover:shadow-[0_10px_30px_rgba(238,191,28,0.2)] transition-all duration-300 cursor-pointer group animate-fade-up"
                style={{ animationDelay: `${(index % 10) * 50}ms` }}
              >
                {item.image_url && (
                  <img src={item.image_url} alt="Gallery Showcase" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[#eebf1c] drop-shadow-lg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <ThumbnailCard key={item.id} item={item} index={index} onSelect={onSelectProduct} globalBtnClass={globalBtnClass} />
            ))}
          </div>
        )}

        {category !== 'Gallery' && (
          <div className="max-w-5xl mx-auto mt-16 animate-fade-up">
            <div className="bg-[#04351e] border border-[#eebf1c] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="bg-[#eebf1c] text-[#04351e] p-6 md:w-1/3 flex flex-col justify-center items-center text-center">
                <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="font-serif font-black uppercase tracking-widest text-lg">Attention Customers</h3>
              </div>
              <div className="p-6 md:w-2/3 text-[#eebf1c] flex flex-col justify-center space-y-4">
                <p className="font-sans font-medium text-sm md:text-base">
                  <strong className="text-white tracking-wider uppercase mr-2">Ordering:</strong> No payments will be taken online. All payments and orders will be made over the phone or in person.
                </p>
                <p className="font-sans font-medium text-sm md:text-base border-t border-[#eebf1c]/20 pt-4">
                  <strong className="text-white tracking-wider uppercase mr-2">Turnaround Times:</strong> Customers should expect a four-week turnaround time for any custom engraved firearm ordered.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm p-4 md:p-12 transition-all duration-300" onClick={() => setSelectedGalleryImage(null)}>
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-[#eebf1c] hover:text-white text-4xl md:text-5xl font-black transition-colors cursor-pointer drop-shadow-md z-10" onClick={() => setSelectedGalleryImage(null)}>&times;</button>
          <img src={selectedGalleryImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-[#eebf1c]/20 animate-fade-up" alt="Gallery Full Size" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}