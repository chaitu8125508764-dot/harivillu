import React, { useState } from 'react';
import { 
  MapPin, 
  X, 
  LocateFixed, 
  Search, 
  Check, 
  Sparkles, 
  Truck, 
  Clock, 
  Building2, 
  Home, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const POPULAR_LOCATIONS = [
  {
    pincode: '500033',
    area: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    deliveryTime: 'Tomorrow, by 2:00 PM',
    isExpress: true,
    expressBadge: '⚡ 24-Hr Express Dispatch'
  },
  {
    pincode: '500081',
    area: 'Madhapur / Hitec City',
    city: 'Hyderabad',
    state: 'Telangana',
    deliveryTime: 'Tomorrow, by 1:00 PM',
    isExpress: true,
    expressBadge: '⚡ 24-Hr Express Dispatch'
  },
  {
    pincode: '520010',
    area: 'MG Road',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    deliveryTime: 'Tomorrow, by 6:00 PM',
    isExpress: true,
    expressBadge: '⚡ Express Courier'
  },
  {
    pincode: '530002',
    area: 'Maharani Peta',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    deliveryTime: 'In 2 Days',
    isExpress: true,
    expressBadge: '⚡ Express Air'
  },
  {
    pincode: '560038',
    area: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    deliveryTime: 'In 2 Days',
    isExpress: true,
    expressBadge: '⚡ BlueDart Air'
  },
  {
    pincode: '600028',
    area: 'Mylapore',
    city: 'Chennai',
    state: 'Tamil Nadu',
    deliveryTime: 'In 2 Days',
    isExpress: true,
    expressBadge: '⚡ BlueDart Air'
  },
  {
    pincode: '400050',
    area: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    deliveryTime: 'In 3 Days',
    isExpress: false,
    expressBadge: '📦 Standard Express'
  },
  {
    pincode: '110001',
    area: 'Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    deliveryTime: 'In 3 Days',
    isExpress: false,
    expressBadge: '📦 Standard Express'
  }
];

export default function LocationModal() {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    deliveryLocation, 
    updateDeliveryLocation,
    userProfile,
    showToast
  } = useShop();

  const [inputPincode, setInputPincode] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLocationModalOpen) return null;

  const handleSelectLocation = (loc) => {
    updateDeliveryLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const cleanPin = inputPincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setErrorMessage('Please enter a valid 6-digit Indian Pincode');
      return;
    }

    setErrorMessage('');
    // Check if it matches popular locations
    const found = POPULAR_LOCATIONS.find(l => l.pincode === cleanPin);
    if (found) {
      handleSelectLocation(found);
    } else {
      // General serviceable pincode
      const customLoc = {
        pincode: cleanPin,
        area: `Sector / Area ${cleanPin.slice(0, 3)}`,
        city: cleanPin.startsWith('50') || cleanPin.startsWith('51') || cleanPin.startsWith('52') || cleanPin.startsWith('53') ? 'Telangana / AP' : 'India',
        state: 'Express Delivery Zone',
        deliveryTime: cleanPin.startsWith('50') ? 'Tomorrow, by 4:00 PM' : 'In 2-3 Days',
        isExpress: true,
        expressBadge: '⚡ BlueDart / DTDC Express'
      };
      handleSelectLocation(customLoc);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    setErrorMessage('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetecting(false);
          // Default to Hyderabad central atelier express hub
          handleSelectLocation(POPULAR_LOCATIONS[0]);
        },
        () => {
          setIsDetecting(false);
          // Fallback to primary hub
          handleSelectLocation(POPULAR_LOCATIONS[0]);
        },
        { timeout: 4000 }
      );
    } else {
      setIsDetecting(false);
      handleSelectLocation(POPULAR_LOCATIONS[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Click outside to close */}
      <div 
        className="fixed inset-0" 
        onClick={() => setIsLocationModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet Window */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-amber-900/10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Header */}
        <div className="px-5 py-4 border-b border-amber-900/10 flex items-center justify-between bg-gradient-to-r from-amber-50 via-rose-50/40 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-temple-crimson flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <MapPin className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Select Delivery Location
              </h3>
              <p className="text-[11px] text-slate-500">
                Check instant dispatch & express 24-hr delivery to your doorstep
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          
          {/* Pincode Search Bar */}
          <div>
            <form onSubmit={handlePincodeSubmit} className="relative flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 500033)"
                  value={inputPincode}
                  onChange={(e) => {
                    setInputPincode(e.target.value.replace(/\D/g, ''));
                    setErrorMessage('');
                  }}
                  className="w-full pl-10 pr-24 py-3 bg-slate-50 border border-amber-900/20 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white shadow-inner"
                />
                <Search className="w-4 h-4 text-amber-800/60 absolute left-3.5 top-3.5" />
              </div>

              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow hover:brightness-105 active:scale-95 transition-all"
              >
                Apply
              </button>
            </form>

            {errorMessage && (
              <p className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1.5 px-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMessage}
              </p>
            )}
          </div>

          {/* Quick Detect GPS Button (Like Zepto / Swiggy) */}
          <button
            onClick={handleUseCurrentLocation}
            disabled={isDetecting}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-50/50 hover:bg-amber-100/50 active:scale-[0.99] transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-temple-crimson border border-amber-200">
                <LocateFixed className={`w-5 h-5 ${isDetecting ? 'animate-spin text-amber-600' : 'group-hover:scale-110 transition-transform'}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{isDetecting ? 'Detecting current location...' : 'Use Current Location'}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                    GPS
                  </span>
                </p>
                <p className="text-[11px] text-slate-500">
                  Using device GPS for pinpoint delivery accuracy
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Saved Addresses from User Profile (Like Flipkart) */}
          {userProfile && userProfile.addresses && userProfile.addresses.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Saved Addresses
              </p>
              <div className="space-y-2">
                {userProfile.addresses.map((addr) => {
                  const isSelected = deliveryLocation?.pincode === addr.pincode;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectLocation({
                        pincode: addr.pincode,
                        area: addr.address.split(',')[0] || addr.city,
                        city: addr.city,
                        state: addr.state,
                        deliveryTime: addr.pincode.startsWith('50') ? 'Tomorrow, by 2:00 PM' : 'In 2 Days',
                        isExpress: true,
                        expressBadge: '⚡ Express Delivery'
                      })}
                      className={`flex items-start justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-rose-50/70 border-temple-crimson shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-temple-crimson text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Home className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {addr.address}, {addr.city} - <strong className="text-slate-700">{addr.pincode}</strong>
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-temple-crimson text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Popular Metro & Express Hubs (Zepto / Blinkit Quick Chips) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Popular Express Cities
              </p>
              <span className="text-[10px] font-semibold text-amber-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Same-Day Dispatch Hubs
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {POPULAR_LOCATIONS.map((loc) => {
                const isSelected = deliveryLocation?.pincode === loc.pincode;
                return (
                  <button
                    key={loc.pincode}
                    onClick={() => handleSelectLocation(loc)}
                    className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected 
                        ? 'border-temple-crimson bg-rose-50/80 shadow-sm' 
                        : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {loc.city}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-temple-crimson stroke-[3]" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                      {loc.area} ({loc.pincode})
                    </span>
                    <span className="inline-block mt-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                      {loc.deliveryTime}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Harivillu Express Silk Delivery Guarantee Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/60 p-3.5 rounded-2xl border border-amber-300/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <span>Free Express Air Delivery Over ₹2,500</span>
                <span className="text-[10px] text-temple-crimson font-extrabold">⚡</span>
              </p>
              <p className="text-[10px] text-amber-800/90 leading-tight mt-0.5">
                Hand-inspected pure silk sarees, dispatched in signature royal gift boxes via BlueDart Air & DTDC.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
