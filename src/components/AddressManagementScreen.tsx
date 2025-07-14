import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiMapPin, FiHome, FiBriefcase, FiMoreHorizontal } from 'react-icons/fi';
import { useToast } from "@/hooks/use-toast";

interface AddressData {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  street: string;
  landmark?: string;
  addressType: 'home' | 'office' | 'other';
  isDefault: boolean;
}

interface AddressManagementScreenProps {
  onBack: () => void;
  onAddressUpdate: (addresses: AddressData[]) => void;
}

const AddressManagementScreen: React.FC<AddressManagementScreenProps> = ({ onBack, onAddressUpdate }) => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    } else {
      // Migrate single address to addresses array
      const singleAddress = localStorage.getItem('userAddress');
      if (singleAddress) {
        const parsedAddress = JSON.parse(singleAddress);
        const migratedAddress: AddressData = {
          ...parsedAddress,
          id: Date.now().toString(),
          isDefault: true
        };
        setAddresses([migratedAddress]);
        localStorage.setItem('userAddresses', JSON.stringify([migratedAddress]));
      }
    }
  }, []);

  const saveAddresses = (newAddresses: AddressData[]) => {
    setAddresses(newAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(newAddresses));
    
    // Update main address for backward compatibility
    const defaultAddress = newAddresses.find(addr => addr.isDefault) || newAddresses[0];
    if (defaultAddress) {
      localStorage.setItem('userAddress', JSON.stringify(defaultAddress));
    }
    
    onAddressUpdate(newAddresses);
  };

  const handleAddAddress = (newAddress: Omit<AddressData, 'id' | 'isDefault'>) => {
    const addressWithId: AddressData = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: addresses.length === 0
    };
    
    const updatedAddresses = [...addresses, addressWithId];
    saveAddresses(updatedAddresses);
    setShowAddForm(false);
    
    toast({
      title: "Address Added",
      description: "New address has been added successfully",
    });
  };

  const handleEditAddress = (updatedAddress: AddressData) => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    saveAddresses(updatedAddresses);
    setEditingAddress(null);
    
    toast({
      title: "Address Updated",
      description: "Address has been updated successfully",
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    if (addresses.length === 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one address",
        variant: "destructive"
      });
      return;
    }

    const addressToDelete = addresses.find(addr => addr.id === addressId);
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    
    // If deleted address was default, make first remaining address default
    if (addressToDelete?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    saveAddresses(updatedAddresses);
    
    toast({
      title: "Address Deleted",
      description: "Address has been removed successfully",
    });
  };

  const handleSetDefault = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    saveAddresses(updatedAddresses);
    
    toast({
      title: "Default Address Updated",
      description: "Default delivery address has been changed",
    });
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return FiHome;
      case 'office': return FiBriefcase;
      default: return FiMapPin;
    }
  };

  if (showAddForm || editingAddress) {
    return (
      <AddressForm
        address={editingAddress}
        onSave={editingAddress ? handleEditAddress : handleAddAddress}
        onCancel={() => {
          setShowAddForm(false);
          setEditingAddress(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="text-xl text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Manage Addresses</h1>
        </div>
      </div>

      {/* Add Address Button */}
      <div className="p-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-blue-600 text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          <span className="font-medium">Add New Address</span>
        </button>
      </div>

      {/* Addresses List */}
      <div className="px-4 space-y-3">
        {addresses.map((address) => {
          const IconComponent = getAddressIcon(address.addressType);
          return (
            <div key={address.id} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <IconComponent className="text-gray-600 text-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-800 capitalize">{address.addressType}</h3>
                      {address.isDefault && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{address.name} • {address.phone}</p>
                    <p className="text-sm text-gray-500">
                      {address.street}, {address.landmark && `${address.landmark}, `}
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingAddress(address)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiEdit2 className="text-gray-500 text-sm" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiTrash2 className="text-red-500 text-sm" />
                  </button>
                </div>
              </div>
              
              {!address.isDefault && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    Set as Default
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {addresses.length === 0 && (
        <div className="px-4 py-12 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMapPin className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Addresses Found</h3>
          <p className="text-gray-500 mb-6">Add your first delivery address to get started</p>
        </div>
      )}
    </div>
  );
};

// Address Form Component
const AddressForm: React.FC<{
  address?: AddressData | null;
  onSave: (address: any) => void;
  onCancel: () => void;
}> = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    phone: address?.phone || '',
    pincode: address?.pincode || '',
    city: address?.city || '',
    state: address?.state || '',
    street: address?.street || '',
    landmark: address?.landmark || '',
    addressType: address?.addressType || 'home' as 'home' | 'office' | 'other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      onSave({ ...address, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="text-xl text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {address ? 'Edit Address' : 'Add New Address'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              placeholder="Pincode"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              placeholder="City"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            placeholder="State"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
          <textarea
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none h-20 resize-none"
            placeholder="House/Flat/Building number, Area, Street"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            placeholder="Nearby landmark"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'home', label: 'Home', icon: FiHome },
              { value: 'office', label: 'Office', icon: FiBriefcase },
              { value: 'other', label: 'Other', icon: FiMapPin }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, addressType: type.value as any })}
                className={`p-3 rounded-xl border-2 transition-colors flex flex-col items-center space-y-1 ${
                  formData.addressType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <type.icon className="text-lg" />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
        >
          {address ? 'Update Address' : 'Save Address'}
        </button>
      </form>
    </div>
  );
};

export default AddressManagementScreen;