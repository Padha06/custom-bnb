export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  region: 'Americas' | 'Europe' | 'Asia' | 'Tropics' | 'Alpine';
  category: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  dates: string;
  badge?: 'Guest favorite' | 'Superhost' | 'Rare find' | 'Luxe';
  images: string[];
  coordinates: [number, number]; // lat, lng
  specs: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    yearsHosting: number;
  };
  description: string;
  amenities: {
    name: string;
    icon: string;
  }[];
  cleaningFee: number;
  serviceFeeRate: number; // e.g. 0.12
}

export interface FilterState {
  category: string;
  searchDestination: string;
  dateRange: { start: string; end: string } | null;
  guests: { adults: number; children: number; infants: number; pets: number };
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
  showTotalWithTaxes: boolean;
  minBedrooms: number;
}
