
import React, { useState } from 'react';
import { FiPhone, FiLock } from 'react-icons/fi';

interface LoginScreenProps {
  onLogin: (phoneNumber: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        onLogin(phoneNumber);
      }, 1000);
    }
  };

  const resendOtp = () => {
    console.log('Resending OTP...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-blue-600">B2B</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to TradeHub</h1>
          <p className="text-blue-100">Your B2B marketplace for bulk orders</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiPhone className="text-2xl text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Mobile Number</h2>
                <p className="text-gray-600">We'll send you a verification code</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length !== 10 || isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center">
                <div className="bg-orange-50 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiLock className="text-2xl text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to<br />
                  <span className="font-semibold text-blue-600">+91 {phoneNumber}</span>
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg text-center tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    'Verify & Login'
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100 text-sm">
          <p>By continuing, you agree to our Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
