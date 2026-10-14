import React, { useState } from 'react';
import { X, Sparkles, Check, RotateCcw } from 'lucide-react';
import { FilterState } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

const PROPERTY_TYPES = [
  { id: 'villa', label: 'Villa' },
  { id: 'house', label: 'House' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'chalet', label: 'Chalet' },
  { id: 'guesthouse', label: 'Guesthouse' },
];

const AMENITY_OPTIONS = [
  'Wifi',
  'Pool',
  'Hot tub',
  'Free parking',
  'EV charger',
  'Air conditioning',
  'Kitchen',
  'Sauna',
  'Fireplace',
  'Beachfront',
];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  totalResults,
}) => {
  const [minPrice, setMinPrice] = useState(filters.priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(filters.priceRange[1]);
  const [bedrooms, setBedrooms] = useState(filters.minBedrooms);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(filters.amenities);

  if (!isOpen) return null;

  const handleApply = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
      minBedrooms: bedrooms,
      amenities: selectedAmenities,
    }));
    onClose();
  };

  const handleClear = () => {
    setMinPrice(100);
    setMaxPrice(2000);
    setBedrooms(0);
    setSelectedAmenities([]);
    setFilters(prev => ({
      ...prev,
      priceRange: [100, 2000],
      minBedrooms: 0,
      amenities: [],
    }));
  };

  const toggleAmenity = (item: string) => {
    setSelectedAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm text-slate-900">Filters</span>
          <div className="w-8" />
        </div>

        {/* Filter Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 divide-y divide-slate-100">
          
          {/* Price Range Histogram Simulation */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Price range</h3>
              <p className="text-xs text-slate-500">Nightly prices before taxes and fees</p>
            </div>

            {/* Simulated Price Bar Graph */}
            <div className="flex items-end gap-1.5 h-16 pt-4 px-2">
              {[35, 45, 60, 90, 100, 85, 70, 55, 40, 65, 80, 50, 30, 20, 15, 10].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-rose-200 rounded-t-sm hover:bg-rose-400 transition"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-300 rounded-2xl p-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Minimum</span>
                <div className="flex items-center text-sm font-bold text-slate-900 mt-1">
                  <span>$</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full bg-transparent focus:outline-none pl-1"
                  />
                </div>
              </div>

              <div className="border border-slate-300 rounded-2xl p-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Maximum</span>
                <div className="flex items-center text-sm font-bold text-slate-900 mt-1">
                  <span>$</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full bg-transparent focus:outline-none pl-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rooms and Beds */}
          <div className="pt-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {['Any', '1', '2', '3', '4', '5+'].map((opt, idx) => {
                const isSelected = (idx === 0 && bedrooms === 0) || bedrooms === idx;
                return (
                  <button
                    key={opt}
                    onClick={() => setBedrooms(idx === 0 ? 0 : idx)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amenities Pills */}
          <div className="pt-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {AMENITY_OPTIONS.map((item) => {
                const isChecked = selectedAmenities.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition ${
                      isChecked
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span>{item}</span>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 underline hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>

          <button
            onClick={handleApply}
            className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition hover:scale-102"
          >
            Show {totalResults} places
          </button>
        </div>

      </div>
    </div>
  );
};
