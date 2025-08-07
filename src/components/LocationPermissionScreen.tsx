import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiX } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LocationPermissionScreenProps {
  onLocationAccess: (location: { lat: number; lng: number; address?: string }) => void;
  onSkip: () => void;
}

const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
  onLocationAccess,
  onSkip
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string>('');

  const requestLocation = async () => {
    setIsDetecting(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsDetecting(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address from coordinates using a reverse geocoding service
          // For demo purposes, we'll just use the coordinates
          const locationData = {
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          };
          
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          onLocationAccess(locationData);
        } catch (err) {
          console.error('Error getting address:', err);
          const locationData = {
            lat: latitude,
            lng: longitude
          };
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          onLocationAccess(locationData);
        }
        setIsDetecting(false);
      },
      (error) => {
        setIsDetecting(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. You can enable it later in settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please try again.');
            break;
          default:
            setError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      options
    );
  };

  const handleSkip = () => {
    localStorage.setItem('locationPermissionAsked', 'true');
    onSkip();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6 shadow-xl">
        {/* Skip button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            <FiX className="w-4 h-4" />
          </Button>
        </div>

        {/* Location icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <FiMapPin className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Enable Location Access
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Allow us to access your location to provide better delivery estimates, 
            find nearby stores, and show relevant products in your area.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 text-left bg-muted/30 rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2">Benefits:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Accurate delivery time estimates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Find nearest pickup locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Location-based offers and products</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={requestLocation}
            disabled={isDetecting}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isDetecting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Detecting Location...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FiNavigation className="w-4 h-4" />
                <span>Allow Location Access</span>
              </div>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full h-12 text-base"
            size="lg"
          >
            Continue Without Location
          </Button>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your location data is used only to enhance your shopping experience 
          and is never shared with third parties. You can change this setting 
          anytime in your profile.
        </p>
      </Card>
    </div>
  );
};

export default LocationPermissionScreen;