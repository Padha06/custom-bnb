import React from 'react';
import { Globe, Heart, Shield, Award, Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
      {/* Editorial Inspiration Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-rose-500 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Curated Design Stays</h4>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Hand-inspected architectural gems, waterfront villas, and secluded nature cabins around the globe.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-rose-500 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Aura Protection Guarantee</h4>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Every booking comes with 24/7 guest support, host check-in verification, and seamless fee transparency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-rose-500 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Superhost Exclusives</h4>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Direct booking access with high-rated hospitality owners, complimentary amenities, and tailored concierge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold text-slate-900 mb-3">Support</h5>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-slate-900 cursor-pointer">Help Center</li>
              <li className="hover:text-slate-900 cursor-pointer">AirCover Protection</li>
              <li className="hover:text-slate-900 cursor-pointer">Anti-discrimination</li>
              <li className="hover:text-slate-900 cursor-pointer">Disability support</li>
              <li className="hover:text-slate-900 cursor-pointer">Cancellation options</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-3">Hosting</h5>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-slate-900 cursor-pointer">Aura your home</li>
              <li className="hover:text-slate-900 cursor-pointer">AirCover for Hosts</li>
              <li className="hover:text-slate-900 cursor-pointer">Hosting resources</li>
              <li className="hover:text-slate-900 cursor-pointer">Community forum</li>
              <li className="hover:text-slate-900 cursor-pointer">Hosting responsibly</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-3">AuraStays</h5>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-slate-900 cursor-pointer">Newsroom</li>
              <li className="hover:text-slate-900 cursor-pointer">New features</li>
              <li className="hover:text-slate-900 cursor-pointer">Careers</li>
              <li className="hover:text-slate-900 cursor-pointer">Investors</li>
              <li className="hover:text-slate-900 cursor-pointer">Gift cards</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-3">Demo Client Note</h5>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-600 space-y-2">
              <p className="font-semibold text-slate-900 text-xs">
                Ready for production deployment
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                This demo includes full search, filtering, split map view, dynamic pricing, and booking flow. Ready to connect to any backend or CMS.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2026 AuraStays, Inc. All rights reserved.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
          </div>

          <div className="flex items-center gap-4 font-bold text-slate-800">
            <span className="flex items-center gap-1 cursor-pointer hover:underline">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </span>
            <span>$ USD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
