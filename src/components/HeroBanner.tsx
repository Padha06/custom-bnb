import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Compass, X, ArrowRight, Star, Heart } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-6 md:mb-8 rounded-2xl md:rounded-3xl overflow-hidden border border-rose-100/80 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 shadow-sm animate-in fade-in duration-300">
      
      {/* Mobile-Only Background: Crisp luxury boutique hotel suite with warm ambient backlight */}
      <div className="absolute inset-0 z-0 block lg:hidden">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=90"
          alt="Luxury Bedroom Sanctuary"
          className="w-full h-full object-cover object-center opacity-40 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
      </div>

      {/* Desktop Subtle Warm Gradient Blur Orbs */}
      <div className="hidden lg:block absolute top-0 right-1/4 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 right-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Dismiss Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3.5 right-3.5 md:top-4 md:right-4 z-20 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200/60 shadow-xs backdrop-blur-sm transition-all cursor-pointer"
        title="Dismiss banner"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>

      {/* Split Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-5 sm:p-8 md:p-10">
        
        {/* Left Column: Editorial Messaging */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-rose-200/60 shadow-xs text-[11px] sm:text-xs font-semibold w-fit mb-3 sm:mb-4 text-slate-800 backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-slate-900 font-bold">The Aura Stays Collection</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-500" /> Hand-vetted
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-[1.2]">
            Curated architectural stays,{' '}
            <span className="text-rose-600 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              crafted for exceptional getaways.
            </span>
          </h1>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            From cliffside infinity villas in Amalfi to off-grid Nordic retreats and private overwater sanctuaries — every property is in-person inspected for architectural design, comfort, and hospitality.
          </p>

          {/* Trust Badges */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% In-Person Vetted</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Transparent Total Pricing</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>24/7 Dedicated Concierge</span>
            </div>
          </div>

          {/* CTA & Rating Proof */}
          <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl sm:rounded-2xl shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Explore All Stays</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 sm:-space-x-2 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Guest"
                />
                <img
                  className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Guest"
                />
                <img
                  className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                  alt="Guest"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.98 / 5.0</span>
                </div>
                <span className="text-[10px] text-slate-500">1,200+ verified guests</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Desktop Architectural Card Preview with Float Elements (Hidden on mobile to preserve perfect mobile layout) */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative mx-auto w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-white bg-white p-2.5">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                alt="Amalfi Coast Villa"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-900 shadow-xs">
                Featured Villa
              </span>
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-rose-500 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Positano, Amalfi Coast</span>
                <div className="flex items-center gap-0.5 font-bold text-slate-800">
                  <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                  <span>4.98</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Cliffside Glass Pavilion & Infinity Pool</p>
              <div className="mt-2 flex items-baseline gap-1 text-xs">
                <span className="font-bold text-slate-900 text-sm">$580</span>
                <span className="text-slate-500 text-[11px]">/ night</span>
              </div>
            </div>
          </div>

          {/* Floating Pill Badge */}
          <div className="absolute -bottom-3 -left-4 bg-white/95 backdrop-blur-md border border-slate-200/80 px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900">Superhost Verified</div>
              <div className="text-[9px] text-slate-500">100% 5-Star Cleanliness</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
