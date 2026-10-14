import React from 'react';
import {
  Sparkles,
  MountainSnow,
  Palmtree,
  Home,
  Castle,
  Waves,
  Tent,
  Compass,
  Sun,
  Wine,
  Snowflake,
  Building2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIES } from '../data/listings';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  MountainSnow: <MountainSnow className="w-5 h-5" />,
  Palmtree: <Palmtree className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Castle: <Castle className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Tent: <Tent className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Wine: <Wine className="w-5 h-5" />,
  Snowflake: <Snowflake className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

interface CategoriesBarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  showTotalWithTaxes: boolean;
  onToggleTotalTaxes: () => void;
  openFilterModal: () => void;
}

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  selectedCategory,
  onSelectCategory,
  showTotalWithTaxes,
  onToggleTotalTaxes,
  openFilterModal,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Categories Carousel */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center shadow-md hover:scale-105 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-7 overflow-x-auto no-scrollbar scroll-smooth px-2 md:px-8"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex flex-col items-center gap-1.5 min-w-fit pb-1.5 transition group relative cursor-pointer ${
                    isActive ? 'text-slate-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <div
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {ICON_MAP[cat.icon] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className="text-xs whitespace-nowrap tracking-tight">{cat.label}</span>
                  
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center shadow-md hover:scale-105 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Total Price Toggle (Airbnb 2024-2026 feature) */}
        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-3.5 py-2 hover:border-slate-300 transition bg-slate-50/50">
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">Display total before taxes</span>
              <span className="text-[10px] text-slate-500">Includes all fees & nights</span>
            </div>
            
            <button
              onClick={onToggleTotalTaxes}
              className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                showTotalWithTaxes ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  showTotalWithTaxes ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
