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
  Eye,
  EyeOff,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    userProfile,
    showToast 
  } = useShop();

  const [authMethod, setAuthMethod] = useState('otp'); // 'otp' | 'email' | 'register'
  
  // Mobile OTP state
  const [phoneNumber, setPhoneNumber] = useState('98480 22338');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['4', '2', '9', '8']);
  const [resendTimer, setResendTimer] = useState(30);

  // Email & Password state
  const [email, setEmail] = useState('sowmya.reddy@example.com');
  const [password, setPassword] = useState('silkroyal2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    email: '',
    daughterName: '',
    password: ''
  });

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setOtpSent(true);
    setResendTimer(30);
    showToast(`OTP sent to +91 ${phoneNumber}! Demo Code: 4298`, 'success');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 4) {
      showToast('Please enter the complete 4-digit code', 'error');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    login({
      phone: `+91 ${phoneNumber}`
    });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    login({
      email: cleanEmail,
      name: cleanEmail.toLowerCase().includes('sowmya') ? userProfile.name : cleanEmail.split('@')[0]
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    login({
      name: registerForm.name,
      email: registerForm.email,
      phone: `+91 ${registerForm.phone}`
    });
  };

  const handleQuickDemoLogin = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
    login();
  };

  const handleFillDemoEmail = () => {
    setEmail('sowmya.reddy@example.com');
    setPassword('silkroyal2026');
    showToast('Demo email credentials filled!', 'info');
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
          <div className="relative w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 shadow-lg flex items-center justify-center mb-2">
            <div className="w-full h-full rounded-full bg-white overflow-hidden p-0.5 flex items-center justify-center shadow-inner">
              <img
                src="/images/harivillu-logo.jpg"
                alt="Harivillu Collections"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-temple-crimson text-amber-300 p-1 rounded-full shadow border border-white">
              <Crown className="w-3 h-3" />
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            Harivillu VIP Club
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 max-w-xs mx-auto">
            Log in to view orders, daughter sizing vault & 450 Silk Coins
          </p>

          {/* Royalty Perks Banner */}
          <div className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-semibold text-amber-900 bg-amber-400/20 border border-amber-400/40 py-1 px-3 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>FLAT 20% OFF Welcome Code Unlocked</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Quick Demo One-Click Login Button */}
          <button
            onClick={handleQuickDemoLogin}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-temple-crimson via-rani-800 to-temple-crimson text-white shadow-md hover:brightness-105 active:scale-[0.98] transition-all group border border-amber-300/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-inner">
                SR
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Continue as {userProfile.name}</span>
                  <span className="text-[9px] bg-amber-300 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full">
                    VIP
                  </span>
                </p>
                <p className="text-[10px] text-pink-100/90">
                  Instant 1-Click Login • 450 Coins
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Authentication Method Tabs: Mobile OTP vs Email Login vs Register */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => {
                setAuthMethod('otp');
                setOtpSent(false);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'otp'
                  ? 'bg-white text-temple-crimson shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>

            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-white text-temple-crimson shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Login</span>
            </button>

            <button
              onClick={() => setAuthMethod('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'register'
                  ? 'bg-white text-temple-crimson shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* 1. EMAIL & PASSWORD LOGIN */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-3.5 animate-in fade-in duration-200">
              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="email"
                    placeholder="sowmya.reddy@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white shadow-inner"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to your email!', 'info')}
                    className="text-[11px] text-temple-crimson hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white shadow-inner"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Demo Fill */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-temple-crimson focus:ring-temple-crimson"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={handleFillDemoEmail}
                  className="text-[11px] text-amber-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Auto-fill Demo Email</span>
                </button>
              </div>

              {/* Submit Email Login */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Sign In with Email</span>
              </button>
            </form>
          )}

          {/* 2. MOBILE OTP LOGIN */}
          {authMethod === 'otp' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-slate-700 text-xs font-bold pr-2 border-r border-slate-300">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={13}
                        placeholder="98480 22338"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-20 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Get Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-center">
                    <p className="text-xs text-slate-600">
                      Enter the 4-digit code sent to <strong className="text-slate-900">+91 {phoneNumber}</strong>
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block mt-1">
                      💡 Demo Test OTP: <strong>4298</strong>
                    </p>
                  </div>

                  {/* 4-Digit OTP Box */}
                  <div className="flex justify-center gap-2.5 my-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          const nextDigits = [...otpDigits];
                          nextDigits[idx] = val;
                          setOtpDigits(nextDigits);
                          if (val && idx < 3) {
                            document.getElementById(`otp-${idx + 1}`)?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-lg font-bold bg-slate-50 border-2 border-amber-500/60 rounded-xl focus:border-temple-crimson focus:bg-white focus:outline-none shadow-sm"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-slate-600 hover:text-slate-900 underline"
                    >
                      Change Number
                    </button>
                    {resendTimer > 0 ? (
                      <span>Resend code in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-temple-crimson font-bold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Access Profile</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. NEW VIP REGISTRATION */}
          {authMethod === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="e.g. Sowmya Reddy"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="tel"
                    placeholder="98480 22338"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-temple-crimson focus:bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Crown className="w-4 h-4" />
                <span>Create VIP Account (Earn 100 Coins)</span>
              </button>
            </form>
          )}

          {/* Social Sign-In Options */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <button
              onClick={() => {
                confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
                login();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>Continue with WhatsApp Fast Login</span>
            </button>
          </div>

          {/* Footer Terms */}
          <div className="text-center pt-1">
            <p className="text-[10px] text-slate-400">
              By proceeding, you agree to Harivillu Collections' <a href="#" className="underline">Terms of Service</a> & <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
