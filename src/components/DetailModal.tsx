import React, { useState } from 'react';
import {
  X,
  Star,
  Share2,
  Heart,
  ShieldCheck,
  Award,
  Calendar,
  Sparkles,
  Wifi,
  Waves,
  Flame,
  Utensils,
  Wind,
  Zap,
  Bath,
  CheckCircle2,
} from 'lucide-react';
import { Listing } from '../types';
import confetti from 'canvas-confetti';

const ICON_AMENITY_MAP: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Bath: <Bath className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

interface DetailModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [nights, setNights] = useState(5);
  const [guestsCount, setGuestsCount] = useState(2);
  const [isBooked, setIsBooked] = useState(false);
  const [activePhotoGallery, setActivePhotoGallery] = useState(false);

  if (!isOpen) return null;

  const baseTotal = listing.pricePerNight * nights;
  const serviceFee = Math.round(baseTotal * listing.serviceFeeRate);
  const total = baseTotal + listing.cleaningFee + serviceFee;

  const handleReserve = () => {
    setIsBooked(true);
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-start p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl my-auto relative">
        
        {/* Sticky top action bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-slate-900 hidden sm:inline">
              {listing.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Listing link copied to clipboard!');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => onToggleWishlist(listing.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
                }`}
              />
              <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {listing.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs md:text-sm text-slate-600">
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                <span>{listing.rating.toFixed(2)}</span>
                <span className="font-normal text-slate-500 underline ml-1 cursor-pointer">
                  {listing.reviewCount} reviews
                </span>
              </div>
              <span>•</span>
              <span className="font-semibold text-slate-900">{listing.location}</span>
              {listing.badge && (
                <>
                  <span>•</span>
                  <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold text-xs">
                    {listing.badge}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 5-Photo Mosaic Gallery (Airbnb signature) */}
          <div className="mt-6 relative rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] md:h-[460px]">
            <div className="md:col-span-2 h-full overflow-hidden">
              <img
                src={listing.images[0]}
                alt="Main view"
                className="w-full h-full object-cover hover:scale-102 transition duration-500 cursor-pointer"
                onClick={() => setActivePhotoGallery(true)}
              />
            </div>
            <div className="hidden md:grid col-span-1 grid-rows-2 gap-2 h-full">
              <img
                src={listing.images[1] || listing.images[0]}
                alt="Detail view 1"
                className="w-full h-full object-cover hover:scale-102 transition duration-500 cursor-pointer"
                onClick={() => setActivePhotoGallery(true)}
              />
              <img
                src={listing.images[2] || listing.images[0]}
                alt="Detail view 2"
                className="w-full h-full object-cover hover:scale-102 transition duration-500 cursor-pointer"
                onClick={() => setActivePhotoGallery(true)}
              />
            </div>
            <div className="hidden md:grid col-span-1 grid-rows-2 gap-2 h-full">
              <img
                src={listing.images[3] || listing.images[0]}
                alt="Detail view 3"
                className="w-full h-full object-cover hover:scale-102 transition duration-500 cursor-pointer"
                onClick={() => setActivePhotoGallery(true)}
              />
              <img
                src={listing.images[4] || listing.images[1] || listing.images[0]}
                alt="Detail view 4"
                className="w-full h-full object-cover hover:scale-102 transition duration-500 cursor-pointer"
                onClick={() => setActivePhotoGallery(true)}
              />
            </div>

            <button
              onClick={() => setActivePhotoGallery(true)}
              className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-slate-800 shadow-lg border border-slate-200 hover:bg-white transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Show all {listing.images.length} photos</span>
            </button>
          </div>

          {/* Full Screen Photo Gallery Lightbox */}
          {activePhotoGallery && (
            <div className="fixed inset-0 z-50 bg-black/95 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="flex justify-between items-center text-white mb-4">
                <span className="font-bold text-sm">{listing.title} — Photos</span>
                <button
                  onClick={() => setActivePhotoGallery(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="max-w-4xl mx-auto space-y-6">
                {listing.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="w-full rounded-2xl shadow-2xl object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Content Split: Left (Details) & Right (Booking Card) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Description, Host, Amenities */}
            <div className="lg:col-span-2 space-y-8 divide-y divide-slate-100">
              
              {/* Host & Specs header */}
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Hosted by {listing.host.name}
                  </h2>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                    <span>{listing.specs.guests} guests</span>
                    <span>•</span>
                    <span>{listing.specs.bedrooms} bedrooms</span>
                    <span>•</span>
                    <span>{listing.specs.beds} beds</span>
                    <span>•</span>
                    <span>{listing.specs.baths} baths</span>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-rose-500"
                  />
                  {listing.host.isSuperhost && (
                    <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow">
                      <Award className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Highlights badge list */}
              <div className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Experienced Superhost</h4>
                    <p className="text-xs text-slate-500">
                      {listing.host.name} has {listing.host.yearsHosting} years of hospitality excellence and 100% 5-star ratings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Aura Verified Clean</h4>
                    <p className="text-xs text-slate-500">
                      10-step rigorous sanitization and safety protocol verified prior to each arrival.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">About this space</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="text-slate-600">
                        {ICON_AMENITY_MAP[amenity.icon] || <CheckCircle2 className="w-5 h-5 text-rose-500" />}
                      </div>
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Reservation Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-900/5">
                
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <span className="text-2xl font-black text-slate-950">${listing.pricePerNight}</span>
                    <span className="text-slate-500 text-xs"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                    <span>{listing.rating.toFixed(2)}</span>
                    <span className="text-slate-400">({listing.reviewCount})</span>
                  </div>
                </div>

                {/* Booking Input Fields */}
                <div className="border border-slate-300 rounded-2xl overflow-hidden mb-4">
                  <div className="grid grid-cols-2 border-b border-slate-300 divide-x divide-slate-300">
                    <div className="p-3">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                        Check-in
                      </label>
                      <input
                        type="date"
                        defaultValue="2026-05-12"
                        className="w-full text-xs font-semibold text-slate-800 focus:outline-none mt-0.5 bg-transparent"
                      />
                    </div>
                    <div className="p-3">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                        Checkout
                      </label>
                      <input
                        type="date"
                        defaultValue="2026-05-17"
                        className="w-full text-xs font-semibold text-slate-800 focus:outline-none mt-0.5 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full text-xs font-semibold text-slate-800 focus:outline-none mt-0.5 bg-transparent cursor-pointer"
                    >
                      {Array.from({ length: listing.specs.guests }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} guest{i > 0 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reserve Button */}
                {!isBooked ? (
                  <button
                    onClick={handleReserve}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-98 transition shadow-lg shadow-rose-500/25 cursor-pointer"
                  >
                    Reserve Now
                  </button>
                ) : (
                  <div className="w-full py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center text-xs font-bold animate-in fade-in">
                    🎉 Booking Request Confirmed! Check your inbox.
                  </div>
                )}

                <p className="text-center text-[11px] text-slate-400 mt-2">
                  You won't be charged yet
                </p>

                {/* Breakdown Calculation */}
                <div className="mt-5 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <span className="underline">${listing.pricePerNight} × {nights} nights</span>
                    <span>${baseTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>${listing.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Aura service fee</span>
                    <span>${serviceFee}</span>
                  </div>

                  <div className="flex justify-between font-bold text-slate-900 text-sm border-t border-slate-200 pt-3">
                    <span>Total before taxes</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
