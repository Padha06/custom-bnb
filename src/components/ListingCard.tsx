import React, { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onClick: (listing: Listing) => void;
  showTotal: boolean;
  isHighlighted?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isWishlisted,
  onToggleWishlist,
  onClick,
  showTotal,
  isHighlighted,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  // Estimated 5 nights
  const nightsCount = 5;
  const totalPrice = listing.pricePerNight * nightsCount + listing.cleaningFee;

  return (
    <div
      onClick={() => onClick(listing)}
      className={`group flex flex-col cursor-pointer rounded-2xl transition duration-300 relative ${
        isHighlighted ? 'ring-2 ring-rose-500 scale-[1.01] shadow-xl' : 'hover:-translate-y-1 hover:shadow-lg'
      }`}
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
        <img
          src={listing.images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full hover:scale-115 active:scale-90 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-6 h-6 stroke-[2] drop-shadow-md ${
              isWishlisted
                ? 'fill-rose-500 text-rose-500 stroke-rose-500'
                : 'fill-black/30 text-white stroke-white'
            }`}
          />
        </button>

        {/* Badge (Guest Favorite / Luxe / Rare Find) */}
        {listing.badge && (
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              {listing.badge}
            </span>
          </div>
        )}

        {/* Carousel Prev/Next Arrows */}
        {listing.images.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md hover:scale-105 transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md hover:scale-105 transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dots indicator */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center gap-1.5 z-10">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? 'w-2 h-2 bg-white scale-110 shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Listing Meta Information */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-sm tracking-tight truncate">
            {listing.location}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 truncate mt-0.5">{listing.subtitle}</p>
        <p className="text-xs text-slate-500 mt-0.5">{listing.dates}</p>

        <div className="mt-2 text-sm flex items-baseline gap-1">
          {showTotal ? (
            <>
              <span className="font-bold text-slate-950">${totalPrice.toLocaleString()}</span>
              <span className="text-xs text-slate-500">total before taxes</span>
            </>
          ) : (
            <>
              <span className="font-bold text-slate-950">${listing.pricePerNight}</span>
              <span className="text-xs text-slate-500">night</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
