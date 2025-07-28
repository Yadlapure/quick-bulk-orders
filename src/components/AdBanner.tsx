import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const AdBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ads = [
    {
      id: 1,
      title: "Flash Sale!",
      subtitle: "Up to 70% OFF on Electronics",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=300&fit=crop",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fashion Collection 2024",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
      bgColor: "bg-gradient-to-r from-blue-500 to-teal-500"
    },
    {
      id: 3,
      title: "Best Deals",
      subtitle: "Home & Kitchen Essentials",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop",
      bgColor: "bg-gradient-to-r from-green-500 to-blue-500"
    },
    {
      id: 4,
      title: "Special Offer",
      subtitle: "Beauty Products at 50% OFF",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop",
      bgColor: "bg-gradient-to-r from-pink-500 to-red-500"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="w-full mb-6">
      <Carousel className="w-full">
        <CarouselContent>
          {ads.map((ad, index) => (
            <CarouselItem key={ad.id} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
              <div className={`relative h-40 rounded-xl overflow-hidden ${ad.bgColor}`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{ad.title}</h3>
                  <p className="text-sm opacity-90">{ad.subtitle}</p>
                  <button className="mt-3 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-fit">
                    Shop Now
                  </button>
                </div>
                
                {/* Slide indicators */}
                <div className="absolute bottom-3 right-3 flex space-x-1">
                  {ads.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AdBanner;