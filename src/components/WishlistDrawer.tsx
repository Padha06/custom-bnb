import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Listing } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedListings: Listing[];
  onRemoveWishlist: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedListings,
  onRemoveWishlist,
  onSelectListing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Saved Stays</h2>
            <p className="text-xs text-slate-500">
              {wishlistedListings.length} {wishlistedListings.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedListings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                ❤️
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No saved stays yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Click the heart icon on any listing to save your favorite destinations for your next trip.
              </p>
            </div>
          ) : (
            wishlistedListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xs transition bg-white group"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectListing(listing);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onSelectListing(listing);
                      onClose();
                    }}
                    className="text-xs font-bold text-slate-900 truncate hover:text-rose-600 cursor-pointer"
                  >
                    {listing.location}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{listing.title}</p>
                  <div className="mt-1 text-xs font-bold text-slate-900">
                    ${listing.pricePerNight} <span className="font-normal text-slate-500 text-[10px]">/ night</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveWishlist(listing.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedListings.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-sm"
            >
              <span>Continue browsing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
