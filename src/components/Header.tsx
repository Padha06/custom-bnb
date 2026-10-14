import React, { useState } from 'react';
import { Search, SlidersHorizontal, Globe, User, Heart, Calendar, Users, X, Sparkles } from 'lucide-react';
import type { FilterState } from '../types';

interface HeaderProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  wishlistCount: number;
  openWishlist: () => void;
  openFilterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  setFilters,
  wishlistCount,
  openWishlist,
  openFilterModal,
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'where' | 'when' | 'who'>('where');
  const [tempDestination, setTempDestination] = useState(filters.searchDestination);
  const [guests, setGuests] = useState(filters.guests);

  const POPULAR_DESTINATIONS = [
    { name: "I'm flexible", icon: 'Sparkles', desc: 'Any destination' },
    { name: 'Europe', icon: 'Globe', desc: 'Italy, France, Greece' },
    { name: 'Americas', icon: 'MapPin', desc: 'California, New York' },
    { name: 'Tropics', icon: 'Palmtree', desc: 'Bali, Bora Bora' },
    { name: 'Alpine', icon: 'Mountain', desc: 'Zermatt, Queenstown' },
  ];

  const handleApplySearch = () => {
    setFilters((prev) => ({
      ...prev,
      searchDestination: tempDestination === "I'm flexible" ? '' : tempDestination,
      guests: guests,
    }));
    setIsSearchModalOpen(false);
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <>
      {/* Sleek, Compact Navbar (Authentic Airbnb height: h-16 / 64px) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: 'all', searchDestination: '' }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            >
              <div className="group-hover:scale-105 transition-transform flex items-center">
                <img
                  src="/logo.png"
                  alt="AuraStays Emblem"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors leading-none">
                  aura<span className="text-rose-500">stays</span>
                </span>
              </div>
            </div>

            {/* Permanent Compact Search Pill inside Navbar */}
            <div
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center divide-x divide-slate-200 border border-slate-200 rounded-full py-1.5 px-3 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer bg-white"
            >
              <button className="px-3 text-xs font-semibold text-slate-800 hover:text-rose-600 transition truncate max-w-[120px] sm:max-w-none">
                {filters.searchDestination || 'Anywhere'}
              </button>
              <button className="px-3 text-xs font-semibold text-slate-800 hover:text-rose-600 transition hidden sm:inline">
                Any week
              </button>
              <div className="pl-3 pr-0.5 flex items-center gap-2.5">
                <span className="text-xs text-slate-500 font-normal hidden md:inline">
                  {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
                </span>
                <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-xs hover:bg-rose-600 transition">
                  <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Navigation Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={openFilterModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <button
                onClick={openWishlist}
                className="relative p-2 rounded-full border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                title="Saved Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                  }`}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 p-1 pl-2.5 border border-slate-200 rounded-full hover:shadow-sm transition cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  <User className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Popover / Dialog when user clicks Search (does NOT stretch the navbar or push page down) */}
      {isSearchModalOpen && (
        <div
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-start pt-16 px-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Explore stays</span>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabbed Search Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Where Tab */}
                <div
                  onClick={() => setActiveTab('where')}
                  className={`p-3 rounded-2xl cursor-pointer transition ${
                    activeTab === 'where' ? 'bg-white shadow-md border border-slate-200' : 'hover:bg-white/60'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Where</div>
                  <input
                    type="text"
                    value={tempDestination}
                    onChange={(e) => setTempDestination(e.target.value)}
                    placeholder="Search destinations"
                    className="w-full bg-transparent text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none mt-0.5"
                    autoFocus
                  />
                </div>

                {/* When Tab */}
                <div
                  onClick={() => setActiveTab('when')}
                  className={`p-3 rounded-2xl cursor-pointer transition ${
                    activeTab === 'when' ? 'bg-white shadow-md border border-slate-200' : 'hover:bg-white/60'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">When</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>May 12 – May 18</span>
                  </div>
                </div>

                {/* Who Tab */}
                <div
                  onClick={() => setActiveTab('who')}
                  className={`p-3 rounded-2xl cursor-pointer transition ${
                    activeTab === 'who' ? 'bg-white shadow-md border border-slate-200' : 'hover:bg-white/60'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Who</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-rose-500" />
                    <span>{totalGuests > 0 ? `${totalGuests} guest(s)` : 'Add guests'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'where' && (
                <div>
                  <div className="text-xs font-bold text-slate-600 mb-3">Quick regions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <button
                        key={dest.name}
                        onClick={() => setTempDestination(dest.name)}
                        className={`p-3 rounded-xl border text-left transition ${
                          tempDestination === dest.name
                            ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-xs font-semibold text-slate-900">{dest.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 truncate">{dest.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'when' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">Select trip dates</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 rounded-xl p-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Check-in</span>
                      <input
                        type="date"
                        defaultValue="2026-05-12"
                        className="w-full text-xs font-bold text-slate-800 bg-transparent mt-1 focus:outline-none"
                      />
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Checkout</span>
                      <input
                        type="date"
                        defaultValue="2026-05-18"
                        className="w-full text-xs font-bold text-slate-800 bg-transparent mt-1 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'who' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Adults</div>
                      <div className="text-[11px] text-slate-500">Ages 13+</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        disabled={guests.adults <= 1}
                        onClick={() => setGuests((g) => ({ ...g, adults: Math.max(1, g.adults - 1) }))}
                        className="w-7 h-7 rounded-full border border-slate-300 disabled:opacity-30 flex items-center justify-center font-bold text-slate-600 hover:border-slate-400"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{guests.adults}</span>
                      <button
                        onClick={() => setGuests((g) => ({ ...g, adults: g.adults + 1 }))}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:border-slate-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Children</div>
                      <div className="text-[11px] text-slate-500">Ages 2–12</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        disabled={guests.children <= 0}
                        onClick={() => setGuests((g) => ({ ...g, children: Math.max(0, g.children - 1) }))}
                        className="w-7 h-7 rounded-full border border-slate-300 disabled:opacity-30 flex items-center justify-center font-bold text-slate-600 hover:border-slate-400"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{guests.children}</span>
                      <button
                        onClick={() => setGuests((g) => ({ ...g, children: g.children + 1 }))}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:border-slate-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => {
                  setTempDestination('');
                  setGuests({ adults: 1, children: 0, infants: 0, pets: 0 });
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Clear all
              </button>

              <button
                onClick={handleApplySearch}
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md shadow-rose-500/20 transition hover:scale-102 active:scale-98"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Stays</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
