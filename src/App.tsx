import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SearchBar } from './components/SearchBar';
import { LocationSelector } from './components/LocationSelector';
import { PopularCategories } from './components/PopularCategories';
import { TrustSection } from './components/TrustSection';
import { NearbyServices } from './components/NearbyServices';
import { AppInstallBanner } from './components/AppInstallBanner';
import { BottomNavigation, TabType } from './components/BottomNavigation';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { AddServiceModal } from './components/AddServiceModal';
import { InteractiveMapView } from './components/InteractiveMapView';
import { NotificationsModal } from './components/NotificationsModal';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { ServicesDirectoryView } from './components/ServicesDirectoryView';
import { FavoritesView } from './components/FavoritesView';
import { AccountView } from './components/AccountView';
import { INITIAL_SERVICES, INITIAL_NOTIFICATIONS } from './data/servicesData';
import { ServiceItem, ServiceCategory, Upazila, NotificationItem } from './types';
import { Search, Compass, AlertCircle, Phone, ArrowRight } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'bhola_seba_favorites_v1';
const USER_SERVICES_STORAGE_KEY = 'bhola_seba_user_services_v1';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila>('চরফ্যাশন');

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Data State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(USER_SERVICES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ServiceItem[];
        return [...parsed, ...INITIAL_SERVICES];
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_SERVICES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as string[];
      }
    } catch {
      // fallback
    }
    // Default favorite the health complex for instant test
    return ['char-fasson-health-complex'];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals & Drawers State
  const [selectedServiceForDetails, setSelectedServiceForDetails] = useState<ServiceItem | null>(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add new business / service from form
  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => {
      const updated = [newService, ...prev];
      try {
        const userAdded = updated.filter((s) => s.isUserAdded);
        localStorage.setItem(USER_SERVICES_STORAGE_KEY, JSON.stringify(userAdded));
      } catch (err) {
        console.error('Failed to save user service', err);
      }
      return updated;
    });

    // Also push a notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'নতুন প্রতিষ্ঠান যুক্ত হয়েছে',
      message: `“${newService.banglaName}” সফলভাবে ডিরেক্টরিতে যুক্ত হয়েছে।`,
      time: 'এইমাত্র',
      isRead: false,
      type: 'service',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Mark all notifications read
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Handlers for home categories
  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setActiveTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search submit from home search bar
  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      setActiveTab('search');
    }
  };

  const handleSearchTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActiveTab('search');
  };

  // Search Results Filter for the dedicated Search tab
  const searchResults = services.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesName =
      item.banglaName.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
    const matchesCategory =
      item.categoryBangla.toLowerCase().includes(q) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(q));
    const matchesAddress =
      item.address.toLowerCase().includes(q) ||
      (item.union && item.union.toLowerCase().includes(q)) ||
      item.upazila.toLowerCase().includes(q);
    const matchesServices = item.servicesOffered.some((s) => s.toLowerCase().includes(q));
    const matchesPhone = item.phone.includes(q);

    return matchesName || matchesCategory || matchesAddress || matchesServices || matchesPhone;
  });

  const userAddedCount = services.filter((s) => s.isUserAdded).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800 font-['Hind_Siliguri',sans-serif]">
      {/* Centered Mobile App Container: Maximum width on desktop for perfect mobile app ergonomics */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-2xl relative flex flex-col">
        {/* Sticky Header */}
        <Header
          unreadCount={unreadNotificationsCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenMenu={() => setIsSideMenuOpen(true)}
          onLogoClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content Area based on Active Tab */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="pb-24 animate-in fade-in duration-150">
              {/* 1. Scenic Char Fasson River & Bridge Hero Banner */}
              <HeroBanner
                selectedUpazila={selectedUpazila}
                onExploreClick={() => {
                  setActiveTab('directory');
                }}
              />

              {/* 2. Floating Search Bar matching Screenshot */}
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
                onTagClick={handleSearchTagClick}
              />

              {/* 3. Location Selector & Map trigger */}
              <LocationSelector
                selectedUpazila={selectedUpazila}
                onSelectUpazila={(upz) => setSelectedUpazila(upz)}
                onOpenMap={() => setIsMapOpen(true)}
              />

              {/* 4. Popular Services 4-Column Grid with Pastel Colors */}
              <PopularCategories
                onSelectCategory={handleCategoryClick}
                onViewAllCategories={() => {
                  setSelectedCategory(null);
                  setActiveTab('directory');
                }}
              />

              {/* 5. Trust Section (3 Pillars: যাচাইকৃত তথ্য, সরাসরি যোগাযোগ, স্থানীয় সেবা) */}
              <TrustSection />

              {/* 6. Nearby Services Section (Card Carousel) */}
              <NearbyServices
                services={services}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenDetails={(service) => setSelectedServiceForDetails(service)}
                onViewAllNearby={() => {
                  setSelectedCategory(null);
                  setActiveTab('directory');
                }}
              />

              {/* 7. App Install Promotional Banner */}
              <AppInstallBanner />
            </div>
          )}

          {activeTab === 'directory' && (
            <ServicesDirectoryView
              services={services}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenDetails={(service) => setSelectedServiceForDetails(service)}
              initialCategory={selectedCategory}
              selectedUpazila={selectedUpazila}
              onSelectUpazila={(upz) => setSelectedUpazila(upz)}
              onOpenAddService={() => setIsAddServiceOpen(true)}
            />
          )}

          {activeTab === 'search' && (
            <div className="pb-24 pt-3 px-3 animate-in fade-in duration-150">
              <div className="mb-3">
                <h2 className="text-base font-bold text-slate-800">
                  সেবা ও প্রতিষ্ঠান অনুসন্ধান
                </h2>
                <p className="text-xs text-slate-500">
                  চরফ্যাশন ও ভোলা জেলার যেকোনো জরুরি তথ্য খুঁজুন
                </p>
              </div>

              {/* Live search input */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="কী খুঁজছেন? হাসপাতাল, বাস, মিস্ত্রি, বাজার..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#087A50] focus:ring-2 focus:ring-[#087A50]/20 shadow-xs"
                />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
                {['হাসপাতাল', 'বাস কাউন্টার', 'লঞ্চ টার্মিনাল', 'কাঁচাবাজার', 'মোবাইল মেরামত', 'ইলেকট্রিশিয়ান', 'রিসোর্ট'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors border ${
                        searchQuery === tag
                          ? 'bg-[#087A50] text-white border-[#087A50]'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>

              {/* Search Results Count */}
              <div className="flex items-center justify-between text-xs text-slate-500 my-2 px-1">
                <span>
                  {searchQuery ? `“${searchQuery}” এর জন্য ফলাফল:` : 'সাম্প্রতিক ও শীর্ষ সেবাসমূহ:'}
                </span>
                <span className="font-semibold text-[#087A50]">
                  {searchResults.length}টি সেবা পাওয়া গেছে
                </span>
              </div>

              {/* Results List */}
              {searchResults.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm mt-2">
                  <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    “{searchQuery}” দিয়ে কোনো সেবা পাওয়া যায়নি
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    দয়া করে অন্য কোনো নাম দিয়ে চেষ্টা করুন বা বানান যাচাই করুন।
                  </p>
                  <button
                    onClick={() => setIsAddServiceOpen(true)}
                    className="mt-4 bg-[#087A50] text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    + এই সেবাটি ডিরেক্টরিতে যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {searchResults.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceForDetails(service)}
                      className="bg-white rounded-2xl border border-slate-200 p-2.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={service.image}
                          alt={service.banglaName}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-[#087A50] bg-emerald-50 px-1.5 py-0.5 rounded-md">
                            {service.categoryBangla}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#087A50] transition-colors mt-0.5 line-clamp-1">
                            {service.banglaName}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            📍 {service.address}
                          </p>
                          <p className="text-[11px] font-bold text-[#087A50] mt-0.5">
                            📞 {service.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <a
                          href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#087A50] hover:bg-[#066341] text-white p-2 rounded-xl shadow-xs"
                          title="কল করুন"
                        >
                          <Phone className="w-3.5 h-3.5 fill-white" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              favorites={favorites}
              services={services}
              onToggleFavorite={handleToggleFavorite}
              onOpenDetails={(service) => setSelectedServiceForDetails(service)}
              onExploreHome={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'account' && (
            <AccountView
              onOpenAddService={() => setIsAddServiceOpen(true)}
              selectedUpazila={selectedUpazila}
              userAddedServicesCount={userAddedCount}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation matching screenshot */}
        <BottomNavigation
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          favoritesCount={favorites.length}
        />

        {/* Service Details Modal */}
        <ServiceDetailsModal
          service={selectedServiceForDetails}
          onClose={() => setSelectedServiceForDetails(null)}
          isFavorite={
            selectedServiceForDetails
              ? favorites.includes(selectedServiceForDetails.id)
              : false
          }
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Add Service Provider Form Modal */}
        <AddServiceModal
          isOpen={isAddServiceOpen}
          onClose={() => setIsAddServiceOpen(false)}
          onAddService={handleAddService}
          defaultUpazila={selectedUpazila}
        />

        {/* Interactive Map Modal */}
        <InteractiveMapView
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          services={services}
          onOpenServiceDetails={(service) => {
            setSelectedServiceForDetails(service);
          }}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        />

        {/* Side Menu Drawer */}
        <SideMenuDrawer
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenMap={() => setIsMapOpen(true)}
          onOpenAddService={() => setIsAddServiceOpen(true)}
        />
      </div>
    </div>
  );
}
