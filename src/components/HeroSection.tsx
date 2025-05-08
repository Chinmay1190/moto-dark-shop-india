
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { allBikes } from '@/data/bikes';

export default function HeroSection() {
  const featuredBikes = allBikes.filter(bike => bike.featured).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredBikes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredBikes.length]);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-bikeDark dark:bg-bikeDark">
      {/* Dynamic background */}
      {featuredBikes.map((bike, index) => (
        <div
          key={bike.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${bike.images[0]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center items-start h-full min-h-[60vh] md:min-h-[70vh] py-16">
        <div className="max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Experience The Ultimate Ride
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover premium superbikes from the world's leading manufacturers. 
            Speed, power, and precision engineered for the ultimate thrill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/bikes">
              <Button size="lg" className="bg-bikeRed hover:bg-bikeRed/90">
                Explore Collection
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredBikes.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
