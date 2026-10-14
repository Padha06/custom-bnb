import React from 'react';
import { Search, Heart, Map, User, SlidersHorizontal } from 'lucide-react';

interface MobileBottomNavProps {
  viewMode: 'grid' | 'split';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'split'>>;
  wishlistCount: number;
  openWishlist: () => void;
  openFilterModal: () => void;
  onExploreClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  viewMode,
  setViewMode,
  wishlistCount,
  openWishlist,
  openFilterModal,
  onExploreClick,
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 shadow-lg">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        
        {/* Explore / Home */}
        <button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-1 text-slate-900 group"
        >
          <div className="text-rose-500 group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Explore</span>
        </button>

        {/* Map / Grid Toggle */}
        <button
          onClick={() => setViewMode(prev => (prev === 'grid' ? 'split' : 'grid'))}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 group transition-colors"
        >
          <div className="group-hover:scale-110 transition-transform text-slate-700">
            <Map className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {viewMode === 'grid' ? 'Map view' : 'List view'}
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={openWishlist}
          className="relative flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 group transition-colors"
        >
          <div className="group-hover:scale-110 transition-transform">
            <Heart
              className={`w-5 h-5 ${
                wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
              }`}
            />
          </div>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-semibold tracking-tight">Wishlists</span>
        </button>

        {/* Filters */}
        <button
          onClick={openFilterModal}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 group transition-colors"
        >
          <div className="group-hover:scale-110 transition-transform text-slate-700">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Filters</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => alert('Profile and login features are active in this demo!')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 group transition-colors"
        >
          <div className="group-hover:scale-110 transition-transform text-slate-700">
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Log in</span>
        </button>

      </div>
    </div>
  );
};
