
import { Link } from 'react-router-dom';
import { allBikes } from '@/data/bikes';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BrandsPage() {
  // Get unique brands with their counts
  const brands = Array.from(
    new Set(allBikes.map(bike => bike.brand))
  ).map(brand => ({
    name: brand,
    count: allBikes.filter(bike => bike.brand === brand).length,
    image: allBikes.find(bike => bike.brand === brand)?.images[0] || ''
  })).sort((a, b) => a.name.localeCompare(b.name));

  // Brand descriptions
  const brandDescriptions: Record<string, string> = {
    'Ducati': 'Italian motorcycle manufacturer known for high-performance bikes with distinctive L-twin engines.',
    'BMW': 'German manufacturer renowned for premium motorcycles with innovative technology and engineering.',
    'Honda': 'Japanese brand recognized worldwide for reliable and technologically advanced motorcycles.',
    'Kawasaki': 'Japanese manufacturer famous for powerful motorcycles with cutting-edge performance.',
    'Yamaha': 'Japanese company producing a wide range of motorcycles known for reliability and performance.',
    'Suzuki': 'Japanese manufacturer offering versatile motorcycles with excellent value and performance.',
    'Triumph': 'British motorcycle manufacturer with a rich heritage dating back to 1902.',
    'KTM': 'Austrian brand specializing in off-road and sport motorcycles with distinctive orange styling.',
    'MV Agusta': 'Italian manufacturer of premium, hand-built motorcycles known for their exclusivity.',
    'Aprilia': 'Italian brand with a strong racing heritage producing high-performance sport motorcycles.'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Motorcycle Brands</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Discover premium motorcycles from the world's leading manufacturers, each with their unique heritage and engineering philosophy.
        </p>
      </div>
      
      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link to={`/brands/${brand.name.toLowerCase()}`} key={brand.name} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
              <div className="relative h-48">
                <img 
                  src={brand.image}
                  alt={brand.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-xl">{brand.name}</h3>
                    <p className="text-sm text-white/80">{brand.count} models</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-muted-foreground text-sm mb-4">
                  {brandDescriptions[brand.name] || ''}
                </p>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white w-full justify-between">
                  View {brand.name} Motorcycles
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
