import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Listing } from '../types';
import { Star } from 'lucide-react';

// Component to dynamically fit map to listing bounds
const MapBoundsHandler: React.FC<{ listings: Listing[] }> = ({ listings }) => {
  const map = useMap();

  React.useEffect(() => {
    if (listings.length > 0) {
      const bounds = L.latLngBounds(listings.map((item) => item.coordinates));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [listings, map]);

  return null;
};

// Create custom Airbnb price pill marker
const createPriceIcon = (price: number, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${isSelected ? '#0f172a' : '#ffffff'};
        color: ${isSelected ? '#ffffff' : '#0f172a'};
        padding: 5px 10px;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        border: 1px solid rgba(0,0,0,0.08);
        cursor: pointer;
        white-space: nowrap;
        transform: translate(-50%, -50%) ${isSelected ? 'scale(1.15)' : 'scale(1)'};
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 2px;
      ">
        $${price}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

interface MapViewProps {
  listings: Listing[];
  selectedListing: Listing | null;
  onSelectListing: (listing: Listing) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  listings,
  selectedListing,
  onSelectListing,
}) => {
  const defaultCenter: [number, number] = [30.0, 10.0];

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer
        center={defaultCenter}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsHandler listings={listings} />

        {listings.map((listing) => {
          const isSelected = selectedListing?.id === listing.id;

          return (
            <Marker
              key={listing.id}
              position={listing.coordinates}
              icon={createPriceIcon(listing.pricePerNight, isSelected)}
              eventHandlers={{
                click: () => onSelectListing(listing),
              }}
            >
              <Popup>
                <div
                  onClick={() => onSelectListing(listing)}
                  className="w-64 cursor-pointer overflow-hidden p-2 text-left"
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 truncate">{listing.location}</span>
                      <div className="flex items-center gap-0.5 font-bold text-slate-800">
                        <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                        <span>{listing.rating.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{listing.title}</p>
                    <div className="mt-1 text-xs">
                      <span className="font-bold text-slate-950">${listing.pricePerNight}</span>
                      <span className="text-slate-500"> / night</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
