import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoriesBar } from './components/CategoriesBar';
import { ListingCard } from './components/ListingCard';
import { MapView } from './components/MapView';
import { DetailModal } from './components/DetailModal';
import { FilterModal } from './components/FilterModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HeroBanner } from './components/HeroBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { MOCK_LISTINGS } from './data/listings';
import { FilterState, Listing } from './types';
import { Map, LayoutGrid, Sparkles } from 'lucide-react';

export function App() {
  // Global filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchDestination: '',
    dateRange: null,
    guests: { adults: 1, children: 0, infants: 0, pets: 0 },
    priceRange: [100, 2000],
    propertyType: [],
    amenities: [],
    showTotalWithTaxes: false,
    minBedrooms: 0,
  });

  // UI state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['stay-1', 'stay-3']);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');

  // Toggle wishlist
  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      // Destination search
      if (
        filters.searchDestination &&
        !item.location.toLowerCase().includes(filters.searchDestination.toLowerCase()) &&
        !item.title.toLowerCase().includes(filters.searchDestination.toLowerCase()) &&
        !item.region.toLowerCase().includes(filters.searchDestination.toLowerCase())
      ) {
        return false;
      }
      // Price range
      if (
        item.pricePerNight < filters.priceRange[0] ||
        item.pricePerNight > filters.priceRange[1]
      ) {
        return false;
      }
      // Bedrooms
      if (filters.minBedrooms > 0 && item.specs.bedrooms < filters.minBedrooms) {
        return false;
      }
      // Total guests
      const totalRequestedGuests = filters.guests.adults + filters.guests.children;
      if (totalRequestedGuests > 1 && item.specs.guests < totalRequestedGuests) {
        return false;
      }
      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          item.amenities.some((a) => a.name.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [filters]);

  const wishlistedItems = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => wishlistIds.includes(item.id));
  }, [wishlistIds]);

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased">
      {/* Top Navbar */}
      <Header
        filters={filters}
        setFilters={setFilters}
        wishlistCount={wishlistIds.length}
        openWishlist={() => setIsWishlistOpen(true)}
        openFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Horizontal Categories Bar */}
      <CategoriesBar
        selectedCategory={filters.category}
        onSelectCategory={(id) => setFilters((prev) => ({ ...prev, category: id }))}
        showTotalWithTaxes={filters.showTotalWithTaxes}
        onToggleTotalTaxes={() =>
          setFilters((prev) => ({ ...prev, showTotalWithTaxes: !prev.showTotalWithTaxes }))
        }
        openFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Luxury Editorial Hero Banner (Option B - Plum Guide / Sonder feel) */}
        <HeroBanner
          onExploreClick={() => {
            const listingsElement = document.getElementById('explore-listings');
            if (listingsElement) {
              listingsElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Results stats & View Switcher */}
        <div id="explore-listings" className="flex items-center justify-between mb-6 scroll-mt-28">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {filteredListings.length} {filteredListings.length === 1 ? 'Stay' : 'Stays'} available
            </span>
            {filters.searchDestination && (
              <span className="text-xs bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded-full">
                in "{filters.searchDestination}"
              </span>
            )}
          </div>

          {/* Toggle between Grid View and Split Map View */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'split'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map split</span>
            </button>
          </div>
        </div>

        {/* View Mode: Full Grid */}
        {viewMode === 'grid' ? (
          <div>
            {filteredListings.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-200">
                <Sparkles className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No properties match your filter</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range, guests count, or resetting destination to find available luxury stays.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: 'all',
                      searchDestination: '',
                      dateRange: null,
                      guests: { adults: 1, children: 0, infants: 0, pets: 0 },
                      priceRange: [100, 2000],
                      propertyType: [],
                      amenities: [],
                      showTotalWithTaxes: false,
                      minBedrooms: 0,
                    })
                  }
                  className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isWishlisted={wishlistIds.includes(listing.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onClick={setSelectedListing}
                    showTotal={filters.showTotalWithTaxes}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* View Mode: Split Map + List (Airbnb / Sojourn style) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[76vh]">
            {/* Left side: Scrollable listing cards */}
            <div className="lg:col-span-6 h-full overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-8">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                  >
                    <ListingCard
                      listing={listing}
                      isWishlisted={wishlistIds.includes(listing.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onClick={setSelectedListing}
                      showTotal={filters.showTotalWithTaxes}
                      isHighlighted={hoveredListingId === listing.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Sticky interactive map with price pins */}
            <div className="lg:col-span-6 h-full sticky top-36">
              <MapView
                listings={filteredListings}
                selectedListing={selectedListing}
                onSelectListing={setSelectedListing}
              />
            </div>
          </div>
        )}

      </main>

      {/* Floating View Map / List Button for desktop / tablet */}
      <div className="hidden sm:flex fixed bottom-6 inset-x-0 justify-center z-30 pointer-events-none">
        <button
          onClick={() => setViewMode((prev) => (prev === 'grid' ? 'split' : 'grid'))}
          className="pointer-events-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition"
        >
          {viewMode === 'grid' ? (
            <>
              <Map className="w-4 h-4 text-rose-400" />
              <span>Show map</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4 text-rose-400" />
              <span>Show list</span>
            </>
          )}
        </button>
      </div>

      {/* Modern Mobile Bottom Navigation Bar (Airbnb App Experience) */}
      <MobileBottomNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        wishlistCount={wishlistIds.length}
        openWishlist={() => setIsWishlistOpen(true)}
        openFilterModal={() => setIsFilterModalOpen(true)}
        onExploreClick={() => {
          setFilters(prev => ({ ...prev, category: 'all', searchDestination: '' }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer (with extra pb for mobile bottom nav) */}
      <div className="pb-16 sm:pb-0">
        <Footer />
      </div>

      {/* Detail Modal */}
      {selectedListing && (
        <DetailModal
          listing={selectedListing}
          isOpen={!!selectedListing}
          onClose={() => setSelectedListing(null)}
          isWishlisted={wishlistIds.includes(selectedListing.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredListings.length}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedListings={wishlistedItems}
        onRemoveWishlist={handleToggleWishlist}
        onSelectListing={setSelectedListing}
      />
    </div>
  );
}

export default App;
