
import { Bike } from '@/types/bike';
import BikeCard from './BikeCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  bikes: Bike[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function FeaturedSection({ 
  title, 
  subtitle, 
  bikes, 
  showViewAll = true,
  viewAllLink = "/bikes" 
}: FeaturedSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
          </div>
          {showViewAll && (
            <Link to={viewAllLink}>
              <Button variant="outline" className="mt-4 md:mt-0">View All</Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </section>
  );
}
