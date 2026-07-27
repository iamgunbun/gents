import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import HomeView from './components/HomeView';
import CollectionView from './components/CollectionView';
import ContactView from './components/ContactView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';
import Footer from './components/Footer';
import AgeVerification from './components/AgeVerification';

export default function App() {
  // Rename the raw state setter so we can wrap it with history tracking
  const [currentPage, _setCurrentPage] = useState('Home');
  const [inventory, setInventory] = useState([]);
  const [homeSections, setHomeSections] = useState([]);
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteItem, setQuoteItem] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', description: '', price: '', category: 'Rifles', status: 'In Stock', quantity: 1 });

  // Wrapper function to sync React state with browser history
  const setCurrentPage = (page) => {
    _setCurrentPage(page);
    if (page !== currentPage) {
      const urlPath = page === 'Home' ? '/' : `/${page.toLowerCase().replace(/\s+/g, '-')}`;
      window.history.pushState({ page }, '', urlPath);
    }
  };

  async function fetchData() {
    const { data: inv } = await supabase.from('inventory').select('*');
    const { data: sections } = await supabase.from('homepage_sections').select('*').order('sort_order');
    setInventory(inv || []);
    setHomeSections(sections || []);
  }

  useEffect(() => {
    fetchData();
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'PASSWORD_RECOVERY') {
        setAuthMode('update');
        setCurrentPage('Admin');
      }
    });

    // Listen for the browser's back/forward buttons
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        _setCurrentPage(event.state.page);
      } else {
        _setCurrentPage('Home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set the initial history state if it doesn't exist on first load
    if (!window.history.state) {
      window.history.replaceState({ page: 'Home' }, '', '/');
    }

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const baseTitle = "The Gentlemen Artists Armoury | Custom Engraved Firearms in East Texas";
    const baseDesc = "Premium custom firearm engraving in East Texas. We specialize in deep-relief scrolls, custom motifs, and bespoke laser stippling on rifles, handguns, and accessories.";
    
    let pageTitle = baseTitle;
    let pageDesc = baseDesc;
    let schemaMarkup = null;

    if (currentPage === 'ProductDetail' && selectedProduct) {
      pageTitle = `${selectedProduct.title} | Custom ${selectedProduct.category} | Armoury`;
      pageDesc = selectedProduct.description ? selectedProduct.description.substring(0, 155) + '...' : baseDesc;
      
      schemaMarkup = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": selectedProduct.title,
        "image": selectedProduct.image_url ? [selectedProduct.image_url] : [],
        "description": selectedProduct.description,
        "sku": selectedProduct.sku || "",
        "brand": {
          "@type": "Brand",
          "name": "The Gentlemen Artists Armoury"
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "USD",
          "price": selectedProduct.price || "0.00",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": selectedProduct.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      };
    } else if (['Rifles', 'Handguns', 'Accessories', 'Gallery'].includes(currentPage)) {
      pageTitle = `Custom Engraved ${currentPage} | The Gentlemen Artists Armoury`;
      pageDesc = `Browse our exclusive collection of custom engraved ${currentPage.toLowerCase()}. Designed and localized in East Texas.`;
    } else if (currentPage === 'Contact') {
      pageTitle = "Contact Us | Request a Quote | The Gentlemen Artists Armoury";
    } else if (currentPage === 'Home') {
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "The Gentlemen Artists Armoury",
        "image": `${window.location.origin}/Sticker.png`,
        "telephone": "903-368-2340",
        "email": "Thegentlemenartistsarmoury@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "East Texas",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "priceRange": "$$$"
      };
    }

    document.title = pageTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDesc;

    let scriptSchema = document.querySelector('#seo-schema');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'seo-schema';
      scriptSchema.type = 'application/ld+json';
      document.head.appendChild(scriptSchema);
    }
    scriptSchema.textContent = schemaMarkup ? JSON.stringify(schemaMarkup) : '';
  }, [currentPage, selectedProduct]);

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this item from the inventory?");
    if (!confirmDelete) return;
    const { error } = await supabase.from('inventory').delete().eq('id', id);
    if (!error) fetchData();
  };

  const globalConfig = homeSections.find(s => s.layout_type === 'global_config') || {
    btn_color: 'brand-gold', btn_style: 'solid', btn_radius: 'rounded-md', btn_hover_anim: 'lift', btn_font: 'sans'
  };

  // EXTENDED GLOBAL BUTTON COLOR HANDLING
  const getGlobalBtnClass = () => {
    const color = globalConfig.btn_color || 'brand-gold';
    const style = globalConfig.btn_style || 'solid';
    const radius = globalConfig.btn_radius === 'square' ? 'rounded-none' : (globalConfig.btn_radius === 'pill' ? 'rounded-full' : 'rounded-lg');
    const hoverAnim = globalConfig.btn_hover_anim === 'lift' ? 'hover:-translate-y-1 hover:shadow-lg' : 'hover:opacity-80';
    const font = globalConfig.btn_font === 'serif' ? 'font-serif' : (globalConfig.btn_font === 'mono' ? 'font-mono' : 'font-sans font-bold');
    
    let base = `w-full py-3 uppercase tracking-widest transition-all duration-300 text-center cursor-pointer ${radius} ${hoverAnim} ${font} `;
    
    if (style === 'solid') {
      if (color === 'brand-gold' || color === 'gold') base += 'bg-[#eebf1c] text-[#04351e] border border-[#eebf1c]';
      else if (color === 'brand-green' || color === 'emerald') base += 'bg-[#04351e] text-[#eebf1c] border border-[#04351e]';
      else if (color === 'white') base += 'bg-white text-black border border-gray-300';
      else if (color === 'red') base += 'bg-red-600 text-white border border-red-600';
      else if (color === 'blue') base += 'bg-blue-600 text-white border border-blue-600';
      else if (color === 'purple') base += 'bg-purple-700 text-white border border-purple-700';
      else if (color === 'silver') base += 'bg-gray-400 text-black border border-gray-400';
      else base += 'bg-black text-white border border-black';
    } else {
      if (color === 'brand-gold' || color === 'gold') base += 'border-2 border-[#eebf1c] text-[#eebf1c] hover:bg-[#eebf1c] hover:text-[#04351e]';
      else if (color === 'brand-green' || color === 'emerald') base += 'border-2 border-[#04351e] text-[#04351e] hover:bg-[#04351e] hover:text-white';
      else if (color === 'white') base += 'border-2 border-white text-gray-700 hover:bg-white hover:text-black';
      else if (color === 'red') base += 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white';
      else if (color === 'blue') base += 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      else if (color === 'purple') base += 'border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white';
      else if (color === 'silver') base += 'border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-black';
      else base += 'border-2 border-black text-black hover:bg-black hover:text-white';
    }
    return base;
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    setCurrentPage('ProductDetail');
  };

  const handleAddToCart = (configuredItem) => {
    setCart(prev => [...prev, configuredItem]);
    setCurrentPage('Cart');
  };

  const handleRequestQuote = (item) => {
    setQuoteItem(item);
    setCurrentPage('Contact');
  };

  const handleClosePortal = async () => {
    await supabase.auth.signOut();
    setAuthMode('login'); 
    setCurrentPage('Home');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AgeVerification />
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        inventory={inventory} 
        cartCount={cart.length} 
        onSelectProduct={handleSelectProduct}
      />
      
      <main className="flex-grow w-full">
        {currentPage === 'Home' && (
          <HomeView 
            homeSections={homeSections} 
            inventory={inventory} 
            setPage={setCurrentPage} 
            globalBtnClass={getGlobalBtnClass()} 
            onSelectProduct={handleSelectProduct}
          />
        )}
        
        {currentPage === 'Contact' && <ContactView globalBtnClass={getGlobalBtnClass()} quoteItem={quoteItem} />}
        
        {['Rifles', 'Handguns', 'Accessories', 'Gallery'].includes(currentPage) && (
           <CollectionView 
             category={currentPage} 
             items={inventory.filter(i => i.category === currentPage)} 
             globalBtnClass={getGlobalBtnClass()} 
             onSelectProduct={handleSelectProduct} 
             goToContact={() => setCurrentPage('Contact')}
           />
        )}

        {currentPage === 'ProductDetail' && selectedProduct && (
          <ProductDetailView 
            product={selectedProduct} 
            inventory={inventory} 
            onSelectProduct={handleSelectProduct}
            globalBtnClass={getGlobalBtnClass()} 
            onAddToCart={handleAddToCart}
            goBack={() => setCurrentPage(selectedProduct.category || 'Home')}
          />
        )}

        {currentPage === 'Cart' && (
          <CartView 
            cart={cart} 
            setCart={setCart} 
            globalBtnClass={getGlobalBtnClass()} 
            continueShopping={() => setCurrentPage('Home')}
            refreshInventory={fetchData} 
          />
        )}
        
        {currentPage === 'Admin' && (
          !session ? (
            <AdminAuth globalBtnClass={getGlobalBtnClass()} initialMode={authMode} onUpdateSuccess={() => setAuthMode('login')} />
          ) : authMode === 'update' ? (
            <AdminAuth globalBtnClass={getGlobalBtnClass()} initialMode="update" onUpdateSuccess={() => setAuthMode('login')} />
          ) : (
            <AdminDashboard 
              inventory={inventory} 
              homeSections={homeSections} 
              fetchInventory={fetchData} 
              refreshHomeConfig={fetchData}
              handleLogout={handleClosePortal}
              newItem={newItem}
              setNewItem={setNewItem}
              handleDeleteItem={handleDeleteItem}
            />
          )
        )}
      </main>
      
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} hasSession={!!session} />
    </div>
  );
}
