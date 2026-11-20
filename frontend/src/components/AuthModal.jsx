import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Mail,
  Lock,
  User,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Crown,
  KeyRound,
  RotateCcw,
  Check,
  ChevronRight,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

// Google Official 4-Color SVG Icon
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    userProfile,
    showToast
  } = useShop();

  // Active view: 'main' | 'otp' | 'google-chooser' | 'register'
  const [view, setView] = useState('main');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState(['4', '2', '9', '8']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState(null);

  // Available Google accounts for authentic One-Tap simulation
  const GOOGLE_ACCOUNTS = [
    {
      id: 1,
      name: 'Sowmya Reddy',
      email: 'sowmya.reddy@gmail.com',
      avatarColor: 'bg-purple-600',
      initial: 'S',
      memberStatus: 'VIP Silk Royalty Member'
    },
    {
      id: 2,
      name: 'Chaitanya Kumar',
      email: 'chaitu8125508764@gmail.com',
      avatarColor: 'bg-blue-600',
      initial: 'C',
      memberStatus: 'Harivillu Family Member'
    }
  ];

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (view === 'otp' && resendTimer > 0) {
      timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, resendTimer]);

  if (!isAuthModalOpen) return null;

  // 1. Mobile OTP Handlers
  const handleRequestOtp = (e) => {
    e.preventDefault();
    const cleanNum = phoneNumber.replace(/\D/g, '');
    if (cleanNum.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setView('otp');
    setResendTimer(30);
    showToast(`📩 OTP sent to +91 ${phoneNumber}! Demo Code: 4298`, 'success');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 4) {
      showToast('Please enter the complete 4-digit OTP', 'error');
      return;
    }

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });

    login({
      phone: `+91 ${phoneNumber}`
    });
  };

  const handleAutoFillOtp = () => {
    setOtpDigits(['4', '2', '9', '8']);
    showToast('✨ Auto-filled SMS OTP: 4298', 'success');
  };

  // 2. Google Sign-In Handlers
  const handleOpenGoogleChooser = () => {
    setView('google-chooser');
  };

  const handleSelectGoogleAccount = (acc) => {
    setSelectedGoogleAccount(acc.email);
    setIsGoogleLoading(true);

    setTimeout(() => {
      setIsGoogleLoading(false);
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 }
      });
      login({
        name: acc.name,
        email: acc.email
      });
    }, 1100);
  };

  // 3. Quick VIP Demo Login
  const handleQuickDemoLogin = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
    login();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-300">

      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet Window */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-amber-900/10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">

        {/* Mobile Pull Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#FAF7F2]">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Brand Header */}
        <div className="relative px-6 pt-5 pb-4 bg-gradient-to-br from-[#FFF9F2] via-rose-50/50 to-amber-50/80 border-b border-amber-900/10 text-center">

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Crest */}
          <div className="relative w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 shadow-md flex items-center justify-center mb-2">
            <div className="w-full h-full rounded-full bg-white overflow-hidden p-0.5 flex items-center justify-center shadow-inner">
              <img
                src="/images/harivillu-logo.jpg"
                alt="Harivillu Collections"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-temple-crimson text-amber-300 p-0.5 rounded-full shadow border border-white">
              <Crown className="w-3 h-3" />
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {view === 'google-chooser' ? 'Sign in with Google' : 'Login or Sign Up'}
          </h3>
          <p className="text-[11px] text-slate-600 mt-0.5">
            {view === 'google-chooser'
              ? 'Choose an account to continue to Harivillu Collections'
              : 'Unlock saved child measurements, live BlueDart tracking & 450 Silk Coins'}
          </p>

          {/* Flipkart/Amazon Style Reward Chip */}
          {view !== 'google-chooser' && (
            <div className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-bold text-amber-900 bg-amber-400/20 border border-amber-400/35 py-1 px-3 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>FLAT 20% OFF Welcome Coupon Unlocked: HARIVILLU20</span>
            </div>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">

          {/* ============================================================== */}
          {/* VIEW 1: MAIN LOGIN SCREEN (Flipkart & Amazon Dual Layout) */}
          {/* ============================================================== */}
          {view === 'main' && (
            <div className="space-y-4 animate-in fade-in duration-200">

              {/* 1. Mobile Number Input (Flipkart / Amazon Standard) */}
              <form onSubmit={handleRequestOtp} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Enter Mobile Number
                    </label>
                    <button
                      type="button"
                      onClick={() => setPhoneNumber('9848022338')}
                      className="text-[10px] text-temple-crimson font-bold hover:underline"
                    >
                      Fill Demo: 9848022338
                    </button>
                  </div>
                  <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-temple-crimson focus-within:border-temple-crimson focus-within:bg-white shadow-xs transition-all">
                    <div className="flex items-center gap-1.5 px-3 py-3 bg-slate-100 text-slate-800 text-xs font-bold border-r border-slate-200 select-none flex-shrink-0">
                      <span className="text-base leading-none">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 w-full px-3.5 py-3 bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      autoFocus
                      required
                    />
                    {phoneNumber && (
                      <button
                        type="button"
                        onClick={() => setPhoneNumber('')}
                        className="p-2 text-slate-400 hover:text-slate-600 mr-1"
                        aria-label="Clear mobile number"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Terms Notice (Amazon / Flipkart pattern) */}
                <p className="text-[10px] text-slate-500 leading-tight">
                  By continuing, you agree to Harivillu's <a href="#" className="text-temple-crimson underline">Conditions of Use</a> and <a href="#" className="text-temple-crimson underline">Privacy Notice</a>.
                </p>

                {/* Primary Action Button (Flipkart Orange/Crimson style) */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl rani-gradient-bg text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Request Mobile OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Flipkart / Amazon Style Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Or Continue With
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* 2. Google Sign-In Button (Official Google Design Specs) */}
              <button
                type="button"
                onClick={handleOpenGoogleChooser}
                className="w-full py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xs bg-white text-slate-700 font-semibold text-xs sm:text-sm group"
              >
                <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                <span>Continue with Google</span>
              </button>

              {/* 3. Fast VIP Demo Login Card */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-300/80 hover:border-amber-400 hover:bg-amber-100/50 active:scale-[0.99] transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-temple-crimson text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    SR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>1-Click VIP Demo: {userProfile.name}</span>
                      <span className="text-[9px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full">
                        TEST
                      </span>
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Direct access to saved child measurements & coins
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
              </button>

            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: OTP VERIFICATION SCREEN (Flipkart / Amazon Pattern) */}
          {/* ============================================================== */}
          {view === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">

              {/* Back to Number */}
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="text-slate-600">
                  Verifying <strong className="text-slate-900">+91 {phoneNumber}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setView('main')}
                  className="text-temple-crimson font-bold hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Simulated Auto-Read SMS Alert (Android / Flipkart style) */}
              <div
                onClick={handleAutoFillOtp}
                className="p-3 bg-emerald-50/80 border border-emerald-300 rounded-2xl cursor-pointer hover:bg-emerald-100/70 transition-colors flex items-center justify-between"
                title="Click to auto-fill SMS code"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                    💬
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-950">
                      SMS Received: OTP is <strong className="text-emerald-700 text-xs">4298</strong>
                    </p>
                    <p className="text-[10px] text-emerald-700">
                      Tap here to 1-Click Auto Fill & Verify
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-1 rounded-lg">
                  Auto-Fill
                </span>
              </div>

              {/* 4-Digit Input Boxes */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 text-center mb-2">
                  Enter 4-Digit Verification Code
                </label>
                <div className="flex justify-center gap-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const nextDigits = [...otpDigits];
                        nextDigits[idx] = val;
                        setOtpDigits(nextDigits);
                        if (val && idx < 3) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
                          document.getElementById(`otp-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold bg-slate-50 border-2 border-amber-500/60 rounded-2xl focus:border-temple-crimson focus:bg-white focus:outline-none shadow-sm transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Countdown */}
              <div className="flex items-center justify-center text-xs text-slate-500">
                {resendTimer > 0 ? (
                  <span>Resend OTP in <strong className="text-slate-800">00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="text-temple-crimson font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Resend OTP via SMS</span>
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl rani-gradient-bg text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Access VIP Profile</span>
              </button>

              {/* Switch to Google */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setView('google-chooser')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1.5"
                >
                  <GoogleIcon className="w-3.5 h-3.5" />
                  <span>Trouble with SMS? Sign in with Google instead</span>
                </button>
              </div>

            </form>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: GOOGLE ONE-TAP ACCOUNT CHOOSER (Authentic Google UI) */}
          {/* ============================================================== */}
          {view === 'google-chooser' && (
            <div className="space-y-3 animate-in fade-in duration-200">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-2.5">
                <GoogleIcon className="w-5 h-5 flex-shrink-0" />
                <div className="text-xs leading-tight min-w-0">
                  <p className="font-bold text-slate-800">Google Accounts</p>
                  <p className="text-[11px] text-slate-500 truncate">
                    Select an account to authorize Harivillu Collections
                  </p>
                </div>
              </div>

              {/* List of Google Accounts */}
              <div className="space-y-2">
                {GOOGLE_ACCOUNTS.map((acc) => {
                  const isCurrentSelected = selectedGoogleAccount === acc.email;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      disabled={isGoogleLoading}
                      onClick={() => handleSelectGoogleAccount(acc)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${isCurrentSelected
                        ? 'border-blue-500 bg-blue-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${acc.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                          {acc.initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{acc.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                        </div>
                      </div>

                      {isCurrentSelected && isGoogleLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  );
                })}

                {/* Add Another Account */}
                <button
                  type="button"
                  disabled={isGoogleLoading}
                  onClick={() => handleSelectGoogleAccount({
                    name: 'Guest Customer',
                    email: 'guest.shopper@gmail.com'
                  })}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Use another Google account</span>
                </button>
              </div>

              {/* Cancel / Switch back to Mobile */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setView('main')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline"
                >
                  ← Back to Mobile Number Login
                </button>
              </div>

            </div>
          )}

          {/* Trust Security Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted • 100% Secure Authentication</span>
          </div>

        </div>

      </div>
    </div>
  );
}
