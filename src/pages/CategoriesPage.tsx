
import { Link } from 'react-router-dom';
import { allBikes } from '@/data/bikes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  // Get unique categories with their counts
  const categories = Array.from(
    new Set(allBikes.map(bike => bike.category))
  ).map(category => ({
    name: category,
    count: allBikes.filter(bike => bike.category === category).length,
    image: allBikes.find(bike => bike.category === category)?.images[0] || ''
  }));

  // Category descriptions
  const categoryDescriptions: Record<string, string> = {
    'Sport': 'High-performance motorcycles designed for speed, agility, and aerodynamics.',
    'Naked': 'Powerful bikes with minimalist fairings for a raw, aggressive riding experience.',
    'Adventure': 'Versatile motorcycles built for on-road and off-road exploration and long-distance travel.',
    'Cruiser': 'Relaxed riding position and custom styling for comfortable highway cruising.',
    'Touring': 'Motorcycles designed for long-distance comfort, with weather protection and storage.',
    'Retro': 'Modern bikes with classic styling that evoke the golden era of motorcycling.'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Motorcycle Categories</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Explore our diverse collection of motorcycles across different categories to find your perfect ride.
        </p>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link to={`/categories/${category.name.toLowerCase()}`} key={category.name} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
              <div className="relative h-48">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-xl">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.count} bikes</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-muted-foreground text-sm mb-4">
                  {categoryDescriptions[category.name] || ''}
                </p>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white w-full justify-between">
                  View Collection
                  <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
