import React, { useState, useEffect, useRef } from 'react';

function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
      {children}
    </div>
  );
}

function HomeThumbnailCard({ item, onSelect, globalBtnClass }) {
  const hasOptions = item.dropdown_label || item.price_max;

  return (
    <article
      onClick={() => onSelect(item)}
      className="w-[280px] md:w-[320px] flex-shrink-0 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group whitespace-normal"
    >
      <div className="bg-white h-48 p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
        {item.image_url ? (
          <>
            <img src={item.image_url} alt={`Preview of ${item.title}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[#eebf1c] drop-shadow-lg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </>
        ) : (
          <div className="text-gray-300 font-mono text-xs">No Image</div>
        )}
        <span className="absolute top-2 right-2 bg-[#eebf1c] text-[#04351e] text-[9px] font-mono px-2 py-1 rounded shadow font-black tracking-widest uppercase z-20">NEW</span>
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

export default function HomeView({ setPage, homeSections, inventory, globalBtnClass, onSelectProduct }) {
  const safeSections = homeSections || [];
  const recentItems = inventory ? inventory.filter(i => i.category !== 'Gallery').slice(0, 4) : [];
  const galleryItems = inventory ? inventory.filter(i => i.category === 'Gallery').slice(0, 8) : [];

  return (
    <div className="flex flex-col text-left overflow-x-hidden">
      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: scroll-left 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {safeSections.filter(s => s.is_enabled !== false && s.layout_type !== 'global_config').map((section, index) => {
        const isH1 = index === 0;
        return (
          <section key={section.id} aria-label={section.title} className={section.connect_to_previous ? "mt-0" : "mt-16"}>
            <ScrollReveal>
              <CmsSection section={section} setPage={setPage} isH1={isH1} />
            </ScrollReveal>
          </section>
        );
      })}

      <ScrollReveal>
        <div className="mt-16 relative flex py-16 items-center max-w-7xl mx-auto px-6" aria-hidden="true">
           <div className="flex-grow border-t-2 border-[#eebf1c]"></div>
           <span className="flex-shrink-0 mx-6">
             <img src="/Sticker.png" alt="" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-[0_0_15px_rgba(238,191,28,0.3)] border-2 border-[#eebf1c]" />
           </span>
           <div className="flex-grow border-t-2 border-[#eebf1c]"></div>
        </div>
      </ScrollReveal>

      <section aria-labelledby="recent-additions">
        <ScrollReveal>
          <div className="mt-16 space-y-6 pb-10">
            <header className="border-b border-[#eebf1c]/20 pb-3 max-w-7xl mx-auto px-6 flex justify-between items-end">
              <div>
                <h2 id="recent-additions" className="font-serif text-3xl text-[#04351e] font-bold uppercase tracking-wide">Newly Engraved Vault Additions</h2>
                <p className="text-sm text-gray-500 mt-1 font-sans">Fresh models straight from our laser production labs.</p>
              </div>
              <button aria-label="Shop All Firearms" onClick={() => setPage('Rifles')} className="hidden md:block text-[#04351e] text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">Shop Store &rarr;</button>
            </header>
            
            {recentItems.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#eebf1c]/20 rounded-xl bg-white text-gray-400 text-xs max-w-7xl mx-auto">
                No inventory pieces uploaded yet.
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-6 overflow-hidden pb-8 pt-4 cursor-pointer" aria-live="polite">
                <div className="flex gap-6 w-max animate-marquee" style={{ animationDuration: '45s' }}>
                  {[...Array(4)].map((_, arrayIndex) => (
                    <React.Fragment key={arrayIndex}>
                      {recentItems.map((item) => (
                        <HomeThumbnailCard 
                          key={`${arrayIndex}-${item.id}`} 
                          item={item} 
                          onSelect={onSelectProduct} 
                          globalBtnClass={globalBtnClass} 
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {galleryItems.length > 0 && (
        <section aria-labelledby="gallery-preview">
          <ScrollReveal>
            <div className="mt-16 space-y-6 pb-20">
              <header className="border-b border-[#eebf1c]/20 pb-3 max-w-7xl mx-auto px-6 flex justify-between items-end">
                <div>
                  <h2 id="gallery-preview" className="font-serif text-3xl text-[#04351e] font-bold uppercase tracking-wide">Armoury Gallery</h2>
                  <p className="text-sm text-gray-500 mt-1 font-sans">A showcase of our finest custom commissions.</p>
                </div>
                <button aria-label="View Full Engraving Gallery" onClick={() => setPage('Gallery')} className="hidden md:block text-[#04351e] text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">View Full Gallery &rarr;</button>
              </header>
              
              <div className="max-w-7xl mx-auto px-6 overflow-hidden pb-8 pt-2" aria-live="polite">
                <div className="flex gap-4 md:gap-6 w-max animate-marquee" style={{ animationDuration: '65s' }}>
                  {[...Array(4)].map((_, arrayIndex) => (
                    <React.Fragment key={arrayIndex}>
                      {galleryItems.map((item) => (
                        <article key={`${arrayIndex}-${item.id}`} onClick={() => setPage('Gallery')} className="w-40 h-40 md:w-64 md:h-64 flex-shrink-0 bg-gray-100 relative overflow-hidden rounded-xl cursor-pointer group border border-[#eebf1c]/20 whitespace-normal">
                          {item.image_url && <img src={item.image_url} alt={`Gallery piece: ${item.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                             <span className="text-[#eebf1c] font-bold uppercase tracking-widest text-sm drop-shadow-lg">{item.title}</span>
                          </div>
                        </article>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="text-center md:hidden pt-4">
                 <button aria-label="View Full Gallery" onClick={() => setPage('Gallery')} className="text-[#04351e] text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity">View Full Gallery &rarr;</button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}

function CmsSection({ section, setPage, isH1 }) {
  const [bgCarouselIndex, setBgCarouselIndex] = useState(0);

  let backgroundMediaArray = [];
  if (Array.isArray(section.bg_images) && section.bg_images.length > 0) {
      backgroundMediaArray = section.bg_images;
  } else if (section.bg_image_url && section.bg_image_url.trim() !== '') {
      backgroundMediaArray = [section.bg_image_url];
  }

  const useOverlay = section.bg_opacity_enabled !== false;
  const noBackground = section.bg_none === true;

  const colorHexMap = {
    'brand-gold': '#eebf1c',
    'brand-green': '#04351e',
    'white': '#ffffff',
    'black': '#000000',
    'silver': '#9ca3af',
    'red': '#dc2626',
    'blue': '#2563eb',
    'purple': '#7e22ce'
  };

  let customBoxShadow = '';
  let customAnimation = '';
  const rawColor = colorHexMap[section.border_color] || section.border_color || '#eebf1c';

  if (section.border_effect === 'glow') customBoxShadow = `0 0 20px ${rawColor}90`;
  else if (section.border_effect === 'neon') customBoxShadow = `0 0 5px ${rawColor}, 0 0 15px ${rawColor}, 0 0 30px ${rawColor}`;
  else if (section.border_effect === 'pulse') customAnimation = 'borderPulse 2s infinite';

  const borderStyles = section.border_enabled ? {
     borderWidth: section.border_size || '2px',
     borderColor: rawColor,
     borderStyle: (section.border_effect === 'dashed' || section.border_effect === 'double') ? section.border_effect : 'solid',
     boxShadow: customBoxShadow || undefined,
     animation: customAnimation || undefined,
     '--tw-shadow-color': rawColor 
  } : {};

  const getFontClass = (font) => {
    switch(font) {
      case 'sans': return 'font-sans';
      case 'mono': return 'font-mono tracking-tighter';
      case 'cursive': return 'font-["Brush_Script_MT",_cursive]';
      case 'display': return 'font-sans font-black tracking-tighter';
      case 'serif': default: return 'font-serif';
    }
  };

  const getColorClass = (color) => {
    switch(color) {
      case 'white': return 'text-white';
      case 'black': return 'text-black';
      case 'silver': return 'text-gray-400';
      case 'red': return 'text-red-600';
      case 'blue': return 'text-blue-600';
      case 'purple': return 'text-purple-700';
      case 'brand-green': return 'text-[#04351e]';
      case 'brand-gold': case 'gold': default: return 'text-[#eebf1c]'; 
    }
  };

  const getEffectClass = (effect, color) => {
    if (effect === 'gradient') {
      if (color === 'brand-gold' || color === 'gold') return 'text-transparent bg-clip-text bg-gradient-to-r from-[#eebf1c] to-yellow-600 drop-shadow';
      if (color === 'brand-green') return 'text-transparent bg-clip-text bg-gradient-to-r from-[#04351e] to-emerald-800 drop-shadow';
      if (color === 'white') return 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 drop-shadow';
      if (color === 'red') return 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow';
      if (color === 'blue') return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow';
      if (color === 'purple') return 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-900 drop-shadow';
      if (color === 'silver') return 'text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600 drop-shadow';
      return 'text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black drop-shadow';
    }
    if (effect === 'glow') {
      const base = getColorClass(color);
      if (color === 'brand-gold' || color === 'gold') return `${base} drop-shadow-[0_0_15px_rgba(238,191,28,0.8)]`;
      if (color === 'brand-green') return `${base} drop-shadow-[0_0_15px_rgba(4,53,30,0.8)]`;
      if (color === 'red') return `${base} drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]`;
      if (color === 'blue') return `${base} drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]`;
      if (color === 'purple') return `${base} drop-shadow-[0_0_15px_rgba(126,34,206,0.8)]`;
      if (color === 'silver') return `${base} drop-shadow-[0_0_15px_rgba(156,163,175,0.8)]`;
      return `${base} drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]`; 
    }
    return getColorClass(color); 
  };

  const getButtonClasses = (btnNum = 1) => {
    const color = btnNum === 1 ? (section.btn_color || 'brand-gold') : (btnNum === 2 ? (section.btn2_color || 'brand-gold') : (section.btn3_color || 'brand-gold'));
    const style = btnNum === 1 ? (section.btn_style || 'solid') : (btnNum === 2 ? (section.btn2_style || 'outline') : (section.btn3_style || 'solid'));
    const rawRadius = btnNum === 1 ? (section.btn_radius || 'rounded-lg') : (btnNum === 2 ? (section.btn2_radius || 'rounded-lg') : (section.btn3_radius || 'rounded-lg'));
    const radius = rawRadius === 'square' ? 'rounded-none' : (rawRadius === 'pill' ? 'rounded-full' : rawRadius);
    const hoverType = btnNum === 1 ? (section.btn_hover_anim || 'lift') : (btnNum === 2 ? (section.btn2_hover_anim || 'lift') : (section.btn3_hover_anim || 'lift'));
    const font = btnNum === 1 ? (section.btn_font || 'sans') : (btnNum === 2 ? (section.btn2_font || 'sans') : (section.btn3_font || 'sans'));
    
    let hoverAnimClass = 'hover:brightness-110';
    if (hoverType === 'lift') hoverAnimClass = 'hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.03] active:scale-95';
    if (hoverType === 'glow') hoverAnimClass = 'hover:shadow-[0_0_15px_currentColor] hover:scale-[1.02] active:scale-95';
    
    const fontClass = font === 'serif' ? 'font-serif' : (font === 'mono' ? 'font-mono' : 'font-sans font-bold');
    
    const baseClass = `px-3 py-2 md:px-8 md:py-3 text-[8px] md:text-[11px] uppercase tracking-widest transition-all duration-300 transform cursor-pointer flex items-center justify-center text-center w-full md:w-auto ${radius} ${hoverAnimClass} ${fontClass}`;
    
    let appliedStyle = style;
    if (appliedStyle === 'solid') {
      if (color === 'brand-gold' || color === 'gold') return `${baseClass} bg-[#eebf1c] text-[#04351e] border border-[#eebf1c]`;
      if (color === 'brand-green' || color === 'emerald') return `${baseClass} bg-[#04351e] text-[#eebf1c] border border-[#04351e]`;
      if (color === 'white') return `${baseClass} bg-white text-black border border-white`;
      if (color === 'red') return `${baseClass} bg-red-600 text-white border border-red-600`;
      if (color === 'blue') return `${baseClass} bg-blue-600 text-white border border-blue-600`;
      if (color === 'purple') return `${baseClass} bg-purple-700 text-white border border-purple-700`;
      if (color === 'silver') return `${baseClass} bg-gray-400 text-black border border-gray-400`;
      if (color === 'black') return `${baseClass} bg-black text-white border border-gray-800`;
    }

    if (appliedStyle === 'outline') {
      if (color === 'brand-gold' || color === 'gold') return `${baseClass} border-2 border-[#eebf1c] text-[#eebf1c] hover:bg-[#eebf1c] hover:text-[#04351e]`;
      if (color === 'brand-green' || color === 'emerald') return `${baseClass} border-2 border-[#04351e] text-[#04351e] hover:bg-[#04351e] hover:text-white`;
      if (color === 'white') return `${baseClass} border-2 border-white text-gray-700 hover:bg-white hover:text-black`;
      if (color === 'red') return `${baseClass} border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white`;
      if (color === 'blue') return `${baseClass} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`;
      if (color === 'purple') return `${baseClass} border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white`;
      if (color === 'silver') return `${baseClass} border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-black`;
      if (color === 'black') return `${baseClass} border-2 border-black text-black hover:bg-black hover:text-white`;
    }
    
    return `${baseClass} bg-[#eebf1c] text-[#04351e]`;
  };

  const getInlineBgClass = () => {
    switch(section.inline_bg_style) {
      case 'black': return 'bg-black/90';
      case 'white': return 'bg-white';
      case 'brand-gold': case 'gold': return 'bg-[#eebf1c]';
      case 'brand-green': return 'bg-[#04351e]';
      case 'glass-dark': return 'bg-black/50 backdrop-blur-md';
      case 'glass-light': return 'bg-white/20 backdrop-blur-md';
      case 'transparent': default: return 'bg-transparent';
    }
  };

  const getSectionStyleClass = () => {
    switch(section.section_style) {
      case 'bubbled': return 'm-2 md:m-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-[#eebf1c]/20 overflow-hidden';
      case 'elevated': return 'shadow-2xl z-10 relative border-y-4 border-[#04351e]';
      case 'glass': return 'm-2 md:m-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl overflow-hidden';
      case 'flat': default: return '';
    }
  };

  const getOuterCardClass = (hasImage) => {
    if (hasImage) return `relative rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 h-full w-full shadow-lg border border-[#eebf1c]/30 bg-[#0a0a0a] block`; 
    if (noBackground) return `relative rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 h-full w-full bg-transparent block`; 
    if (useOverlay) return `relative rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 h-full w-full bg-black/50 border border-white/5 shadow-lg block`; 
    return `relative rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 h-full w-full bg-gray-50 shadow-sm border border-gray-200 block`; 
  };

  const titleStyles = `${getFontClass(section.font_family)} ${getEffectClass(section.text_effect, section.text_color)} font-bold uppercase`;
  const plainTextStyles = `${getColorClass(section.text_color)}`;

  useEffect(() => {
    let bgTimer;
    if (backgroundMediaArray.length > 1) {
      bgTimer = setInterval(() => {
        setBgCarouselIndex((prev) => (prev + 1) % backgroundMediaArray.length);
      }, 5000); 
    } else {
      setBgCarouselIndex(0);
    }
    return () => clearInterval(bgTimer);
  }, [backgroundMediaArray.length, bgCarouselIndex]);

  const handleButtonClick = (targetLink) => {
    if (!targetLink) return;
    const validTabs = ['Home', 'Rifles', 'Handguns', 'Accessories', 'Gallery', 'Cart', 'Contact', 'Admin'];
    if (targetLink.startsWith('http') || targetLink.includes('.com')) {
      window.open(targetLink, '_blank', 'noopener,noreferrer');
    } else {
      const cleanLink = targetLink.replace('/', '');
      if (validTabs.includes(cleanLink)) setPage(cleanLink);
      else setPage(targetLink); 
    }
  };

  const renderBackgroundLayer = () => {
    if (noBackground) return null;
    const hasMedia = backgroundMediaArray.length > 0;
    
    return (
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: section.bg_color || '#000000' }}>
        <div className={`w-full h-full ${section.bg_parallax ? 'fixed inset-0' : 'absolute inset-0'}`}>
          {hasMedia ? (
            <div className="flex w-full h-full transition-transform duration-1000 ease-out bg-black" style={{ transform: `translateX(-${bgCarouselIndex * 100}%)` }}>
              {backgroundMediaArray.map((url, idx) => {
                const isVideo = url.includes('.mp4') || url.includes('.webm');
                return (
                  <div key={idx} className="w-full h-full flex-shrink-0 relative">
                    {isVideo ? (
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50"><source src={url} type="video/mp4" /></video>
                    ) : (<img src={url} alt="" className="w-full h-full object-cover opacity-50" />)}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="absolute inset-0 z-10 mix-blend-multiply transition-opacity duration-300" style={{ backgroundColor: '#000000', opacity: (section.bg_overlay_opacity ?? 60) / 100 }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10"></div>
      </div>
    );
  };

  const renderInlineImage = () => {
    if (!section.inline_image_url) return null;
    const bgClass = getInlineBgClass();
    const hasBackplate = bgClass !== 'bg-transparent';
    
    return (
      <div className={`w-full max-w-[280px] md:max-w-sm lg:max-w-md h-auto relative z-20 rounded-xl ${bgClass} ${hasBackplate ? 'p-3 md:p-6 shadow-2xl border border-[#eebf1c]/20' : ''} mx-auto`}>
        <img src={section.inline_image_url} alt={section.title} className={`w-full h-auto object-cover ${hasBackplate ? 'rounded shadow-md' : 'rounded-lg'}`} />
      </div>
    );
  };

  const containerStyle = section.bg_parallax ? { clipPath: 'inset(0)' } : {};
  const containerClass = `relative transition-all duration-300 ${noBackground ? 'bg-transparent' : ''} ${getSectionStyleClass()} ${section.bg_parallax ? '' : 'overflow-hidden'}`;

  const TitleTag = isH1 ? 'h1' : 'h3';

  switch (section.layout_type) {
    case 'hero_banner': {
      const hasInlineImage = !!section.inline_image_url;
      const forceCenter = !hasInlineImage || section.inline_image_position === 'center';

      return (
        <div className={containerClass} style={{ ...borderStyles, ...containerStyle }}>
          {renderBackgroundLayer()}
          <div className="relative z-20 p-6 md:p-24 min-h-[400px] md:min-h-[600px] flex flex-col justify-center items-center">
            
            <div className={`flex items-center gap-6 md:gap-10 w-full max-w-6xl mx-auto ${forceCenter ? 'flex-col' : (section.inline_image_position === 'left' ? 'flex-row-reverse' : 'flex-row')}`}>
              
              <div className={`flex-1 flex flex-col ${forceCenter ? 'items-center text-center' : 'items-start text-left'}`}>
                {section.tagline && <p className={`text-[9px] md:text-sm uppercase tracking-[0.5em] font-black drop-shadow-md mb-2 md:mb-4 ${plainTextStyles}`}>{section.tagline}</p>}
                <TitleTag className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter drop-shadow-2xl mb-4 md:mb-6 ${titleStyles}`}>{section.title}</TitleTag>
                
                {forceCenter && hasInlineImage && (
                   <div className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#eebf1c] to-transparent mx-auto opacity-70 my-4 md:my-6" aria-hidden="true"></div>
                )}
                
                {section.description && <p className={`text-[11px] md:text-lg font-sans max-w-2xl drop-shadow-md leading-relaxed mb-6 md:mb-10 ${plainTextStyles}`}>{section.description}</p>}
                
                <div className={`flex flex-wrap gap-2 md:gap-4 w-full ${forceCenter ? 'justify-center' : 'justify-start'}`}>
                  {section.btn1_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn1_link)} className={getButtonClasses(1)}>{section.btn1_text}</button></div>}
                  {section.btn2_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn2_link)} className={getButtonClasses(2)}>{section.btn2_text}</button></div>}
                  {section.btn3_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn3_link)} className={getButtonClasses(3)}>{section.btn3_text}</button></div>}
                </div>
              </div>
              
              {!forceCenter && (
                <div className="flex-shrink-0 w-1/3 md:w-1/2 flex justify-center">
                  {renderInlineImage()}
                </div>
              )}
            </div>

            {hasInlineImage && forceCenter && (
              <div className="w-full flex justify-center mt-8 md:mt-12">
                {renderInlineImage()}
              </div>
            )}
            
          </div>
        </div>
      );
    }

    case 'text_with_image':
      return (
        <div className={containerClass} style={{ ...borderStyles, ...containerStyle }}>
          {renderBackgroundLayer()}
          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <div className={`grid grid-cols-2 gap-4 md:gap-12 items-center p-4 md:p-12 rounded-2xl ${useOverlay && !noBackground ? 'bg-black/30 backdrop-blur-md border border-white/5 shadow-2xl' : ''}`}>
              <div className={`space-y-3 md:space-y-6 ${section.inline_image_position === 'left' ? 'order-2' : 'order-1'}`}>
                {section.tagline && <span className={`text-[8px] md:text-xs font-black uppercase tracking-[0.3em] block ${plainTextStyles}`}>{section.tagline}</span>}
                <TitleTag className={`text-xl md:text-5xl leading-tight ${titleStyles}`}>{section.title}</TitleTag>
                <p className={`text-[10px] md:text-sm opacity-90 leading-relaxed font-sans ${plainTextStyles}`}>{section.description}</p>
                <div className="flex flex-wrap gap-2 md:gap-4 pt-2 md:pt-4 w-full">
                  {section.btn1_enabled && <div className="w-full md:w-auto"><button onClick={() => handleButtonClick(section.btn1_link)} className={getButtonClasses(1)}>{section.btn1_text}</button></div>}
                  {section.btn2_enabled && <div className="w-full md:w-auto"><button onClick={() => handleButtonClick(section.btn2_link)} className={getButtonClasses(2)}>{section.btn2_text}</button></div>}
                  {section.btn3_enabled && <div className="w-full md:w-auto"><button onClick={() => handleButtonClick(section.btn3_link)} className={getButtonClasses(3)}>{section.btn3_text}</button></div>}
                </div>
              </div>
              
              <div className={`aspect-[4/3] relative overflow-hidden rounded-xl shadow-xl ${getInlineBgClass()} flex items-center justify-center border border-[#eebf1c]/10 ${section.inline_image_position === 'left' ? 'order-1' : 'order-2'}`}>
                {section.inline_image_url ? (
                  <img src={section.inline_image_url} alt={`Feature associated with ${section.title}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-[8px] md:text-xs border-2 border-dashed border-gray-300 rounded m-2 md:m-4 text-center">No Image Uploaded</div>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case 'feature_grid':
      return (
        <div className={containerClass} style={{ ...borderStyles, ...containerStyle }}>
          {renderBackgroundLayer()}
          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <header className={`text-center space-y-2 md:space-y-4 mb-8 md:mb-16 p-4 md:p-8 rounded-2xl max-w-3xl mx-auto ${useOverlay && !noBackground ? 'bg-black/40 backdrop-blur-md border border-white/5 shadow-xl' : ''}`}>
              {section.tagline && <span className={`text-[8px] md:text-xs uppercase tracking-[0.3em] font-black block ${plainTextStyles}`}>{section.tagline}</span>}
              <TitleTag className={`text-2xl md:text-5xl ${titleStyles}`}>{section.title}</TitleTag>
            </header>
            
            <div className="grid grid-cols-3 gap-2 md:gap-8">
              <article className={getOuterCardClass(section.feature1_bg)}>
                {section.feature1_bg && (
                   <div className="absolute inset-0 z-0 bg-black">
                     <img src={section.feature1_bg} alt="" className="w-full h-full object-cover opacity-60" />
                     <div className="absolute inset-0 bg-black/40"></div>
                   </div>
                )}
                <div className="relative z-10 flex flex-col items-center justify-start h-full w-full p-3 md:p-8 text-center">
                  {section.feature1_title && <h4 className={`text-[10px] md:text-xl font-bold uppercase tracking-wider mb-2 md:mb-4 ${plainTextStyles} ${getFontClass(section.font_family)}`}>{section.feature1_title}</h4>}
                  {section.feature1_text && <p className={`text-[8px] md:text-sm opacity-80 font-sans leading-relaxed ${plainTextStyles}`}>{section.feature1_text}</p>}
                  {section.btn1_enabled && (
                    <div className="mt-auto pt-4 md:pt-8 w-full flex justify-center">
                       <button onClick={() => handleButtonClick(section.btn1_link)} className={getButtonClasses(1)}>{section.btn1_text}</button>
                    </div>
                  )}
                </div>
              </article>

              <article className={getOuterCardClass(section.feature2_bg)}>
                {section.feature2_bg && (
                   <div className="absolute inset-0 z-0 bg-black">
                     <img src={section.feature2_bg} alt="" className="w-full h-full object-cover opacity-60" />
                     <div className="absolute inset-0 bg-black/40"></div>
                   </div>
                )}
                <div className="relative z-10 flex flex-col items-center justify-start h-full w-full p-3 md:p-8 text-center">
                  <h4 className={`text-[10px] md:text-xl font-bold uppercase tracking-wider mb-2 md:mb-4 ${plainTextStyles} ${getFontClass(section.font_family)}`}>{section.feature2_title || 'Premium Service'}</h4>
                  {section.feature2_text && <p className={`text-[8px] md:text-sm opacity-80 font-sans leading-relaxed ${plainTextStyles}`}>{section.feature2_text}</p>}
                  {section.btn2_enabled && (
                    <div className="mt-auto pt-4 md:pt-8 w-full flex justify-center">
                       <button onClick={() => handleButtonClick(section.btn2_link)} className={getButtonClasses(2)}>{section.btn2_text}</button>
                    </div>
                  )}
                </div>
              </article>

              <article className={getOuterCardClass(section.feature3_bg)}>
                {section.feature3_bg && (
                   <div className="absolute inset-0 z-0 bg-black">
                     <img src={section.feature3_bg} alt="" className="w-full h-full object-cover opacity-60" />
                     <div className="absolute inset-0 bg-black/40"></div>
                   </div>
                )}
                <div className="relative z-10 flex flex-col items-center justify-start h-full w-full p-3 md:p-8 text-center">
                  {section.feature3_title && <h4 className={`text-[10px] md:text-xl font-bold uppercase tracking-wider mb-2 md:mb-4 ${plainTextStyles} ${getFontClass(section.font_family)}`}>{section.feature3_title}</h4>}
                  {section.feature3_text && <p className={`text-[8px] md:text-sm opacity-80 font-sans leading-relaxed ${plainTextStyles}`}>{section.feature3_text || 'Custom project configurations.'}</p>}
                  {section.btn3_enabled && (
                    <div className="mt-auto pt-4 md:pt-8 w-full flex justify-center">
                       <button onClick={() => handleButtonClick(section.btn3_link)} className={getButtonClasses(3)}>{section.btn3_text}</button>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      );

    case 'promo_banner':
    case 'rich_text':
    default: {
      const hasInlineImage = !!section.inline_image_url;
      const forceCenter = !hasInlineImage || section.inline_image_position === 'center';

      return (
        <div className={containerClass} style={{ ...borderStyles, ...containerStyle }}>
          {renderBackgroundLayer()}
          <div className="relative z-20 p-6 md:p-20 space-y-4 md:space-y-6">
            
            <div className="text-center">
              {section.tagline && <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black block mb-2 md:mb-3 drop-shadow-md ${plainTextStyles}`}>{section.tagline}</span>}
              <TitleTag className={`text-2xl md:text-4xl ${titleStyles}`}>{section.title}</TitleTag>
            </div>

            <div className={`flex items-center justify-center gap-4 md:gap-10 p-4 md:p-8 rounded-xl max-w-5xl mx-auto ${useOverlay && !noBackground ? 'bg-black/40 backdrop-blur-md shadow-lg border border-white/5' : ''} ${forceCenter ? 'flex-col' : (section.inline_image_position === 'left' ? 'flex-row-reverse' : 'flex-row')}`}>
              <div className={`flex-1 ${forceCenter ? 'text-center' : 'text-left'}`}>
                <p className={`text-[10px] md:text-base opacity-90 leading-relaxed ${plainTextStyles}`}>{section.description}</p>
                
                <div className={`flex flex-wrap gap-2 md:gap-4 pt-4 md:pt-8 w-full ${forceCenter ? 'justify-center' : 'justify-start'}`}>
                  {section.btn1_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn1_link)} className={getButtonClasses(1)}>{section.btn1_text}</button></div>}
                  {section.btn2_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn2_link)} className={getButtonClasses(2)}>{section.btn2_text}</button></div>}
                  {section.btn3_enabled && <div className="w-full sm:w-auto"><button onClick={() => handleButtonClick(section.btn3_link)} className={getButtonClasses(3)}>{section.btn3_text}</button></div>}
                </div>
              </div>
              
              {!forceCenter && (
                <div className="flex-shrink-0 w-1/3 md:w-auto flex justify-center">
                  {renderInlineImage()}
                </div>
              )}
            </div>

            {hasInlineImage && forceCenter && (
              <div className="flex justify-center w-full mt-4 md:mt-8">
                {renderInlineImage()}
              </div>
            )}

          </div>
        </div>
      );
    }
  }
}
