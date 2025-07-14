import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiChevronRight, FiCheck } from 'react-icons/fi';

interface AddressSetupScreenProps {
  onAddressSubmit: (address: AddressData) => void;
  onSkip: () => void;
}

interface AddressData {
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  street: string;
  landmark?: string;
  addressType: 'home' | 'office' | 'other';
}

const AddressSetupScreen: React.FC<AddressSetupScreenProps> = ({ onAddressSubmit, onSkip }) => {
  const [step, setStep] = useState<'location' | 'details'>('location');
  const [isDetecting, setIsDetecting] = useState(false);
  const [formData, setFormData] = useState<AddressData>({
    name: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    street: '',
    landmark: '',
    addressType: 'home'
  });

  const detectLocation = () => {
    setIsDetecting(true);
    // Simulate location detection
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        pincode: '110001',
        city: 'New Delhi',
        state: 'Delhi'
      }));
      setIsDetecting(false);
      setStep('details');
    }, 2000);
  };

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddressSubmit(formData);
  };

  const isFormValid = formData.name && formData.phone && formData.pincode && 
                     formData.city && formData.state && formData.street;

  if (step === 'location') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="bg-blue-50 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FiMapPin className="text-3xl text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Set Your Location</h1>
              <p className="text-gray-600">
                Help us deliver to you faster by setting your delivery location
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={detectLocation}
                disabled={isDetecting}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors duration-200 flex items-center justify-center space-x-3"
              >
                {isDetecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Detecting Location...</span>
                  </>
                ) : (
                  <>
                    <FiNavigation className="text-xl" />
                    <span>Use Current Location</span>
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={() => setStep('details')}
                className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-3"
              >
                <span>Enter Address Manually</span>
                <FiChevronRight className="text-xl" />
              </button>

              <button
                onClick={onSkip}
                className="w-full text-gray-500 py-3 text-center hover:text-gray-700 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 mb-4">
          <div className="flex items-center space-x-3 mb-6">
            <button
              onClick={() => setStep('location')}
              className="text-blue-600 hover:text-blue-700"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-gray-800">Add Delivery Address</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 rounded-l-lg">
                  +91
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-r-lg focus:border-blue-500 focus:outline-none"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="6-digit"
                  maxLength={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="City"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="State"
                required
              />
            </div>

            {/* Address Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <textarea
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="House/Flat no., Building name, Area"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Near by landmark"
              />
            </div>

            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Address Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'home', label: 'Home' },
                  { value: 'office', label: 'Office' },
                  { value: 'other', label: 'Other' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('addressType', type.value as 'home' | 'office' | 'other')}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      formData.addressType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FiCheck className="text-xl" />
                <span>Save Address & Continue</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressSetupScreen;