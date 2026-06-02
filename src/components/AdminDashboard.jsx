import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// --- COMPREHENSIVE OPERATOR'S GUIDE ---
function AdminGuide({ activeTab }) {
  return (
    <div className="bg-[#f9f7f2] border border-[#eebf1c]/40 rounded-2xl p-6 shadow-lg h-full max-h-[85vh] overflow-y-auto scrollbar-hide sticky top-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b border-[#eebf1c]/30 pb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#04351e]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <div>
          <h3 className="font-serif text-lg font-bold uppercase tracking-widest text-[#04351e]">Operator's Guide</h3>
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">System Operations Manual</p>
        </div>
      </div>

      <div className="space-y-6 text-xs text-gray-700 leading-relaxed font-sans pb-10">
        
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-in">
            <p>Welcome to the <strong>Live Quote Queue</strong>. This logs all incoming custom requests.</p>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Filter Views</h4>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Active:</strong> New orders requiring quote finalization.</li>
                <li><strong>Completed:</strong> Orders that have been processed/paid.</li>
                <li><strong>Cancelled:</strong> Voided orders.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Managing Orders</h4>
              <p className="mt-2">Click any order row to open the detailed invoice. This displays customer contact info, FFL data, selected options, and specific engraving notes.</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-3 rounded mt-4">
              <h4 className="font-bold text-red-800 uppercase tracking-wider mb-1 text-[10px]">Cancelling & Restocking</h4>
              <p className="text-red-700">Clicking <strong>Cancel & Restock</strong> voids the order and automatically calculates the quantities of the items inside it, adding them directly back into your Store Inventory.</p>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4 animate-fade-in">
            <p>The <strong>Store Inventory</strong> tab dictates what products are available for customers to view and configure.</p>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Pricing & Stock</h4>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Max Price:</strong> Entering a max price automatically changes the display to a range (e.g., "$100 - $150").</li>
                <li><strong>Stock Count:</strong> Monitored live. If it hits 0, the site displays "Out of Stock" and disables the Add to Cart button.</li>
                <li><strong>Dropdowns:</strong> Comma-separate options (e.g., "9mm, .45 ACP") to generate a selection menu.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Special Toggles</h4>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>FFL Requirement:</strong> Forces customers to type their FFL dealer info before they can submit the order.</li>
                <li><strong>Special Instructions:</strong> Adds a text box for custom engraving notes.</li>
                <li><strong>Limited Run:</strong> Adds a red alert banner. Adding an End Date generates a visual deadline for orders.</li>
              </ul>
            </div>
            <div className="bg-[#eebf1c]/10 border border-[#eebf1c]/30 p-3 rounded mt-2">
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px]">Media Deck</h4>
              <p>Upload up to 6 images. The <strong>MAIN</strong> image is the thumbnail. The others create a swipeable carousel on the product details page.</p>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-4 animate-fade-in">
            <p>The <strong>Gallery Manager</strong> is a fast-upload portfolio. It is strictly for showcasing your past custom work.</p>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">How it works</h4>
              <p className="mt-2">Gallery items bypass all store logic. They do not require pricing, SKUs, or inventory counts. Provide an image and a title, and click publish.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Website Display</h4>
              <p className="mt-2">Images uploaded here automatically format themselves into the masonry grid on the <strong>Gallery</strong> page. If the "Armoury Gallery" section is active on your Homepage, these images will feed the scrolling marquee.</p>
            </div>
          </div>
        )}

        {activeTab === 'global' && (
          <div className="space-y-4 animate-fade-in">
            <p>The <strong>Global Settings</strong> tab controls the overarching aesthetic of your automated UI elements.</p>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">What does this affect?</h4>
              <p className="mt-2">Any button that the system generates automatically—such as "Select Options" in the store, "Add to Cart" on a product page, or "Request a Quote" in the gallery—will inherit the styles you set here.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Customization</h4>
              <p className="mt-2">This allows you to change the base color, shape, font, and hover animations of your core store elements instantly without manually editing every product.</p>
            </div>
          </div>
        )}

        {activeTab === 'homepage' && (
          <div className="space-y-4 animate-fade-in">
            <p>The <strong>Homepage CMS</strong> is your modular website builder. You construct the page by stacking blocks. Use the <strong>Up (↑)</strong> and <strong>Down (↓)</strong> arrows to reorder them live.</p>
            
            <div className="bg-white border-2 border-[#eebf1c]/50 p-4 rounded-xl shadow-md">
              <h4 className="font-black text-[#04351e] uppercase tracking-widest mb-3 text-[11px] border-b border-[#eebf1c]/30 pb-2">Block Types & Best Uses</h4>
              <ul className="space-y-3">
                <li><strong className="block text-[#04351e]">1. Headline Billboard Hero</strong> The massive, full-screen top section. Use this exactly once at the very top of your page to grab attention immediately.</li>
                <li><strong className="block text-[#04351e]">2. Text & Featured Image Accent</strong> The workhorse of the site. A side-by-side layout perfect for explaining services, highlighting a specific product, or telling your brand story.</li>
                <li><strong className="block text-[#04351e]">3. Full-Width Highlight Stripe</strong> A thin, wide banner. Great for promotions, announcements, or a strong call-to-action (like "Contact us for a quote today!").</li>
                <li><strong className="block text-[#04351e]">4. Centered Paragraph Anchor</strong> A clean, text-focused block sitting in the middle of the screen. Best used for mission statements, long-form explanations, or SEO-heavy introductory text.</li>
                <li><strong className="block text-[#04351e]">5. Multi-Feature Column Grid</strong> Displays 3 equal columns side-by-side. Excellent for breaking down your 3 main services (Rifles, Handguns, Accessories) or 3 core promises (Quality, Speed, Heritage).</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Block Options & Layout</h4>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Attach to Previous:</strong> Removes the top padding of the block, fusing it seamlessly to the section above it.</li>
                <li><strong>Disable Background:</strong> Makes the entire block transparent, revealing the website's base color.</li>
                <li><strong>Layout Style:</strong> Choose <em>Flat</em> for a standard block, <em>Bubbled</em> for a rounded floating card, <em>Elevated</em> for drop shadows, or <em>Glass</em> for a frosted glass aesthetic.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Buttons</h4>
              <p className="mt-2">Standard sections support up to <strong>2 separate buttons</strong> per block. (The Multi-Feature Grid supports 3 buttons, mapped to their specific columns). Ensure you write the destination link carefully (e.g., <code>/contact</code> for internal pages, or <code>https://google.com</code> for external).</p>
            </div>

            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Background Atmosphere</h4>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Darkness Overlay:</strong> A percentage slider. Higher numbers make the background image darker so your text is easier to read.</li>
                <li><strong>Parallax Effect:</strong> Freezes the background image in place so the page scrolls <em>over</em> it.</li>
                <li><strong>Media Deck:</strong> Upload a single image for a static background, a video (.mp4) for a moving background, or multiple images to create a slideshow.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#04351e] uppercase tracking-wider mb-1 text-[10px] border-b border-gray-200 pb-1">Featured / Inline Image</h4>
              <p className="mt-2 mb-1">This allows you to place an image <em>next</em> to your text, rather than behind it.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Position:</strong> Force the image to sit to the Left, Right, or Centered underneath the text.</li>
                <li><strong>Backplate Style:</strong> Wraps the image in a stylish container to make it pop.</li>
              </ul>
            </div>

            <div className="bg-[#04351e] text-[#eebf1c] p-3 rounded mt-4 text-[10px] text-center border border-[#eebf1c]/50">
              <span className="font-bold uppercase tracking-widest block mb-1">Important</span>
              You must click the "Commit All Changes" button at the bottom of the editor to push your updates live!
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
// --------------------------------------------------------

export default function AdminDashboard({ 
  handleLogout, newItem, setNewItem, inventory, handleDeleteItem, fetchInventory,
  homeSections, refreshHomeConfig 
}) {
  
  const [activeTab, setActiveTab] = useState('inventory'); 
  const [inventoryFilter, setInventoryFilter] = useState('All');
  
  const [editingItem, setEditingItem] = useState(null);
  const [itemGalleryFiles, setItemGalleryFiles] = useState([]); 
  const [updatingRecord, setUpdatingRecord] = useState(false);

  const [editingSection, setEditingSection] = useState(null);
  const [sectionBgFiles, setSectionBgFiles] = useState([]); 
  const [sectionInlineFile, setSectionInlineFile] = useState(null);
  
  const [feature1BgFile, setFeature1BgFile] = useState(null);
  const [feature2BgFile, setFeature2BgFile] = useState(null);
  const [feature3BgFile, setFeature3BgFile] = useState(null);
  
  const [savingSection, setSavingSection] = useState(false);
  const [newSectionType, setNewSectionType] = useState('hero_banner');

  const [newGalleryFiles, setNewGalleryFiles] = useState([]); 
  const [creatingRecord, setCreatingRecord] = useState(false);
  
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '' });
  const [galleryUploadFiles, setGalleryUploadFiles] = useState([]);

  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('Active');

  const cleanInventory = inventory || [];
  const cleanHomeSections = homeSections || [];
  const globalConfigRecord = cleanHomeSections.find(s => s.layout_type === 'global_config') || {};

  const storeInventory = cleanInventory.filter(item => item.category !== 'Gallery');
  const galleryInventory = cleanInventory.filter(item => item.category === 'Gallery');
  const filteredInventory = inventoryFilter === 'All' ? storeInventory : storeInventory.filter(item => item.category === inventoryFilter);

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'All') return true;
    if (orderFilter === 'Active') return o.status === 'Pending';
    return o.status === orderFilter;
  });

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  async function fetchOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) setOrders(data);
  }

  async function handleCancelOrder(order, e) {
    e.stopPropagation(); 
    if (!window.confirm("Cancel this order? This will restock all associated items to the inventory vault.")) return;

    for (const item of order.items) {
       const { data } = await supabase.from('inventory').select('quantity').eq('id', item.id).single();
       if (data) {
          await supabase.from('inventory').update({ quantity: data.quantity + item.cart_quantity }).eq('id', item.id);
       }
    }

    await supabase.from('orders').update({ status: 'Cancelled' }).eq('id', order.id);
    setSelectedOrder(null);
    fetchOrders();
    if (fetchInventory) fetchInventory();
    showToast("Order Cancelled and Items Restocked.");
  }

  async function handleCompleteOrder(order, e) {
    e.stopPropagation();
    await supabase.from('orders').update({ status: 'Completed' }).eq('id', order.id);
    setSelectedOrder(null);
    fetchOrders();
    showToast("Order Marked as Completed.");
  }

  useEffect(() => {
    if (!editingSection || !editingSection.id) return;
    const timer = setTimeout(() => {
      autoSaveCMS(editingSection);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [editingSection]);

  async function autoSaveCMS(sectionToSave) {
    try {
      if (sectionToSave.layout_type === 'global_config') {
        await supabase.from('homepage_sections').update({
          btn_color: sectionToSave.btn_color || 'brand-gold',
          btn_style: sectionToSave.btn_style || 'solid',
          btn_radius: sectionToSave.btn_radius || 'rounded-md',
          btn_hover_anim: sectionToSave.btn_hover_anim || 'lift',
          btn_font: sectionToSave.btn_font || 'sans'
        }).eq('id', sectionToSave.id);
      } else {
        const safePayload = {
          title: sectionToSave.title || '',
          tagline: sectionToSave.tagline || '',
          description: sectionToSave.description || '',
          inline_image_position: sectionToSave.inline_image_position || 'right',
          
          btn1_enabled: sectionToSave.btn1_enabled || false,
          btn1_text: sectionToSave.btn1_text || '',
          btn1_link: sectionToSave.btn1_link || '',
          btn_color: sectionToSave.btn_color || 'brand-gold',
          btn_style: sectionToSave.btn_style || 'solid',
          btn_font: sectionToSave.btn_font || 'sans',
          btn_radius: sectionToSave.btn_radius || 'rounded-lg',
          btn_hover_anim: sectionToSave.btn_hover_anim || 'lift',
          
          btn2_enabled: sectionToSave.btn2_enabled || false,
          btn2_text: sectionToSave.btn2_text || '',
          btn2_link: sectionToSave.btn2_link || '',
          btn2_color: sectionToSave.btn2_color || 'brand-gold',
          btn2_style: sectionToSave.btn2_style || 'outline',
          btn2_font: sectionToSave.btn2_font || 'sans',
          btn2_radius: sectionToSave.btn2_radius || 'rounded-lg',
          btn2_hover_anim: sectionToSave.btn2_hover_anim || 'lift',
          
          btn3_enabled: sectionToSave.btn3_enabled || false,
          btn3_text: sectionToSave.btn3_text || '',
          btn3_link: sectionToSave.btn3_link || '',
          btn3_color: sectionToSave.btn3_color || 'brand-gold',
          btn3_style: sectionToSave.btn3_style || 'solid',
          btn3_font: sectionToSave.btn3_font || 'sans',
          btn3_radius: sectionToSave.btn3_radius || 'rounded-lg',
          btn3_hover_anim: sectionToSave.btn3_hover_anim || 'lift',

          f1_btn_enabled: sectionToSave.f1_btn_enabled || false,
          f1_btn_text: sectionToSave.f1_btn_text || '',
          f1_btn_link: sectionToSave.f1_btn_link || '',
          f2_btn_enabled: sectionToSave.f2_btn_enabled || false,
          f2_btn_text: sectionToSave.f2_btn_text || '',
          f2_btn_link: sectionToSave.f2_btn_link || '',
          f3_btn_enabled: sectionToSave.f3_btn_enabled || false,
          f3_btn_text: sectionToSave.f3_btn_text || '',
          f3_btn_link: sectionToSave.f3_btn_link || '',

          font_family: sectionToSave.font_family || 'serif',
          text_color: sectionToSave.text_color || 'brand-gold',
          text_effect: sectionToSave.text_effect || 'none',
          bg_color: sectionToSave.bg_color || '#000000',
          bg_overlay_opacity: !isNaN(parseInt(sectionToSave.bg_overlay_opacity)) ? parseInt(sectionToSave.bg_overlay_opacity) : 60,
          bg_parallax: sectionToSave.bg_parallax || false,
          inline_bg_style: sectionToSave.inline_bg_style || 'transparent',
          connect_to_previous: sectionToSave.connect_to_previous || false,
          bg_none: sectionToSave.bg_none || false,
          feature1_title: sectionToSave.feature1_title || '',
          feature1_text: sectionToSave.feature1_text || '',
          feature2_title: sectionToSave.feature2_title || '',
          feature2_text: sectionToSave.feature2_text || '',
          feature3_title: sectionToSave.feature3_title || '',
          feature3_text: sectionToSave.feature3_text || '',
          bg_opacity_enabled: sectionToSave.bg_opacity_enabled !== false,
          border_enabled: sectionToSave.border_enabled || false,
          border_size: sectionToSave.border_size || '2px',
          border_color: sectionToSave.border_color || 'brand-gold',
          border_effect: sectionToSave.border_effect || 'solid',
          section_style: sectionToSave.section_style || 'flat'
        };
        await supabase.from('homepage_sections').update(safePayload).eq('id', sectionToSave.id);
      }
      if (refreshHomeConfig) refreshHomeConfig();
    } catch (err) {
      console.error("AutoSave Error:", err);
    }
  }

  const handleNewItemChange = (field, value) => setNewItem(prev => ({ ...prev, [field]: value }));
  const handleEditItemChange = (field, value) => setEditingItem(prev => ({ ...prev, [field]: value }));
  const handleEditSectionChange = (field, value) => setEditingSection(prev => ({ ...prev, [field]: value }));

  const handleStartItemConfig = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSectionConfig = (section) => {
    setEditingSection(section);
    setFeature1BgFile(null);
    setFeature2BgFile(null);
    setFeature3BgFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoveSection = async (index, direction) => {
    const newArr = [...cleanHomeSections.filter(s => s.layout_type !== 'global_config')];
    if (direction === 'up' && index > 0) {
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    } else if (direction === 'down' && index < newArr.length - 1) {
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    } else { return; }
    
    for (let i = 0; i < newArr.length; i++) {
      await supabase.from('homepage_sections').update({ sort_order: i + 1 }).eq('id', newArr[i].id);
    }
    if (refreshHomeConfig) refreshHomeConfig();
  };

  async function uploadSingleFile(file) {
    if (!file) return '';
    const fileExt = file.name.split('.').pop();
    const fileName = `vault_asset_${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from('inventory-images').upload(fileName, file);
    if (error) { 
      showToast(`Image Upload Error: ${error.message}`, 'error'); 
      return ''; 
    }
    return supabase.storage.from('inventory-images').getPublicUrl(fileName).data.publicUrl;
  }

  async function uploadMultipleFiles(fileList) {
    const urls = [];
    if (!fileList || fileList.length === 0) return urls;
    for (let i = 0; i < fileList.length; i++) {
      const fileObj = fileList[i].file || fileList[i];
      if (fileObj) {
        const url = await uploadSingleFile(fileObj);
        if (url) urls.push(url);
      }
    }
    return urls;
  }

  async function handleDeleteSection(sectionId) {
    if (!window.confirm("Are you sure you want to permanently delete this homepage section block?")) return;
    const { error } = await supabase.from('homepage_sections').delete().eq('id', sectionId);
    if (error) showToast(`Delete Failed: ${error.message}`, 'error');
    else if (refreshHomeConfig) refreshHomeConfig();
  }

  async function handleCreateSection(e) {
    e.preventDefault();
    const { error } = await supabase.from('homepage_sections').insert([{
      layout_type: newSectionType, title: 'New Layout Block', description: 'Enter description text...', sort_order: cleanHomeSections.length + 1, is_enabled: true, bg_images: [],
      font_family: 'serif', text_color: 'brand-gold', text_effect: 'none', bg_opacity_enabled: true,
      btn_color: 'brand-gold', btn_style: 'solid', btn_font: 'sans', btn_hover_anim: 'lift', btn_radius: 'rounded-lg',
      btn2_color: 'brand-gold', btn2_style: 'outline', btn2_font: 'sans', btn2_hover_anim: 'lift', btn2_radius: 'rounded-lg',
      btn3_color: 'brand-gold', btn3_style: 'outline', btn3_font: 'sans', btn3_hover_anim: 'lift', btn3_radius: 'rounded-lg',
      bg_color: '#000000', bg_overlay_opacity: 60, bg_parallax: false, bg_none: false,
      inline_bg_style: 'transparent', connect_to_previous: false,
      border_enabled: false, border_size: '2px', border_color: 'brand-gold', border_effect: 'solid', section_style: 'flat'
    }]);
    
    if (error) showToast(`Creation Failed: ${error.message}`, 'error');
    else if (refreshHomeConfig) refreshHomeConfig();
  }

  const handleBgFileSelection = (e) => {
    if (!e.target.files) return;
    const chosen = Array.from(e.target.files).map(file => ({ id: Math.random().toString(), file: file, previewUrl: URL.createObjectURL(file) }));
    setSectionBgFiles(prev => [...prev, ...chosen].slice(0, 6)); 
  };
  const handleItemGallerySelection = (e) => {
    if (!e.target.files) return;
    const chosen = Array.from(e.target.files).map(file => ({ id: Math.random().toString(), file: file, previewUrl: URL.createObjectURL(file) }));
    setItemGalleryFiles(prev => [...prev, ...chosen].slice(0, 6));
  };
  const handleNewItemGallerySelection = (e) => {
    if (!e.target.files) return;
    const chosen = Array.from(e.target.files).map(file => ({ id: Math.random().toString(), file: file, previewUrl: URL.createObjectURL(file) }));
    setNewGalleryFiles(prev => [...prev, ...chosen].slice(0, 6));
  };
  const handleIsolatedGallerySelection = (e) => {
    if (!e.target.files) return;
    const chosen = Array.from(e.target.files).map(file => ({ id: Math.random().toString(), file: file, previewUrl: URL.createObjectURL(file) }));
    setGalleryUploadFiles(prev => [...prev, ...chosen].slice(0, 6));
  };

  const promoteStagedBgToMain = (idx) => {
    const targetArray = [...sectionBgFiles];
    const item = targetArray.splice(idx, 1)[0];
    targetArray.unshift(item);
    setSectionBgFiles(targetArray);
  };
  const promoteStagedItemImgToMain = (idx) => {
    const targetArray = [...itemGalleryFiles];
    const item = targetArray.splice(idx, 1)[0];
    targetArray.unshift(item);
    setItemGalleryFiles(targetArray);
  };
  const promoteNewStagedToMain = (idx) => {
    const targetArray = [...newGalleryFiles];
    const item = targetArray.splice(idx, 1)[0];
    targetArray.unshift(item);
    setNewGalleryFiles(targetArray);
  };
  const promoteExistingBgToMain = (idx) => {
    if (!editingSection || !editingSection.bg_images) return;
    const reordered = [...editingSection.bg_images];
    const target = reordered.splice(idx, 1)[0];
    reordered.unshift(target);
    setEditingSection({ ...editingSection, bg_images: reordered, bg_image_url: reordered[0] || '' });
  };
  const promoteExistingItemImgToMain = (idx) => {
    if (!editingItem || !editingItem.alt_images) return;
    const currentMain = editingItem.image_url;
    const targetGallery = [...editingItem.alt_images];
    const selectedNewMain = targetGallery.splice(idx, 1)[0];
    if (currentMain) targetGallery.unshift(currentMain);
    setEditingItem({ ...editingItem, image_url: selectedNewMain, alt_images: targetGallery });
  };
  const clearExistingBgImage = (idx) => {
    if (!editingSection || !editingSection.bg_images) return;
    const filtered = editingSection.bg_images.filter((_, i) => i !== idx);
    setEditingSection({ ...editingSection, bg_images: filtered, bg_image_url: filtered[0] || '' });
  };
  const clearExistingItemImage = (idx) => {
    if (!editingItem) return;
    const currentGallery = editingItem.alt_images || [];
    const filtered = currentGallery.filter((_, i) => i !== idx);
    setEditingItem({ ...editingItem, alt_images: filtered });
  };

  const clearStagedBgImage = (id) => setSectionBgFiles(prev => prev.filter(item => item.id !== id));
  const clearStagedItemFile = (id) => setItemGalleryFiles(prev => prev.filter(item => item.id !== id));
  const clearNewStagedItemFile = (id) => setNewGalleryFiles(prev => prev.filter(item => item.id !== id));
  const clearIsolatedGalleryFile = (id) => setGalleryUploadFiles(prev => prev.filter(item => item.id !== id));

  async function handleSaveGlobalConfig(e) {
    e.preventDefault();
    setSavingSection(true);
    const existing = cleanHomeSections.find(s => s.layout_type === 'global_config');
    
    if (existing) {
       const { data, error } = await supabase.from('homepage_sections').update({
         btn_color: editingSection.btn_color, btn_style: editingSection.btn_style,
         btn_radius: editingSection.btn_radius, btn_hover_anim: editingSection.btn_hover_anim, btn_font: editingSection.btn_font
       }).eq('id', existing.id).select();

       if(error) showToast(`Error saving: ${error.message}`, 'error');
       else showToast('Global Settings Applied Successfully!');
    } else {
       const { error } = await supabase.from('homepage_sections').insert([{
         layout_type: 'global_config', title: 'GLOBAL_STORE_SETTINGS', is_enabled: false, sort_order: 999,
         btn_color: editingSection?.btn_color || 'brand-gold', btn_style: editingSection?.btn_style || 'solid',
         btn_radius: editingSection?.btn_radius || 'rounded-md', btn_hover_anim: editingSection?.btn_hover_anim || 'lift',
         btn_font: editingSection?.btn_font || 'sans'
       }]);
       if(error) showToast(`Error creating: ${error.message}`, 'error');
       else showToast('Global Settings Created Successfully!');
    }
    if (refreshHomeConfig) refreshHomeConfig();
    setSavingSection(false);
  }

  async function handleCreateIsolatedGalleryItem(e) {
    e.preventDefault();
    if (galleryUploadFiles.length === 0) { showToast("Please attach an image to publish to the gallery.", 'error'); return; }
    setCreatingRecord(true);
    const uploadedUrls = await uploadMultipleFiles(galleryUploadFiles);
    const primaryUrl = uploadedUrls[0] || '';
    const { error } = await supabase.from('inventory').insert([{
      title: newGalleryItem.title || 'Gallery Feature', category: 'Gallery', status: 'In Stock',
      image_url: primaryUrl, alt_images: uploadedUrls.slice(1), quantity: 1, price: 0, description: 'Gallery Showcase Item',
      requires_ffl: false, allow_special_instructions: false, is_limited_edition: false
    }]);
    if (!error) {
      setGalleryUploadFiles([]); setNewGalleryItem({ title: '' });
      if (fetchInventory) fetchInventory();
      showToast("Added to Gallery Successfully!");
    } else { showToast(`Error Uploading to Gallery: ${error.message}`, 'error'); }
    setCreatingRecord(false);
  }

  async function handleCreateNewItemWithShowcase(e) {
    e.preventDefault();
    if (newGalleryFiles.length === 0) { showToast("Please choose at least one product asset file.", 'error'); return; }
    setCreatingRecord(true);
    const uploadedUrls = await uploadMultipleFiles(newGalleryFiles);
    const primaryUrl = uploadedUrls[0] || '';
    const secondaryUrls = uploadedUrls.slice(1);
    const { error } = await supabase.from('inventory').insert([{
      title: newItem.title, description: newItem.description,
      price: newItem.price ? parseFloat(newItem.price) : null,
      price_max: newItem.price_max ? parseFloat(newItem.price_max) : null,
      sku: newItem.sku, category: newItem.category || 'Rifles',
      status: newItem.status || 'In Stock', quantity: parseInt(newItem.quantity) || 1,
      dropdown_label: newItem.dropdown_label, dropdown_options: newItem.dropdown_options,
      requires_ffl: newItem.requires_ffl || false, allow_special_instructions: newItem.allow_special_instructions || false,
      tab_specs: newItem.tab_specs, tab_process: newItem.tab_process, tab_shipping: newItem.tab_shipping,
      is_limited_edition: newItem.is_limited_edition || false,
      limited_time_start: newItem.is_limited_edition && newItem.limited_time_start ? newItem.limited_time_start : null,
      limited_time_end: newItem.is_limited_edition && newItem.limited_time_end ? newItem.limited_time_end : null,
      image_url: primaryUrl, alt_images: secondaryUrls
    }]);
    if (!error) {
      setNewGalleryFiles([]); 
      setNewItem({ title: '', description: '', price: '', category: 'Rifles', status: 'In Stock', quantity: 1, is_limited_edition: false, limited_time_start: '', limited_time_end: '' });
      if (fetchInventory) fetchInventory();
      showToast("Store Item Created Successfully!");
    } else { showToast(`Error Creating Item: ${error.message}`, 'error'); }
    setCreatingRecord(false);
  }

  async function handleSaveItemUpdate(e) {
    e.preventDefault();
    setUpdatingRecord(true);
    let currentMainUrl = editingItem.image_url || '';
    let accumulatedAltImages = editingItem.alt_images || [];
    if (itemGalleryFiles.length > 0) {
      const uploadedUrls = await uploadMultipleFiles(itemGalleryFiles);
      if (!currentMainUrl) {
        currentMainUrl = uploadedUrls[0] || '';
        accumulatedAltImages = [...accumulatedAltImages, ...uploadedUrls.slice(1)];
      } else {
        accumulatedAltImages = [...accumulatedAltImages, ...uploadedUrls];
      }
    }
    const { data, error } = await supabase.from('inventory').update({
      title: editingItem.title, description: editingItem.description,
      price: editingItem.price ? parseFloat(editingItem.price) : null,
      price_max: editingItem.price_max ? parseFloat(editingItem.price_max) : null,
      sku: editingItem.sku, category: editingItem.category, status: editingItem.status,
      quantity: parseInt(editingItem.quantity) || 0,
      dropdown_label: editingItem.dropdown_label, dropdown_options: editingItem.dropdown_options,
      requires_ffl: editingItem.requires_ffl || false, allow_special_instructions: editingItem.allow_special_instructions || false,
      tab_specs: editingItem.tab_specs, tab_process: editingItem.tab_process, tab_shipping: editingItem.tab_shipping,
      is_limited_edition: editingItem.is_limited_edition || false,
      limited_time_start: editingItem.is_limited_edition && editingItem.limited_time_start ? newItem.limited_time_start : null,
      limited_time_end: editingItem.is_limited_edition && editingItem.limited_time_end ? newItem.limited_time_end : null,
      image_url: currentMainUrl, alt_images: accumulatedAltImages
    }).eq('id', editingItem.id).select();

    if (error) { 
      showToast(`Error Updating Item: ${error.message}`, 'error'); 
    } else {
      setEditingItem(null); 
      setItemGalleryFiles([]); 
      if (fetchInventory) fetchInventory(); 
      showToast("Item Updated Successfully!");
    }
    setUpdatingRecord(false);
  }

  const getSectionSummary = (section) => {
    if (section.layout_type === 'feature_grid') {
      const features = [section.feature1_title, section.feature2_title, section.feature3_title].filter(Boolean).join(', ');
      return features ? `Features: ${features}` : 'Empty Feature Grid';
    }
    if (section.description && section.description.trim() !== '') {
      return section.description.length > 80 ? section.description.substring(0, 80) + '...' : section.description;
    }
    if (section.tagline && section.tagline.trim() !== '') {
      return `Tagline: ${section.tagline}`;
    }
    return 'No description or summary available.';
  };

  async function handleSaveSectionUpdate(e) {
    e.preventDefault();
    setSavingSection(true);
    
    let finalInlineUrl = editingSection.inline_image_url || '';
    let accumulatedBgImages = editingSection.bg_images || [];
    let finalF1Bg = editingSection.feature1_bg || '';
    let finalF2Bg = editingSection.feature2_bg || '';
    let finalF3Bg = editingSection.feature3_bg || '';

    if (sectionInlineFile) finalInlineUrl = await uploadSingleFile(sectionInlineFile);
    if (feature1BgFile) finalF1Bg = await uploadSingleFile(feature1BgFile);
    if (feature2BgFile) finalF2Bg = await uploadSingleFile(feature2BgFile);
    if (feature3BgFile) finalF3Bg = await uploadSingleFile(feature3BgFile);

    if (sectionBgFiles.length > 0) {
      const uploadedBgUrls = await uploadMultipleFiles(sectionBgFiles);
      const validUploads = uploadedBgUrls.filter(url => url && url.trim() !== '');
      accumulatedBgImages = [...accumulatedBgImages, ...validUploads];
    }
    const primaryBgUrl = accumulatedBgImages[0] || editingSection.bg_image_url || '';

    const payload = {
      title: editingSection.title || '',
      tagline: editingSection.tagline || '',
      description: editingSection.description || '',
      inline_image_position: editingSection.inline_image_position || 'right',
      
      btn1_enabled: editingSection.btn1_enabled || false,
      btn1_text: editingSection.btn1_text || '',
      btn1_link: editingSection.btn1_link || '',
      btn_color: editingSection.btn_color || 'brand-gold',
      btn_style: editingSection.btn_style || 'solid',
      btn_font: editingSection.btn_font || 'sans',
      btn_radius: editingSection.btn_radius || 'rounded-lg',
      btn_hover_anim: editingSection.btn_hover_anim || 'lift',
      
      btn2_enabled: editingSection.btn2_enabled || false,
      btn2_text: editingSection.btn2_text || '',
      btn2_link: editingSection.btn2_link || '',
      btn2_color: editingSection.btn2_color || 'brand-gold',
      btn2_style: editingSection.btn2_style || 'outline',
      btn2_font: editingSection.btn2_font || 'sans',
      btn2_radius: editingSection.btn2_radius || 'rounded-lg',
      btn2_hover_anim: editingSection.btn2_hover_anim || 'lift',

      btn3_enabled: editingSection.btn3_enabled || false,
      btn3_text: editingSection.btn3_text || '',
      btn3_link: editingSection.btn3_link || '',
      btn3_color: editingSection.btn3_color || 'brand-gold',
      btn3_style: editingSection.btn3_style || 'solid',
      btn3_font: editingSection.btn3_font || 'sans',
      btn3_radius: editingSection.btn3_radius || 'rounded-lg',
      btn3_hover_anim: editingSection.btn3_hover_anim || 'lift',

      f1_btn_enabled: editingSection.f1_btn_enabled || false,
      f1_btn_text: editingSection.f1_btn_text || '',
      f1_btn_link: editingSection.f1_btn_link || '',
      f2_btn_enabled: editingSection.f2_btn_enabled || false,
      f2_btn_text: editingSection.f2_btn_text || '',
      f2_btn_link: editingSection.f2_btn_link || '',
      f3_btn_enabled: editingSection.f3_btn_enabled || false,
      f3_btn_text: editingSection.f3_btn_text || '',
      f3_btn_link: editingSection.f3_btn_link || '',

      font_family: editingSection.font_family || 'serif',
      text_color: editingSection.text_color || 'brand-gold',
      text_effect: editingSection.text_effect || 'none',
      bg_color: editingSection.bg_color || '#000000',
      bg_overlay_opacity: !isNaN(parseInt(editingSection.bg_overlay_opacity)) ? parseInt(editingSection.bg_overlay_opacity) : 60,
      bg_parallax: editingSection.bg_parallax || false,
      inline_bg_style: editingSection.inline_bg_style || 'transparent',
      connect_to_previous: editingSection.connect_to_previous || false,
      bg_none: editingSection.bg_none || false,
      feature1_title: editingSection.feature1_title || '',
      feature1_text: editingSection.feature1_text || '',
      feature2_title: editingSection.feature2_title || '',
      feature2_text: editingSection.feature2_text || '',
      feature3_title: editingSection.feature3_title || '',
      feature3_text: editingSection.feature3_text || '',
      bg_opacity_enabled: editingSection.bg_opacity_enabled !== false,
      border_enabled: editingSection.border_enabled || false,
      border_size: editingSection.border_size || '2px',
      border_color: editingSection.border_color || 'brand-gold',
      border_effect: editingSection.border_effect || 'solid',
      section_style: editingSection.section_style || 'flat',
      bg_image_url: primaryBgUrl, 
      bg_images: accumulatedBgImages, 
      inline_image_url: finalInlineUrl, 
      feature1_bg: finalF1Bg, 
      feature2_bg: finalF2Bg, 
      feature3_bg: finalF3Bg
    };

    const { data, error } = await supabase.from('homepage_sections').update(payload).eq('id', editingSection.id).select();

    if (error) {
      showToast(`Save Failed: ${error.message}`, 'error');
    } else {
      setEditingSection(null); 
      setSectionBgFiles([]); 
      setSectionInlineFile(null); 
      setFeature1BgFile(null); setFeature2BgFile(null); setFeature3BgFile(null);
      if (refreshHomeConfig) refreshHomeConfig();
      showToast("Homepage Section Updated & Saved Successfully!");
    }
    setSavingSection(false);
  }

  return (
    <div className="space-y-8 text-black text-left text-xs w-full animate-fade-in p-4 max-w-[1600px] mx-auto mb-24 relative">
      
      {toast && (
        <div className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-2xl z-[200] font-bold text-sm tracking-wide uppercase transition-all duration-300 animate-fade-up ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-[#eebf1c] text-[#04351e]'}`}>
          {toast.type === 'error' && <span className="mr-2">⚠️</span>}
          {toast.type === 'success' && <span className="mr-2">✓</span>}
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center border-b border-gray-300 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#04351e]">Secure Command Core</h2>
          <p className="text-xs text-gray-500 font-mono mt-0.5">Operator Room Connected Channel</p>
        </div>
        <button type="button" onClick={handleLogout} className="border border-red-500/40 text-red-600 px-4 py-1.5 font-bold uppercase rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm">Close Portal</button>
      </div>

      <div className="flex border-b border-gray-300 gap-4 font-bold uppercase tracking-wider font-semibold flex-wrap">
        <button type="button" onClick={() => { setActiveTab('orders'); setEditingSection(null); }} className={`pb-3 cursor-pointer transition-all ${activeTab === 'orders' ? 'text-[#04351e] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black'}`}>Quote Orders</button>
        <button type="button" onClick={() => { setActiveTab('inventory'); setEditingSection(null); }} className={`pb-3 cursor-pointer transition-all ${activeTab === 'inventory' ? 'text-[#04351e] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black'}`}>Store Inventory</button>
        <button type="button" onClick={() => { setActiveTab('gallery'); setEditingSection(null); }} className={`pb-3 cursor-pointer transition-all ${activeTab === 'gallery' ? 'text-[#04351e] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black'}`}>Gallery Manager</button>
        <button type="button" onClick={() => { setActiveTab('homepage'); setEditingItem(null); }} className={`pb-3 cursor-pointer transition-all ${activeTab === 'homepage' ? 'text-[#04351e] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black'}`}>Homepage Content CMS</button>
        <button type="button" onClick={() => { setActiveTab('global'); setEditingSection(globalConfigRecord); setEditingItem(null); }} className={`pb-3 cursor-pointer transition-all ${activeTab === 'global' ? 'text-[#04351e] border-b-2 border-[#eebf1c]' : 'text-gray-500 hover:text-black'}`}>Global Settings</button>
      </div>

      {/* MODAL FOR ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative" onClick={e => e.stopPropagation()}>
             <div className="bg-[#04351e] p-6 flex justify-between items-center text-white">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#eebf1c]">Order Overview</h3>
                  <p className="text-sm font-mono opacity-80 mt-1">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-white hover:text-[#eebf1c] text-3xl font-black transition-colors">&times;</button>
             </div>

             <div className="p-6 overflow-y-auto bg-gray-50 flex-grow space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded border border-gray-200 shadow-sm">
                   <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Customer Name</span>
                      <span className="font-bold text-base text-[#04351e]">{selectedOrder.customer_name}</span>
                   </div>
                   <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Status</span>
                      <span className={`font-bold text-sm px-2 py-1 rounded w-fit ${selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-700' : (selectedOrder.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700')}`}>{selectedOrder.status}</span>
                   </div>
                   <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Address</span>
                      <a href={`mailto:${selectedOrder.customer_email}`} className="font-bold text-sm text-[#eebf1c] hover:underline">{selectedOrder.customer_email}</a>
                   </div>
                   <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone Number</span>
                      <a href={`tel:${selectedOrder.customer_phone}`} className="font-bold text-sm text-[#eebf1c] hover:underline">{selectedOrder.customer_phone}</a>
                   </div>
                </div>

                <div>
                   <h4 className="font-bold uppercase text-[11px] text-gray-400 tracking-widest border-b border-gray-200 pb-2 mb-4">Cart Configuration Payload</h4>
                   <div className="space-y-4">
                      {selectedOrder.items?.map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded p-4 flex gap-4 items-start shadow-sm">
                           <div className="w-20 h-20 bg-gray-50 rounded border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                             {item.image_url ? <img src={item.image_url} alt="" className="max-w-full max-h-full object-contain" /> : <span className="text-[8px] text-gray-400">No Img</span>}
                           </div>
                           <div className="flex-grow min-w-0">
                              <h5 className="font-bold text-[#04351e] text-sm mb-1">{item.title}</h5>
                              <p className="text-[10px] text-gray-500 font-mono mb-2">SKU: {item.sku || 'N/A'} | QTY: {item.cart_quantity}</p>
                              
                              <div className="bg-gray-50 p-2 rounded text-[11px] text-gray-700 space-y-1">
                                <p><strong className="text-black">Selected Option:</strong> {item.cart_selected_option}</p>
                                {item.cart_special_instructions && <p><strong className="text-black">Notes:</strong> <span className="italic">{item.cart_special_instructions}</span></p>}
                              </div>
                           </div>
                           <div className="text-right flex-shrink-0">
                              <span className="font-bold text-[#eebf1c] block">${(item.cart_price || 0).toFixed(2)}</span>
                              {item.requires_ffl && <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 block mt-2">FFL REQ</span>}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-white border-t border-gray-200 p-6 flex justify-between items-center">
                <div className="flex gap-4">
                  {selectedOrder.status === 'Pending' && (
                     <button onClick={(e) => handleCompleteOrder(selectedOrder, e)} className="bg-green-100 text-green-700 px-4 py-2 rounded text-[10px] font-bold uppercase hover:bg-green-200 transition-colors">Mark Completed</button>
                  )}
                  {selectedOrder.status !== 'Cancelled' && (
                     <button onClick={(e) => handleCancelOrder(selectedOrder, e)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-wider transition-colors underline self-center">Cancel & Restock</button>
                  )}
                </div>
                
                <div className="text-right">
                   <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Estimated Total</span>
                   <span className="font-black text-2xl text-[#04351e]">${selectedOrder.total_estimated?.toFixed(2) || '0.00'}</span>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* --- MAIN WIDE LAYOUT --- */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE WORKSPACE */}
        <div className="w-full xl:w-3/4 flex-shrink-0">
          
          {activeTab === 'orders' && (
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 mb-4 gap-4">
                 <h3 className="font-serif text-sm uppercase font-bold text-black">Live Quote Queue</h3>
                 <div className="flex gap-2">
                   {['Active', 'Completed', 'Cancelled', 'All'].map(f => (
                     <button key={f} onClick={() => setOrderFilter(f)} className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${orderFilter === f ? 'bg-[#eebf1c] text-[#04351e]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{f}</button>
                   ))}
                 </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                 {filteredOrders.length === 0 ? <p className="text-gray-500 text-xs">No orders match this filter.</p> : filteredOrders.map(order => (
                    <div 
                       key={order.id} 
                       onClick={() => setSelectedOrder(order)}
                       className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4 cursor-pointer hover:border-[#eebf1c] hover:shadow-md transition-all group"
                    >
                       <div>
                          <p className="font-bold text-black text-sm">{order.customer_name} <span className="text-gray-500 font-normal ml-2">{order.customer_email}</span></p>
                          <p className="text-[11px] text-gray-600 font-mono mt-1">Est. Total: <span className="text-[#eebf1c] font-bold">${order.total_estimated}</span> | Items: {order.items?.length || 0} | Status: <span className={order.status === 'Cancelled' ? 'text-red-600 font-bold' : (order.status === 'Completed' ? 'text-blue-600 font-bold' : 'text-green-600 font-bold')}>{order.status}</span></p>
                          <p className="text-[9px] text-gray-400 mt-1">Received: {new Date(order.created_at).toLocaleString()}</p>
                       </div>
                       <div className="flex gap-4 items-center">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[#04351e] opacity-0 group-hover:opacity-100 transition-opacity">View Details &rarr;</span>
                         {order.status === 'Pending' && (
                            <button onClick={(e) => handleCompleteOrder(order, e)} className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-[9px] font-bold uppercase hover:bg-green-200 transition-colors">Mark Completed</button>
                         )}
                         {order.status !== 'Cancelled' && (
                            <button onClick={(e) => handleCancelOrder(order, e)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-[9px] font-bold uppercase hover:bg-red-200 transition-colors">Cancel</button>
                         )}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'global' && (
             <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md max-w-2xl animate-fade-in">
                <h3 className="font-serif text-xl uppercase font-bold text-[#04351e] mb-6">Global Inventory Buttons</h3>
                <p className="text-gray-500 mb-6 text-sm">Configure the style of the "Request Quote" or Cart buttons for all items in the inventory/store automatically.</p>
                <form onSubmit={handleSaveGlobalConfig} className="space-y-4">
                   <div>
                      <label className="block font-bold mb-1">Company Primary Button Color</label>
                      <select className="w-full bg-white border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#eebf1c]" value={editingSection?.btn_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn_color', e.target.value)}>
                         <option value="brand-gold">🟡 Company Gold</option>
                         <option value="brand-green">🟢 Company Green</option>
                         <option value="white">⚪ White</option>
                         <option value="black">⚫ Black</option>
                         <option value="silver">🔘 Silver/Gray</option>
                         <option value="red">🔴 Crimson Red</option>
                         <option value="blue">🔵 Royal Blue</option>
                         <option value="purple">🟣 Deep Purple</option>
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block font-bold mb-1">Button Fill Style</label>
                        <select className="w-full bg-white border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#eebf1c]" value={editingSection?.btn_style || 'solid'} onChange={e => handleEditSectionChange('btn_style', e.target.value)}>
                           <option value="solid">Solid Background</option>
                           <option value="outline">Transparent Outline</option>
                        </select>
                     </div>
                     <div>
                        <label className="block font-bold mb-1">Button Shape Radius</label>
                        <select className="w-full bg-white border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#eebf1c]" value={editingSection?.btn_radius || 'rounded-md'} onChange={e => handleEditSectionChange('btn_radius', e.target.value)}>
                           <option value="rounded-none">Square (Sharp)</option>
                           <option value="rounded-md">Rounded Edge (Modern)</option>
                           <option value="pill">Pill (Sleek)</option>
                        </select>
                     </div>
                   </div>
                   <div>
                     <label className="block font-bold mb-1">Button Font Typographic Face</label>
                     <select className="w-full bg-white border border-gray-300 p-3 rounded text-sm focus:outline-none focus:border-[#eebf1c]" value={editingSection?.btn_font || 'sans'} onChange={e => handleEditSectionChange('btn_font', e.target.value)}>
                        <option value="sans">Sans-Serif (Modern / Clean)</option>
                        <option value="serif">Serif (Traditional / Elegant)</option>
                        <option value="mono">Monospace (Technical)</option>
                     </select>
                   </div>
                   <button type="submit" disabled={savingSection} className="w-full bg-[#eebf1c] text-[#04351e] font-black py-4 mt-4 rounded uppercase cursor-pointer hover:bg-yellow-500 transition-colors">{savingSection ? 'Saving...' : 'Save Global UI Layout'}</button>
                </form>
             </div>
          )}

          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                 <form onSubmit={handleCreateIsolatedGalleryItem} className="space-y-4">
                    <h3 className="font-serif text-base uppercase font-bold text-[#04351e]">Publish Gallery Feature</h3>
                    <p className="text-gray-500 mb-4 text-xs font-mono">Gallery items do not require pricing or SKUs. They serve purely as visual showcases of past custom work.</p>
                    <div>
                      <label className="block text-black font-bold mb-1">Display Title (Optional)</label>
                      <input type="text" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="e.g., Texas Heritage 1911" value={newGalleryItem.title || ''} onChange={e => setNewGalleryItem({title: e.target.value})} />
                    </div>

                    <div className="border-4 border-dashed border-gray-300 bg-gray-50 rounded-xl p-4 space-y-3">
                      <span className="block font-black text-[10px] text-gray-700 tracking-widest uppercase">🖼️ Gallery Media</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {galleryUploadFiles.map((item, idx) => (
                          <div key={item.id} className="relative aspect-square border-2 border-[#eebf1c] rounded overflow-hidden bg-white group">
                            <img src={item.previewUrl} className="w-full h-full object-cover" alt="" />
                            <button type="button" onClick={() => clearIsolatedGalleryFile(item.id)} className="absolute inset-0 bg-black/70 text-white font-bold text-[9px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Clear</button>
                          </div>
                        ))}
                        {galleryUploadFiles.length === 0 && (
                          <div className="col-span-3 aspect-video bg-white border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 font-mono gap-2">
                            <span className="text-2xl">📸</span>
                            <span>Awaiting Image</span>
                          </div>
                        )}
                      </div>
                      <input type="file" multiple accept="image/*" className="w-full text-xs text-black cursor-pointer pt-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-gray-200 file:text-black hover:file:bg-gray-300" onChange={handleIsolatedGallerySelection} />
                    </div>
                    
                    <button type="submit" disabled={creatingRecord} className="w-full bg-[#eebf1c] text-[#04351e] font-black py-3 rounded uppercase shadow cursor-pointer hover:bg-yellow-500">
                      {creatingRecord ? 'Uploading...' : 'Publish to Gallery'}
                    </button>
                 </form>
              </div>

              <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-4">
                 <h3 className="font-serif text-sm uppercase font-bold text-black border-b pb-3">Active Gallery Showcase</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-2 mt-4">
                   {galleryInventory.map(item => (
                     <div key={item.id} className="relative group aspect-square rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                       {item.image_url && <img src={item.image_url} className="w-full h-full object-cover" alt="" />}
                       <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity p-2 text-center gap-2">
                         <span className="text-[#eebf1c] font-bold text-[10px] uppercase break-words">{item.title}</span>
                         <button type="button" onClick={() => handleDeleteItem(item.id)} className="bg-red-600 text-white px-2 py-1 rounded text-[9px] uppercase font-bold">Delete</button>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-md">
                {editingItem ? (
                  <form onSubmit={handleSaveItemUpdate} className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2"><h4 className="font-serif font-bold text-black uppercase">Configure Existing Product</h4><button type="button" onClick={() => setEditingItem(null)} className="text-gray-500 underline cursor-pointer">Cancel</button></div>
                    
                    <div><label className="block text-black font-bold mb-1">Product Title</label><input required type="text" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={editingItem.title || ''} onChange={e => handleEditItemChange('title', e.target.value)} /></div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">SKU</label><input type="text" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="e.g. EG-H004-3" value={editingItem.sku || ''} onChange={e => handleEditItemChange('sku', e.target.value)} /></div>
                      <div><label className="block text-black font-bold mb-1">Category</label><select className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={editingItem.category || 'Rifles'} onChange={e => handleEditItemChange('category', e.target.value)}><option value="Rifles">Rifles</option><option value="Handguns">Handguns</option><option value="Accessories">Accessories</option></select></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">Base Price / Min ($)</label><input type="number" step="0.01" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={editingItem.price || ''} onChange={e => handleEditItemChange('price', e.target.value)} /></div>
                      <div><label className="block text-black font-bold mb-1">Max Price Range ($)</label><input type="number" step="0.01" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="Optional" value={editingItem.price_max || ''} onChange={e => handleEditItemChange('price_max', e.target.value)} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">Status</label><select className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={editingItem.status || 'In Stock'} onChange={e => handleEditItemChange('status', e.target.value)}><option value="In Stock">In Stock</option><option value="Reserved">Reserved</option><option value="Custom Order">Custom Order</option><option value="Sold Out">Sold Out</option></select></div>
                      <div><label className="block text-black font-bold mb-1">Stock Count Qty</label><input type="number" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={editingItem.quantity || 0} onChange={e => handleEditItemChange('quantity', e.target.value)} /></div>
                    </div>

                    <div className="border border-gray-200 rounded p-3 bg-gray-50">
                       <label className="block font-bold text-[#04351e] uppercase tracking-wider mb-2 text-[10px]">Product Dropdown Selection</label>
                       <input type="text" placeholder="Label (e.g., Caliber)" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs mb-2 focus:outline-none focus:border-[#eebf1c]" value={editingItem.dropdown_label || ''} onChange={e => handleEditItemChange('dropdown_label', e.target.value)} />
                       <input type="text" placeholder="Options (comma separated. e.g. 9mm, .45 ACP)" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={editingItem.dropdown_options || ''} onChange={e => handleEditItemChange('dropdown_options', e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2 p-2 bg-gray-50 border border-gray-200 rounded">
                       <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editingItem.requires_ffl || false} onChange={e => handleEditItemChange('requires_ffl', e.target.checked)} className="accent-[#eebf1c] w-4 h-4"/> <b className="text-[10px] uppercase">Require FFL Information on Checkout</b></label>
                       <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editingItem.allow_special_instructions || false} onChange={e => handleEditItemChange('allow_special_instructions', e.target.checked)} className="accent-[#eebf1c] w-4 h-4"/> <b className="text-[10px] uppercase">Enable Special Instructions Box</b></label>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-2">
                      <div className="flex items-center gap-2"><input type="checkbox" id="edit_is_limited" className="accent-[#eebf1c]" checked={editingItem.is_limited_edition || false} onChange={e => handleEditItemChange('is_limited_edition', e.target.checked)} /><label htmlFor="edit_is_limited" className="font-bold text-black uppercase cursor-pointer">Limited Run Tracking Window</label></div>
                      {editingItem.is_limited_edition && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <input type="datetime-local" className="bg-white border border-gray-300 p-2 rounded text-black text-[10px] focus:outline-none focus:border-[#eebf1c]" value={editingItem.limited_time_start ? editingItem.limited_time_start.slice(0,16) : ''} onChange={e => handleEditItemChange('limited_time_start', e.target.value)} />
                          <input type="datetime-local" className="bg-white border border-gray-300 p-2 rounded text-black text-[10px] focus:outline-none focus:border-[#eebf1c]" value={editingItem.limited_time_end ? editingItem.limited_time_end.slice(0,16) : ''} onChange={e => handleEditItemChange('limited_time_end', e.target.value)} />
                        </div>
                      )}
                    </div>

                    <div className="border-4 border-dashed border-gray-300 bg-gray-50 rounded-xl p-4 space-y-3">
                      <span className="block font-black text-[10px] text-gray-700 tracking-widest uppercase">📦 Product Image Allocation Array (Up to 6)</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {itemGalleryFiles.map((item, idx) => (
                          <div key={item.id} className={`relative aspect-square border rounded overflow-hidden bg-white group ${idx === 0 ? 'border-2 border-amber-500 scale-105' : 'border-gray-300'}`}>
                            <img src={item.previewUrl} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col gap-1 items-center justify-center">
                              <button type="button" onClick={() => promoteStagedItemImgToMain(idx)} className="bg-[#eebf1c] text-black px-1 rounded text-[7px] font-black uppercase cursor-pointer">Main</button>
                              <button type="button" onClick={() => clearStagedItemFile(item.id)} className="bg-red-600 text-white px-1 rounded text-[7px] font-bold uppercase cursor-pointer">Clear</button>
                            </div>
                            <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black font-mono text-[7px] text-center font-bold">STAGED</span>
                          </div>
                        ))}

                        {itemGalleryFiles.length === 0 && editingItem.image_url && (
                          <div className="relative aspect-square rounded border-2 border-[#eebf1c] bg-white overflow-hidden">
                            <img src={editingItem.image_url} className="w-full h-full object-cover" alt="" />
                            <span className="absolute bottom-0 inset-x-0 bg-[#eebf1c] text-black font-mono text-[7px] text-center font-black">MAIN</span>
                          </div>
                        )}

                        {itemGalleryFiles.length === 0 && (editingItem.alt_images || []).map((img, i) => (
                          <div key={i} className="relative aspect-square rounded border border-gray-300 bg-white overflow-hidden group">
                            <img src={img} className="w-full h-full object-cover opacity-80" alt="" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col gap-1 items-center justify-center">
                              <button type="button" onClick={() => promoteExistingItemImgToMain(i)} className="bg-[#eebf1c] text-black px-1.5 rounded text-[8px] font-black uppercase cursor-pointer">Main</button>
                              <button type="button" onClick={() => clearExistingItemImage(i)} className="bg-red-600 text-white px-1.5 rounded text-[8px] font-bold uppercase cursor-pointer">Remove</button>
                            </div>
                            <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[#eebf1c] font-mono text-[7px] text-center font-bold">#{i + 2}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2">
                        <input type="file" multiple accept="image/*" className="w-full text-xs text-black cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" onChange={handleItemGallerySelection} />
                      </div>
                    </div>

                    <div className="space-y-3">
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Main Description Transcript</label><textarea required rows="4" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={editingItem.description || ''} onChange={e => handleEditItemChange('description', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Dimensions/Specs Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={editingItem.tab_specs || ''} onChange={e => handleEditItemChange('tab_specs', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Process/Timeline Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={editingItem.tab_process || ''} onChange={e => handleEditItemChange('tab_process', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Shipping & Returns Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={editingItem.tab_shipping || ''} onChange={e => handleEditItemChange('tab_shipping', e.target.value)}></textarea></div>
                    </div>
                    
                    <button type="submit" disabled={updatingRecord} className="w-full bg-[#eebf1c] text-[#04351e] font-black py-3 rounded uppercase shadow cursor-pointer hover:bg-yellow-500 transition-colors">{updatingRecord ? 'Processing Updates...' : 'Commit Product Configuration'}</button>
                  </form>
                ) : (
                  <form onSubmit={handleCreateNewItemWithShowcase} className="space-y-4">
                    <h3 className="font-serif text-base uppercase font-bold text-black">Catalog Input Manifest</h3>
                    
                    <div><label className="block text-black font-bold mb-1">Title Name</label><input required type="text" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="e.g., Tactical Laser Ranger" value={newItem.title || ''} onChange={e => handleNewItemChange('title', e.target.value)} /></div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">SKU</label><input type="text" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="e.g. EG-H004-3" value={newItem.sku || ''} onChange={e => handleNewItemChange('sku', e.target.value)} /></div>
                      <div><label className="block text-black font-bold mb-1">Category</label><select className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={newItem.category} onChange={e => handleNewItemChange('category', e.target.value)}><option value="Rifles">Rifles</option><option value="Handguns">Handguns</option><option value="Accessories">Accessories</option></select></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">Base Price / Min ($)</label><input type="number" step="0.01" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="Price" value={newItem.price || ''} onChange={e => handleNewItemChange('price', e.target.value)} /></div>
                      <div><label className="block text-black font-bold mb-1">Max Price Range ($)</label><input type="number" step="0.01" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" placeholder="Optional" value={newItem.price_max || ''} onChange={e => handleNewItemChange('price_max', e.target.value)} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-black font-bold mb-1">Initial Quantity</label><input type="number" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={newItem.quantity || 1} onChange={e => handleNewItemChange('quantity', e.target.value)} /></div>
                    </div>

                    <div className="border border-gray-200 rounded p-3 bg-gray-50">
                       <label className="block font-bold text-[#04351e] uppercase tracking-wider mb-2 text-[10px]">Product Dropdown Selection</label>
                       <input type="text" placeholder="Label (e.g., Caliber)" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs mb-2 focus:outline-none focus:border-[#eebf1c]" value={newItem.dropdown_label || ''} onChange={e => handleNewItemChange('dropdown_label', e.target.value)} />
                       <input type="text" placeholder="Options (comma separated. e.g. 9mm, .45 ACP)" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={newItem.dropdown_options || ''} onChange={e => handleNewItemChange('dropdown_options', e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2 p-2 bg-gray-50 border border-gray-200 rounded">
                       <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={newItem.requires_ffl || false} onChange={e => handleNewItemChange('requires_ffl', e.target.checked)} className="accent-[#eebf1c] w-4 h-4"/> <b className="text-[10px] uppercase">Require FFL Information on Checkout</b></label>
                       <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={newItem.allow_special_instructions || false} onChange={e => handleNewItemChange('allow_special_instructions', e.target.checked)} className="accent-[#eebf1c] w-4 h-4"/> <b className="text-[10px] uppercase">Enable Special Instructions Box</b></label>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-2">
                      <div className="flex items-center gap-2"><input type="checkbox" id="is_limited" className="accent-[#eebf1c]" checked={newItem.is_limited_edition || false} onChange={e => handleNewItemChange('is_limited_edition', e.target.checked)} /><label htmlFor="is_limited" className="font-bold text-black uppercase cursor-pointer">Limited Run Scheduling Window</label></div>
                      {newItem.is_limited_edition && (
                        <div className="grid grid-cols-2 gap-2 pt-1 animate-fade-in">
                          <input type="datetime-local" className="bg-white border border-gray-300 p-2 rounded text-black text-[10px] focus:outline-none focus:border-[#eebf1c]" value={newItem.limited_time_start || ''} onChange={e => handleNewItemChange('limited_time_start', e.target.value)} />
                          <input type="datetime-local" className="bg-white border border-gray-300 p-2 rounded text-black text-[10px] focus:outline-none focus:border-[#eebf1c]" value={newItem.limited_time_end || ''} onChange={e => handleNewItemChange('limited_time_end', e.target.value)} />
                        </div>
                      )}
                    </div>

                    <div className="border-4 border-dashed border-gray-300 bg-gray-50 rounded-xl p-4 space-y-3">
                      <span className="block font-black text-[10px] text-gray-700 tracking-widest uppercase">🖼️ PRODUCT MEDIA CAROUSEL DECK (Up to 6)</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {newGalleryFiles.map((item, idx) => (
                          <div key={item.id} className={`relative aspect-square border rounded overflow-hidden bg-white group ${idx === 0 ? 'border-2 border-amber-500 scale-105' : 'border-gray-300'}`}>
                            <img src={item.previewUrl} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col gap-1 items-center justify-center">
                              <button type="button" onClick={() => promoteNewStagedToMain(idx)} className="bg-[#eebf1c] text-black px-1 rounded text-[7px] font-black uppercase cursor-pointer">Main</button>
                              <button type="button" onClick={() => clearNewStagedItemFile(item.id)} className="bg-red-600 text-white px-1 rounded text-[7px] font-bold uppercase cursor-pointer">Clear</button>
                            </div>
                            <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white font-mono text-[7px] text-center font-bold">
                              {idx === 0 ? 'MAIN' : `#${idx + 1}`}
                            </span>
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, 3 - newGalleryFiles.length) }).map((_, i) => (
                          <div key={i} className="aspect-square bg-gray-100 border border-gray-300 border-dashed rounded flex items-center justify-center text-gray-400 text-[8px] text-center p-2 font-mono">EMPTY SLOT</div>
                        ))}
                      </div>
                      <div className="pt-2 text-left">
                        <input type="file" multiple accept="image/*" className="w-full text-xs text-black cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" onChange={handleNewItemGallerySelection} />
                      </div>
                    </div>

                    <div className="space-y-3">
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Main Description Script</label><textarea required rows="4" className="w-full bg-white border border-gray-300 rounded p-2.5 text-black focus:outline-none focus:border-[#eebf1c]" value={newItem.description || ''} onChange={e => handleNewItemChange('description', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Dimensions/Specs Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={newItem.tab_specs || ''} onChange={e => handleNewItemChange('tab_specs', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Process/Timeline Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={newItem.tab_process || ''} onChange={e => handleNewItemChange('tab_process', e.target.value)}></textarea></div>
                       <div><label className="block text-[#04351e] font-bold mb-1 text-[10px] uppercase">Shipping & Returns Tab Data</label><textarea rows="2" className="w-full bg-white border border-gray-300 rounded p-2 text-black text-xs focus:outline-none focus:border-[#eebf1c]" value={newItem.tab_shipping || ''} onChange={e => handleNewItemChange('tab_shipping', e.target.value)}></textarea></div>
                    </div>

                    <button type="submit" disabled={creatingRecord} className="w-full bg-[#eebf1c] text-[#04351e] font-black py-3 rounded uppercase shadow cursor-pointer hover:bg-yellow-500">
                      {creatingRecord ? 'Uploading Showroom Assets...' : 'Archive New Item Entry'}
                    </button>
                  </form>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
                    <h3 className="font-serif text-sm uppercase font-bold text-black">Active Store Inventory</h3>
                    <div className="flex flex-wrap gap-1 text-[10px] font-bold uppercase">
                      {['All', 'Rifles', 'Handguns', 'Accessories'].map(cat => (
                        <button key={cat} type="button" onClick={() => setInventoryFilter(cat)} className={`px-2.5 py-1 rounded border border-gray-200 transition-all cursor-pointer ${inventoryFilter === cat ? 'bg-[#eebf1c] text-[#04351e] font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 mt-4">
                    {filteredInventory.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 text-black gap-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          {item.image_url && <img src={item.image_url} className="w-10 h-10 object-cover rounded border border-gray-300" alt="" />}
                          <div>
                            <p className="font-serif font-bold text-black">{item.title}</p>
                            <p className="text-[9px] text-gray-500 font-mono tracking-wider uppercase mt-0.5">{item.category} &bull; QTY: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => handleStartItemConfig(item)} className="border border-gray-300 px-3 py-1 text-[10px] rounded font-mono font-black uppercase text-black bg-white hover:bg-gray-100 cursor-pointer">Configure</button>
                          <button type="button" onClick={() => handleDeleteItem(item.id)} className="text-gray-400 hover:text-red-500 text-xl px-2 cursor-pointer">&times;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-5">
                {editingSection ? (
                  <form onSubmit={handleSaveSectionUpdate} className="space-y-5">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <h4 className="font-serif text-sm font-bold text-black uppercase tracking-wider">CMS Block Editor</h4>
                      <button type="button" onClick={() => setEditingSection(null)} className="text-gray-500 underline text-xs cursor-pointer">Close Editor</button>
                    </div>

                    <div className="bg-[#eebf1c]/10 text-[#04351e] p-3 rounded border border-[#eebf1c]/30 text-center shadow-sm">
                      <span className="font-bold text-[10px] uppercase tracking-widest block mb-1">⚡ CMS Configuration Active</span>
                      <span className="font-sans text-[10px] block">Make your changes below. To push the updates live to the website, you must click the <b>Commit All Changes</b> button at the bottom.</span>
                    </div>

                    <div className="border border-[#eebf1c]/40 rounded-lg p-4 bg-gray-50 space-y-4">
                      <label className="block font-black text-[10px] text-[#04351e] uppercase tracking-widest border-b border-gray-200 pb-1">🔲 Custom Section Block Options</label>
                      
                      <div className="pt-1 space-y-3">
                        <div className="flex items-center gap-2 bg-white p-2 border border-gray-200 rounded">
                           <input type="checkbox" id="connect_to_previous" className="accent-[#eebf1c] w-4 h-4 cursor-pointer" checked={editingSection.connect_to_previous || false} onChange={e => handleEditSectionChange('connect_to_previous', e.target.checked)} />
                           <label htmlFor="connect_to_previous" className="font-bold text-black uppercase text-[10px] cursor-pointer">Attach to Navbar / Previous Section (Removes Gap)</label>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2 border border-gray-200 rounded">
                           <input type="checkbox" id="bg_none" className="accent-[#eebf1c] w-4 h-4 cursor-pointer" checked={editingSection.bg_none || false} onChange={e => handleEditSectionChange('bg_none', e.target.checked)} />
                           <label htmlFor="bg_none" className="font-bold text-black uppercase text-[10px] cursor-pointer">Disable Background Completely (Transparent)</label>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold block mb-1 mt-2">Section Layout Style</span>
                        <select className="w-full border border-gray-300 p-2 text-xs rounded focus:outline-none focus:border-[#eebf1c]" value={editingSection.section_style || 'flat'} onChange={e => handleEditSectionChange('section_style', e.target.value)}>
                           <option value="flat">Standard Edge (Flat)</option>
                           <option value="bubbled">Rounded Floating Container (Bubbled)</option>
                           <option value="elevated">Deep Shadow Elevation (Elevated)</option>
                           <option value="glass">Frosted Glass Effect (Glassmorphism)</option>
                        </select>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                           <input type="checkbox" id="border_enabled" className="accent-[#eebf1c] w-4 h-4" checked={editingSection.border_enabled || false} onChange={e => handleEditSectionChange('border_enabled', e.target.checked)} />
                           <label htmlFor="border_enabled" className="font-bold text-black uppercase text-[10px] cursor-pointer">Enable Perimeter Frame Line</label>
                        </div>
                        {editingSection.border_enabled && (
                          <div className="grid grid-cols-3 gap-2 animate-fade-in">
                             <div>
                               <span className="text-[10px] font-bold block mb-1">Thickness</span>
                               <select className="w-full border border-gray-300 p-1.5 text-xs rounded focus:outline-none focus:border-[#eebf1c]" value={editingSection.border_size || '2px'} onChange={e => handleEditSectionChange('border_size', e.target.value)}>
                                  <option value="1px">1px Thin</option>
                                  <option value="2px">2px Standard</option>
                                  <option value="4px">4px Bold</option>
                                  <option value="8px">8px Heavy</option>
                               </select>
                             </div>
                             <div>
                               <span className="text-[10px] font-bold block mb-1">Color</span>
                               <select className="w-full border border-gray-300 p-1.5 text-xs rounded focus:outline-none focus:border-[#eebf1c]" value={editingSection.border_color || 'brand-gold'} onChange={e => handleEditSectionChange('border_color', e.target.value)}>
                                  <option value="brand-gold">🟡 Company Gold</option>
                                  <option value="brand-green">🟢 Company Green</option>
                                  <option value="white">⚪ White</option>
                                  <option value="black">⚫ Black</option>
                                  <option value="silver">🔘 Silver / Gray</option>
                                  <option value="red">🔴 Crimson Red</option>
                                  <option value="blue">🔵 Royal Blue</option>
                                  <option value="purple">🟣 Deep Purple</option>
                               </select>
                             </div>
                             <div>
                               <span className="text-[10px] font-bold block mb-1">Effect</span>
                               <select className="w-full border border-gray-300 p-1.5 text-xs rounded focus:outline-none focus:border-[#eebf1c]" value={editingSection.border_effect || 'solid'} onChange={e => handleEditSectionChange('border_effect', e.target.value)}>
                                  <option value="solid">Solid Frame</option>
                                  <option value="dashed">Dashed Line</option>
                                  <option value="double">Double Layer</option>
                                  <option value="glow">Soft Aura Glow</option>
                                  <option value="neon">Neon Core</option>
                                  <option value="pulse">Pulsing Signal</option>
                               </select>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div><label className="block text-black font-bold mb-0.5">Section Title</label><input required type="text" className="w-full border border-gray-300 rounded p-2 font-serif font-bold text-black bg-white focus:outline-none focus:border-[#eebf1c] shadow-sm" value={editingSection.title || ''} onChange={e => handleEditSectionChange('title', e.target.value)} /></div>
                      <div><label className="block text-black font-bold mb-0.5">Tagline Accent</label><input type="text" className="w-full border border-gray-300 rounded p-2 text-black bg-white focus:outline-none focus:border-[#eebf1c] shadow-sm" value={editingSection.tagline || ''} onChange={e => handleEditSectionChange('tagline', e.target.value)} /></div>
                      
                      {editingSection.layout_type !== 'feature_grid' && (
                        <div><label className="block text-black font-bold mb-0.5">Description Body / Text Block</label><textarea rows="3" className="w-full border border-gray-300 rounded p-2 text-black bg-white leading-relaxed focus:outline-none focus:border-[#eebf1c] shadow-sm" value={editingSection.description || ''} onChange={e => handleEditSectionChange('description', e.target.value)}></textarea></div>
                      )}
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                      <label className="block font-black text-[10px] text-gray-700 uppercase tracking-widest border-b border-gray-200 pb-1">🎨 Typography & Styling</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <span className="text-[10px] font-bold text-black uppercase mb-1 block">Font Style</span>
                          <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-black text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.font_family || 'serif'} onChange={e => handleEditSectionChange('font_family', e.target.value)}>
                            <option value="serif">Serif (Elegant)</option>
                            <option value="sans">Sans-Serif (Modern)</option>
                            <option value="mono">Monospace (Tech)</option>
                            <option value="cursive">Cursive (Fancy)</option>
                            <option value="display">Display (Heavy)</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-black uppercase mb-1 block">Base Color</span>
                          <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-black text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.text_color || 'brand-gold'} onChange={e => handleEditSectionChange('text_color', e.target.value)}>
                            <option value="brand-gold">🟡 Company Gold</option>
                            <option value="brand-green">🟢 Company Green</option>
                            <option value="white">⚪ White</option>
                            <option value="black">⚫ Black</option>
                            <option value="silver">🔘 Silver / Gray</option>
                            <option value="red">🔴 Crimson Red</option>
                            <option value="blue">🔵 Royal Blue</option>
                            <option value="purple">🟣 Deep Purple</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-black uppercase mb-1 block">Text Effect</span>
                          <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-black text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.text_effect || 'none'} onChange={e => handleEditSectionChange('text_effect', e.target.value)}>
                            <option value="none">Standard Solid</option>
                            <option value="gradient">Linear Gradient</option>
                            <option value="glow">Neon Glow</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Standard Interactive Buttons Configs (Only for non-feature-grid layouts) */}
                    {editingSection.layout_type !== 'feature_grid' && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
                        <label className="block font-black text-[10px] text-gray-700 uppercase tracking-widest border-b border-gray-200 pb-1">🖲️ Interactive Button Configs</label>
                        
                        <div className="border border-gray-200 p-3 rounded bg-white">
                          <span className="block font-bold text-[#04351e] uppercase text-[10px] mb-3">Button 1 Settings</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Fill Color</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn_color', e.target.value)}>
                                <option value="brand-gold">🟡 Company Gold</option>
                                <option value="brand-green">🟢 Company Green</option>
                                <option value="white">⚪ White</option>
                                <option value="black">⚫ Black</option>
                                <option value="silver">🔘 Silver / Gray</option>
                                <option value="red">🔴 Crimson Red</option>
                                <option value="blue">🔵 Royal Blue</option>
                                <option value="purple">🟣 Deep Purple</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Fill Style</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn_style || 'solid'} onChange={e => handleEditSectionChange('btn_style', e.target.value)}>
                                <option value="solid">Solid Fill</option>
                                <option value="outline">Transparent Outline</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Font</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn_font || 'sans'} onChange={e => handleEditSectionChange('btn_font', e.target.value)}>
                                <option value="sans">Sans-Serif</option>
                                <option value="serif">Serif</option>
                                <option value="mono">Monospace</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Shape</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn_radius || 'rounded-lg'} onChange={e => handleEditSectionChange('btn_radius', e.target.value)}>
                                <option value="rounded-lg">Rounded (Modern)</option>
                                <option value="square">Square (Technical)</option>
                                <option value="pill">Pill (Sleek)</option>
                              </select>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Hover Animation</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn_hover_anim || 'lift'} onChange={e => handleEditSectionChange('btn_hover_anim', e.target.value)}>
                                <option value="lift">Scale & Lift</option>
                                <option value="glow">Pulse Glow</option>
                                <option value="none">Color Change Only</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 p-3 rounded bg-white">
                          <span className="block font-bold text-[#04351e] uppercase text-[10px] mb-3">Button 2 Settings</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Fill Color</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn2_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn2_color', e.target.value)}>
                                <option value="brand-gold">🟡 Company Gold</option>
                                <option value="brand-green">🟢 Company Green</option>
                                <option value="white">⚪ White</option>
                                <option value="black">⚫ Black</option>
                                <option value="silver">🔘 Silver / Gray</option>
                                <option value="red">🔴 Crimson Red</option>
                                <option value="blue">🔵 Royal Blue</option>
                                <option value="purple">🟣 Deep Purple</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Fill Style</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn2_style || 'outline'} onChange={e => handleEditSectionChange('btn2_style', e.target.value)}>
                                <option value="solid">Solid Fill</option>
                                <option value="outline">Transparent Outline</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Font</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn2_font || 'sans'} onChange={e => handleEditSectionChange('btn2_font', e.target.value)}>
                                <option value="sans">Sans-Serif</option>
                                <option value="serif">Serif</option>
                                <option value="mono">Monospace</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Shape</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn2_radius || 'rounded-lg'} onChange={e => handleEditSectionChange('btn2_radius', e.target.value)}>
                                <option value="rounded-lg">Rounded (Modern)</option>
                                <option value="square">Square (Technical)</option>
                                <option value="pill">Pill (Sleek)</option>
                              </select>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                              <span className="text-[10px] font-bold text-black uppercase mb-1 block">Hover Animation</span>
                              <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[11px] focus:outline-none focus:border-[#eebf1c]" value={editingSection.btn2_hover_anim || 'lift'} onChange={e => handleEditSectionChange('btn2_hover_anim', e.target.value)}>
                                <option value="lift">Scale & Lift</option>
                                <option value="glow">Pulse Glow</option>
                                <option value="none">Color Change Only</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="btn1_enabled" className="accent-[#eebf1c]" checked={editingSection.btn1_enabled || false} onChange={e => handleEditSectionChange('btn1_enabled', e.target.checked)} />
                            <label htmlFor="btn1_enabled" className="font-bold text-black uppercase cursor-pointer">Enable Button 1</label>
                          </div>
                          {editingSection.btn1_enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate-fade-in pl-5 border-l-2 border-[#eebf1c]/30">
                              <input type="text" className="w-full bg-white border border-gray-300 rounded p-2 text-black focus:outline-none text-[11px]" placeholder="Label 1" value={editingSection.btn1_text || ''} onChange={e => handleEditSectionChange('btn1_text', e.target.value)} />
                              <div>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded p-2 text-black focus:outline-none text-[11px]" placeholder="Destination Path" value={editingSection.btn1_link || ''} onChange={e => handleEditSectionChange('btn1_link', e.target.value)} />
                                <span className="text-[9px] text-gray-500 font-mono block mt-1">EX: "/contact" (Internal) OR "https://google.com" (External)</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="btn2_enabled" className="accent-[#eebf1c]" checked={editingSection.btn2_enabled || false} onChange={e => handleEditSectionChange('btn2_enabled', e.target.checked)} />
                            <label htmlFor="btn2_enabled" className="font-bold text-black uppercase cursor-pointer">Enable Button 2</label>
                          </div>
                          {editingSection.btn2_enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate-fade-in pl-5 border-l-2 border-[#eebf1c]/30">
                              <input type="text" className="w-full bg-white border border-gray-300 rounded p-2 text-black focus:outline-none text-[11px]" placeholder="Label 2" value={editingSection.btn2_text || ''} onChange={e => handleEditSectionChange('btn2_text', e.target.value)} />
                              <div>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded p-2 text-black focus:outline-none text-[11px]" placeholder="Destination Path 2" value={editingSection.btn2_link || ''} onChange={e => handleEditSectionChange('btn2_link', e.target.value)} />
                                <span className="text-[9px] text-gray-500 font-mono block mt-1">EX: "/contact" (Internal) OR "https://google.com" (External)</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {editingSection.bg_none === false && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
                        <label className="block font-black text-[10px] text-gray-700 uppercase tracking-widest border-b border-gray-200 pb-1">🌫️ Background & Atmosphere Controls</label>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                           <div>
                            <span className="text-[10px] font-bold text-black uppercase mb-1 block">Solid Fallback Color</span>
                            <input type="color" className="w-full h-8 p-0 border-0 rounded cursor-pointer" value={editingSection.bg_color || '#000000'} onChange={e => handleEditSectionChange('bg_color', e.target.value)} />
                           </div>
                           <div className="col-span-2">
                             <span className="text-[10px] font-bold text-black uppercase mb-1 flex justify-between">
                               <span>Darkness Overlay (Opacity)</span>
                               <span className="text-[#eebf1c]">{editingSection.bg_overlay_opacity ?? 60}%</span>
                             </span>
                             <input type="range" min="0" max="100" className="w-full accent-[#eebf1c] cursor-pointer" value={editingSection.bg_overlay_opacity ?? 60} onChange={e => handleEditSectionChange('bg_overlay_opacity', e.target.value)} />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-3">
                           <div className="flex flex-col justify-center">
                             <label className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" className="accent-[#eebf1c] w-4 h-4" checked={editingSection.bg_parallax || false} onChange={e => handleEditSectionChange('bg_parallax', e.target.checked)} />
                               <span className="font-bold text-black uppercase text-[10px]">Enable Parallax Scroll Effect on Media</span>
                             </label>
                           </div>
                        </div>

                        <div className="space-y-3 border border-gray-200 bg-white p-4 rounded-xl shadow-sm">
                          <div className="border-4 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg text-center space-y-3">
                            <label className="block font-black text-[10px] text-gray-700 uppercase tracking-widest">🖼️ SECTION BACKGROUND MEDIA DECK</label>
                            <span className="block text-[9px] text-gray-500 font-mono mb-2">Upload a single image here for a static background, or multiple for a slideshow.</span>
                            <div className="grid grid-cols-3 gap-1.5">
                              
                              {sectionBgFiles.map((item, idx) => {
                                const isVideo = item.file && item.file.type && item.file.type.startsWith('video');
                                return (
                                  <div key={item.id} className={`relative aspect-square border rounded overflow-hidden bg-black group ${idx === 0 ? 'border-2 border-[#eebf1c] scale-105' : 'border-gray-300'}`}>
                                    {isVideo ? (
                                      <video src={item.previewUrl} className="w-full h-full object-cover opacity-60" muted playsInline />
                                    ) : (
                                      <img src={item.previewUrl} className="w-full h-full object-cover" alt="" />
                                    )}
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col gap-1 items-center justify-center">
                                      <button type="button" onClick={() => promoteStagedBgToMain(idx)} className="bg-[#eebf1c] text-black px-1 rounded text-[7px] font-black uppercase">Main</button>
                                      <button type="button" onClick={() => clearStagedBgImage(item.id)} className="bg-red-600 text-white px-1 rounded text-[7px] font-bold uppercase">Clear</button>
                                    </div>
                                    <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black font-mono text-[7px] text-center font-bold">STAGED</span>
                                    {isVideo && <span className="absolute top-1 right-1 text-white text-[10px]">🎥</span>}
                                  </div>
                                );
                              })}

                              {!(sectionBgFiles.length > 0) && (editingSection.bg_images || []).map((imgUrl, index) => {
                                const isVideo = imgUrl.includes('.mp4') || imgUrl.includes('.webm');
                                return (
                                  <div key={index} className={`relative aspect-square bg-black border rounded overflow-hidden cursor-pointer group transition-all ${
                                    index === 0 ? 'border-2 border-[#eebf1c] shadow-md scale-105' : 'border-gray-300'
                                  }`}>
                                    {isVideo ? (
                                      <video src={imgUrl} className="w-full h-full object-cover opacity-60" muted playsInline />
                                    ) : (
                                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col gap-1 items-center justify-center">
                                      <button type="button" onClick={(e) => { e.stopPropagation(); promoteExistingBgToMain(index); }} className="bg-[#eebf1c] text-black px-1 rounded text-[8px] font-black uppercase cursor-pointer">Main</button>
                                      <button type="button" onClick={(e) => { e.stopPropagation(); clearExistingBgImage(index); }} className="bg-red-600 text-white px-1 rounded text-[8px] font-bold uppercase cursor-pointer">Remove</button>
                                    </div>
                                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[#eebf1c] font-mono text-[7px] text-center font-bold">
                                      {index === 0 ? 'MAIN' : `#${index + 1}`}
                                    </span>
                                    {isVideo && <span className="absolute top-1 right-1 text-white text-[10px]">🎥</span>}
                                  </div>
                                );
                              })}
                            </div>
                            <input type="file" multiple accept="image/*,video/mp4,video/webm" className="w-full text-xs text-black cursor-pointer pt-1 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" onChange={handleBgFileSelection} />
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSection.layout_type !== 'feature_grid' && (
                      <div className="border-4 border-dashed border-gray-300 bg-gray-50 p-6 rounded-xl text-center shadow-sm">
                        <label className="block font-black text-[11px] text-gray-700 uppercase tracking-widest mb-4">🔬 FEATURED / INLINE IMAGE LAYER</label>
                        
                        <div className="flex justify-center mb-6">
                          {sectionInlineFile ? (
                            <div className="relative aspect-square w-32 border-2 border-amber-500 rounded overflow-hidden bg-white group shadow-sm">
                              <img src={URL.createObjectURL(sectionInlineFile)} className="w-full h-full object-cover" alt="" />
                              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <button type="button" onClick={() => setSectionInlineFile(null)} className="bg-red-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase cursor-pointer shadow-md">Clear</button>
                              </div>
                              <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black font-mono text-[8px] text-center font-bold py-0.5">STAGED</span>
                            </div>
                          ) : editingSection.inline_image_url ? (
                            <div className="relative aspect-square w-32 border border-gray-300 rounded overflow-hidden bg-white group shadow-sm">
                              <img src={editingSection.inline_image_url} className="w-full h-full object-cover" alt="" />
                              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <button type="button" onClick={() => setEditingSection({...editingSection, inline_image_url: ''})} className="bg-red-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase cursor-pointer shadow-md">Remove</button>
                              </div>
                              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white font-mono text-[8px] text-center font-bold py-0.5">EXISTING</span>
                            </div>
                          ) : (
                            <div className="aspect-square w-32 bg-gray-100 border border-gray-300 border-dashed rounded flex flex-col items-center justify-center text-gray-400 text-[10px] p-2 font-mono gap-2">
                              <span className="text-xl">🖼️</span>
                              NO IMAGE
                            </div>
                          )}
                        </div>

                        <div className="w-full bg-white border border-gray-200 p-2 rounded-lg mb-6">
                          <input type="file" accept="image/*" className="w-full text-xs text-black cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-colors" onChange={e => setSectionInlineFile(e.target.files[0])} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                          <div className="flex flex-col gap-2 text-left">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Position on Screen</span>
                            <select className="w-full bg-white border border-gray-300 text-black rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#eebf1c] shadow-sm" value={editingSection.inline_image_position || 'center'} onChange={e => handleEditSectionChange('inline_image_position', e.target.value)}>
                              <option value="center">Centered</option>
                              <option value="left">Left Side of Content</option>
                              <option value="right">Right Side of Content</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 text-left">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Image Backplate Style</span>
                            <select className="w-full bg-white border border-gray-300 text-black rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#eebf1c] shadow-sm" value={editingSection.inline_bg_style || 'transparent'} onChange={e => handleEditSectionChange('inline_bg_style', e.target.value)}>
                              <option value="transparent">Transparent (None)</option>
                              <option value="black">Solid Black Frame</option>
                              <option value="white">Solid White Frame</option>
                              <option value="brand-gold">Company Gold Frame</option>
                              <option value="brand-green">Company Green Frame</option>
                              <option value="glass-dark">Frosted Dark Glass</option>
                              <option value="glass-light">Frosted Light Glass</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSection.layout_type === 'feature_grid' && (
                      <div className="border border-gray-200 rounded-lg p-3 bg-[#eebf1c]/10 space-y-4 shadow-inner">
                        <label className="block font-black text-[10px] text-[#04351e] uppercase tracking-widest border-b border-[#eebf1c]/20 pb-1">🔲 Feature Grid Data Options</label>
                        
                        <div className="space-y-8">
                          
                          {/* COLUMN 1 */}
                          <div className="bg-white border border-[#eebf1c]/30 rounded p-6 shadow-sm space-y-4">
                             <span className="text-sm font-black text-[#04351e] uppercase block border-b border-gray-100 pb-2">Column 1 (Left)</span>
                             
                             <input type="text" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 1 Title" value={editingSection.feature1_title || ''} onChange={e => handleEditSectionChange('feature1_title', e.target.value)} />
                             <textarea rows="4" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 1 Description." value={editingSection.feature1_text || ''} onChange={e => handleEditSectionChange('feature1_text', e.target.value)}></textarea>
                             
                             <div className="border-t border-gray-100 pt-4">
                               <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                 <span className="text-xs font-bold text-gray-500 uppercase block">Background Image</span>
                                 {editingSection.feature1_bg && (
                                   <button type="button" onClick={() => handleEditSectionChange('feature1_bg', '')} className="text-[10px] bg-red-100 text-red-600 px-3 py-1.5 rounded uppercase font-bold hover:bg-red-200 cursor-pointer">Clear Image</button>
                                 )}
                               </div>
                               <input type="file" accept="image/*" className="w-full text-xs" onChange={e => setFeature1BgFile(e.target.files[0])} />
                             </div>

                             <div className="border-t border-[#eebf1c]/30 pt-4">
                               <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                 <input type="checkbox" checked={editingSection.btn1_enabled || false} onChange={e => handleEditSectionChange('btn1_enabled', e.target.checked)} className="accent-[#eebf1c] w-4 h-4" />
                                 <span className="text-xs font-black text-[#04351e] uppercase tracking-wider">Enable Button 1</span>
                               </label>
                               {editingSection.btn1_enabled && (
                                 <div className="space-y-3 animate-fade-in bg-gray-50 p-4 rounded border border-gray-200">
                                   <input type="text" placeholder="Button Label" value={editingSection.btn1_text || ''} onChange={e => handleEditSectionChange('btn1_text', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   <input type="text" placeholder="Link Destination (/contact)" value={editingSection.btn1_link || ''} onChange={e => handleEditSectionChange('btn1_link', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   
                                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 pt-2">
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn_color', e.target.value)}>
                                       <option value="brand-gold">🟡 Company Gold</option>
                                       <option value="brand-green">🟢 Company Green</option>
                                       <option value="white">⚪ White</option>
                                       <option value="black">⚫ Black</option>
                                       <option value="silver">🔘 Silver/Gray</option>
                                       <option value="red">🔴 Crimson Red</option>
                                       <option value="blue">🔵 Royal Blue</option>
                                       <option value="purple">🟣 Deep Purple</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn_style || 'solid'} onChange={e => handleEditSectionChange('btn_style', e.target.value)}>
                                       <option value="solid">Solid Fill</option><option value="outline">Outline</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn_font || 'sans'} onChange={e => handleEditSectionChange('btn_font', e.target.value)}>
                                       <option value="sans">Sans-Serif Font</option><option value="serif">Serif Font</option><option value="mono">Monospace</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn_radius || 'rounded-lg'} onChange={e => handleEditSectionChange('btn_radius', e.target.value)}>
                                       <option value="rounded-lg">Rounded Shape</option><option value="square">Square Shape</option><option value="pill">Pill Shape</option>
                                     </select>
                                     <select className="col-span-1 xl:col-span-2 w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn_hover_anim || 'lift'} onChange={e => handleEditSectionChange('btn_hover_anim', e.target.value)}>
                                       <option value="lift">Lift Animation</option><option value="glow">Glow Animation</option><option value="none">No Animation</option>
                                     </select>
                                   </div>
                                 </div>
                               )}
                             </div>
                          </div>
                          
                          {/* COLUMN 2 */}
                          <div className="bg-white border border-[#eebf1c]/30 rounded p-6 shadow-sm space-y-4">
                             <span className="text-sm font-black text-[#04351e] uppercase block border-b border-gray-100 pb-2">Column 2 (Center)</span>
                             
                             <input type="text" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 2 Title" value={editingSection.feature2_title || ''} onChange={e => handleEditSectionChange('feature2_title', e.target.value)} />
                             <textarea rows="4" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 2 Description." value={editingSection.feature2_text || ''} onChange={e => handleEditSectionChange('feature2_text', e.target.value)}></textarea>
                             
                             <div className="border-t border-gray-100 pt-4">
                               <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                 <span className="text-xs font-bold text-gray-500 uppercase block">Background Image</span>
                                 {editingSection.feature2_bg && (
                                   <button type="button" onClick={() => handleEditSectionChange('feature2_bg', '')} className="text-[10px] bg-red-100 text-red-600 px-3 py-1.5 rounded uppercase font-bold hover:bg-red-200 cursor-pointer">Clear Image</button>
                                 )}
                               </div>
                               <input type="file" accept="image/*" className="w-full text-xs" onChange={e => setFeature2BgFile(e.target.files[0])} />
                             </div>

                             <div className="border-t border-[#eebf1c]/30 pt-4">
                               <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                 <input type="checkbox" checked={editingSection.btn2_enabled || false} onChange={e => handleEditSectionChange('btn2_enabled', e.target.checked)} className="accent-[#eebf1c] w-4 h-4" />
                                 <span className="text-xs font-black text-[#04351e] uppercase tracking-wider">Enable Button 2</span>
                               </label>
                               {editingSection.btn2_enabled && (
                                 <div className="space-y-3 animate-fade-in bg-gray-50 p-4 rounded border border-gray-200">
                                   <input type="text" placeholder="Button Label" value={editingSection.btn2_text || ''} onChange={e => handleEditSectionChange('btn2_text', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   <input type="text" placeholder="Link Destination (/contact)" value={editingSection.btn2_link || ''} onChange={e => handleEditSectionChange('btn2_link', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   
                                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 pt-2">
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn2_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn2_color', e.target.value)}>
                                       <option value="brand-gold">🟡 Company Gold</option>
                                       <option value="brand-green">🟢 Company Green</option>
                                       <option value="white">⚪ White</option>
                                       <option value="black">⚫ Black</option>
                                       <option value="silver">🔘 Silver/Gray</option>
                                       <option value="red">🔴 Crimson Red</option>
                                       <option value="blue">🔵 Royal Blue</option>
                                       <option value="purple">🟣 Deep Purple</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn2_style || 'outline'} onChange={e => handleEditSectionChange('btn2_style', e.target.value)}>
                                       <option value="solid">Solid Fill</option><option value="outline">Outline</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn2_font || 'sans'} onChange={e => handleEditSectionChange('btn2_font', e.target.value)}>
                                       <option value="sans">Sans-Serif Font</option><option value="serif">Serif Font</option><option value="mono">Monospace</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn2_radius || 'rounded-lg'} onChange={e => handleEditSectionChange('btn2_radius', e.target.value)}>
                                       <option value="rounded-lg">Rounded Shape</option><option value="square">Square Shape</option><option value="pill">Pill Shape</option>
                                     </select>
                                     <select className="col-span-1 xl:col-span-2 w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn2_hover_anim || 'lift'} onChange={e => handleEditSectionChange('btn2_hover_anim', e.target.value)}>
                                       <option value="lift">Lift Animation</option><option value="glow">Glow Animation</option><option value="none">No Animation</option>
                                     </select>
                                   </div>
                                 </div>
                               )}
                             </div>
                          </div>

                          {/* COLUMN 3 */}
                          <div className="bg-white border border-[#eebf1c]/30 rounded p-6 shadow-sm space-y-4">
                             <span className="text-sm font-black text-[#04351e] uppercase block border-b border-gray-100 pb-2">Column 3 (Right)</span>
                             
                             <input type="text" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 3 Title" value={editingSection.feature3_title || ''} onChange={e => handleEditSectionChange('feature3_title', e.target.value)} />
                             <textarea rows="4" className="w-full bg-white border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c]" placeholder="Col 3 Description." value={editingSection.feature3_text || ''} onChange={e => handleEditSectionChange('feature3_text', e.target.value)}></textarea>
                             
                             <div className="border-t border-gray-100 pt-4">
                               <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                 <span className="text-xs font-bold text-gray-500 uppercase block">Background Image</span>
                                 {editingSection.feature3_bg && (
                                   <button type="button" onClick={() => handleEditSectionChange('feature3_bg', '')} className="text-[10px] bg-red-100 text-red-600 px-3 py-1.5 rounded uppercase font-bold hover:bg-red-200 cursor-pointer">Clear Image</button>
                                 )}
                               </div>
                               <input type="file" accept="image/*" className="w-full text-xs" onChange={e => setFeature3BgFile(e.target.files[0])} />
                             </div>

                             <div className="border-t border-[#eebf1c]/30 pt-4">
                               <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                 <input type="checkbox" checked={editingSection.btn3_enabled || false} onChange={e => handleEditSectionChange('btn3_enabled', e.target.checked)} className="accent-[#eebf1c] w-4 h-4" />
                                 <span className="text-xs font-black text-[#04351e] uppercase tracking-wider">Enable Button 3</span>
                               </label>
                               {editingSection.btn3_enabled && (
                                 <div className="space-y-3 animate-fade-in bg-gray-50 p-4 rounded border border-gray-200">
                                   <input type="text" placeholder="Button Label" value={editingSection.btn3_text || ''} onChange={e => handleEditSectionChange('btn3_text', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   <input type="text" placeholder="Link Destination (/contact)" value={editingSection.btn3_link || ''} onChange={e => handleEditSectionChange('btn3_link', e.target.value)} className="w-full bg-white border border-gray-300 rounded p-2.5 text-black text-sm focus:outline-none focus:border-[#eebf1c]" />
                                   
                                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 pt-2">
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn3_color || 'brand-gold'} onChange={e => handleEditSectionChange('btn3_color', e.target.value)}>
                                       <option value="brand-gold">🟡 Company Gold</option>
                                       <option value="brand-green">🟢 Company Green</option>
                                       <option value="white">⚪ White</option>
                                       <option value="black">⚫ Black</option>
                                       <option value="silver">🔘 Silver/Gray</option>
                                       <option value="red">🔴 Crimson Red</option>
                                       <option value="blue">🔵 Royal Blue</option>
                                       <option value="purple">🟣 Deep Purple</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn3_style || 'solid'} onChange={e => handleEditSectionChange('btn3_style', e.target.value)}>
                                       <option value="solid">Solid Fill</option><option value="outline">Outline</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn3_font || 'sans'} onChange={e => handleEditSectionChange('btn3_font', e.target.value)}>
                                       <option value="sans">Sans-Serif Font</option><option value="serif">Serif Font</option><option value="mono">Monospace</option>
                                     </select>
                                     <select className="w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn3_radius || 'rounded-lg'} onChange={e => handleEditSectionChange('btn3_radius', e.target.value)}>
                                       <option value="rounded-lg">Rounded Shape</option><option value="square">Square Shape</option><option value="pill">Pill Shape</option>
                                     </select>
                                     <select className="col-span-1 xl:col-span-2 w-full bg-white border border-gray-300 rounded p-1.5 text-[10px]" value={editingSection.btn3_hover_anim || 'lift'} onChange={e => handleEditSectionChange('btn3_hover_anim', e.target.value)}>
                                       <option value="lift">Lift Animation</option><option value="glow">Glow Animation</option><option value="none">No Animation</option>
                                     </select>
                                   </div>
                                 </div>
                               )}
                             </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="sticky bottom-4 z-50 bg-white border border-gray-200 p-4 rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mt-8 flex flex-col gap-2">
                      <button type="submit" disabled={savingSection} className="w-full bg-[#04351e] text-[#eebf1c] font-black py-4 rounded uppercase tracking-widest hover:bg-[#eebf1c] hover:text-[#04351e] transition-colors text-sm cursor-pointer border-2 border-[#eebf1c]">
                        {savingSection ? 'Saving to Vault...' : 'Commit All Changes & Uploads'}
                      </button>
                      <button type="button" onClick={() => handleDeleteSection(editingSection.id)} className="w-full border-2 border-red-500/30 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2.5 rounded uppercase transition-all tracking-wider text-center cursor-pointer">
                        Delete Block Section
                      </button>
                    </div>

                  </form>
                ) : (
                  <form onSubmit={handleCreateSection} className="space-y-4">
                    <h3 className="font-serif text-base uppercase font-bold text-black">Initialize Homepage Block</h3>
                    <div>
                      <select className="w-full border border-gray-300 rounded p-3 bg-white shadow-sm font-semibold text-black focus:outline-none focus:border-[#eebf1c]" value={newSectionType} onChange={e => setNewSectionType(e.target.value)}>
                        <option value="hero_banner">1. Headline Billboard Hero</option>
                        <option value="text_with_image">2. Text & Featured Image Accent</option>
                        <option value="promo_banner">3. Full-Width Highlight Stripe</option>
                        <option value="rich_text">4. Centered Paragraph Anchor</option>
                        <option value="feature_grid">5. Multi-Feature Column Grid</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-[#eebf1c] text-[#04351e] font-black py-3 rounded uppercase tracking-wider shadow cursor-pointer hover:bg-yellow-500 transition-colors">Add New Block Section Layout</button>
                  </form>
                )}
              </div>

              <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-4">
                <h3 className="font-serif text-sm uppercase font-bold border-b border-gray-200 pb-3 text-black">Active Homepage Blocks</h3>
                <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 mt-4">
                  {cleanHomeSections.filter(s => s.layout_type !== 'global_config').map((section, index) => (
                    <div key={section.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 text-black hover:shadow-sm transition-shadow gap-2">
                      <div className="flex flex-col gap-1 pr-4 border-r border-gray-300">
                        <button type="button" onClick={() => handleMoveSection(index, 'up')} className={`text-lg p-0.5 rounded transition-colors ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer'}`}>&#8593;</button>
                        <button type="button" onClick={() => handleMoveSection(index, 'down')} className={`text-lg p-0.5 rounded transition-colors ${index === cleanHomeSections.filter(s => s.layout_type !== 'global_config').length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer'}`}>&#8595;</button>
                      </div>
                      <div className="flex-grow pl-2 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[9px] text-[#04351e] bg-[#eebf1c] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{section.layout_type.replace('_', ' ')}</span>
                          <p className="font-serif text-sm font-bold text-black truncate">{section.title}</p>
                        </div>
                        
                        {/* HIGHLY VISIBLE SECTION SUMMARY BOX */}
                        <div className="bg-white border border-gray-200 p-2 rounded text-[10px] text-gray-500 font-mono italic mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap shadow-inner">
                          "{getSectionSummary(section)}"
                        </div>

                      </div>
                      <button type="button" onClick={() => handleStartSectionConfig(section)} className="border border-gray-300 px-4 py-2 text-[10px] rounded font-bold uppercase text-black bg-white shadow-sm hover:bg-gray-100 cursor-pointer transition-colors flex-shrink-0 ml-2">Configure</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CONTEXTUAL HELP GUIDE */}
        <div className="hidden xl:block w-1/4 flex-shrink-0">
          <AdminGuide activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}