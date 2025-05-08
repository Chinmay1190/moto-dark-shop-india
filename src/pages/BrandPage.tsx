
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBikes } from '@/data/bikes';
import BikeCard from '@/components/BikeCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert URL param to proper brand format
  const formatBrand = (brand: string): string => {
    if (brand.toLowerCase() === 'bmw') return 'BMW';
    if (brand.toLowerCase() === 'ktm') return 'KTM';
    if (brand.toLowerCase() === 'mv') return 'MV Agusta';
    return brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  };
  
  const brandName = formatBrand(brandId || '');
  const brandBikes = allBikes.filter(bike => 
    bike.brand.toLowerCase() === brandName.toLowerCase() ||
    (brandName === 'MV Agusta' && bike.brand.toLowerCase() === 'mv agusta')
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [brandId]);

  const brandDescriptions: Record<string, string> = {
    'Ducati': 'Italian engineering excellence, breathtaking design, and racing heritage define every Ducati motorcycle.',
    'BMW': 'German precision engineering and innovative technology make BMW motorcycles stand out for their quality and performance.',
    'Honda': 'Reliability, innovation, and versatility are the hallmarks of Honda motorcycles, trusted by riders worldwide.',
    'Kawasaki': 'Cutting-edge technology and raw power define Kawasaki bikes, pushing the boundaries of motorcycle performance.',
    'Yamaha': 'Yamaha combines performance, reliability, and innovation to create motorcycles that deliver exceptional riding experiences.',
    'Suzuki': 'Performance and value come together in Suzuki motorcycles, offering riders speed, agility, and dependability.',
    'Triumph': 'British character, modern performance, and distinctive style are at the heart of every Triumph motorcycle.',
    'KTM': 'Known for their ready-to-race mentality, KTM bikes deliver aggressive performance both on and off the road.',
    'MV Agusta': 'The perfect blend of art and engineering, MV Agusta motorcycles represent Italian exclusivity and craftsmanship.',
    'Aprilia': 'Racing DNA flows through every Aprilia motorcycle, delivering track-inspired performance for the street.'
  };

  const getBrandDescription = () => {
    return brandDescriptions[brandName] || 
      'Discover premium motorcycles engineered for performance and designed to inspire.';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/brands">
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Brands
          </Button>
        </Link>
      </div>
      
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{brandName} Motorcycles</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          {getBrandDescription()}
        </p>
      </div>
      
      {/* Bikes Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin-slow">
            <ShoppingBag size={40} className="text-primary" />
          </div>
        </div>
      ) : brandBikes.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No motorcycles found</h3>
          <p className="mt-2 text-muted-foreground">We couldn't find any {brandName} motorcycles</p>
          <Link to="/brands">
            <Button className="mt-6">
              Browse Other Brands
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
