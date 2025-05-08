
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBikes } from '@/data/bikes';
import BikeCard from '@/components/BikeCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { BikeCategory } from '@/types/bike';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert URL param to proper category format
  const formatCategory = (cat: string): BikeCategory => {
    return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase() as BikeCategory;
  };
  
  const categoryName = formatCategory(categoryId || '');
  const categoryBikes = allBikes.filter(bike => bike.category === categoryName);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [categoryId]);

  const categoryDescriptions: Record<BikeCategory, string> = {
    'Sport': 'Speed, agility, and precision define our sport bikes, designed for maximum performance on the track and the road.',
    'Naked': 'Raw power meets minimalist design in our naked bikes, offering an unfiltered riding experience with aggressive styling.',
    'Adventure': 'Conquer any terrain with our adventure bikes, built for those seeking excitement beyond the pavement.',
    'Cruiser': 'Experience comfort and style with our cruiser motorcycles, designed for long rides and effortless cruising.',
    'Touring': 'Built for the long haul, our touring bikes combine comfort, storage, and performance for the ultimate road trip companion.',
    'Retro': 'Vintage styling meets modern engineering in our retro bikes, offering classic aesthetics with contemporary performance.'
  };

  const getCategoryDescription = () => {
    return categoryDescriptions[categoryName as BikeCategory] || 
      'Explore our premium selection of motorcycles, engineered for performance and designed for passion.';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/categories">
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Categories
          </Button>
        </Link>
      </div>
      
      {/* Category Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryName} Motorcycles</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          {getCategoryDescription()}
        </p>
      </div>
      
      {/* Bikes Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin-slow">
            <ShoppingBag size={40} className="text-primary" />
          </div>
        </div>
      ) : categoryBikes.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No motorcycles found</h3>
          <p className="mt-2 text-muted-foreground">We couldn't find any {categoryName} motorcycles</p>
          <Link to="/categories">
            <Button className="mt-6">
              Browse Other Categories
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
