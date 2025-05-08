
import { Link } from 'react-router-dom';
import { Bike } from '@/types/bike';
import { formatPrice } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(bike);
  };

  return (
    <Link to={`/bikes/${bike.id}`} className="bike-card group overflow-hidden">
      <div className="relative">
        <img 
          src={bike.images[0]} 
          alt={bike.name} 
          className="h-48 md:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {bike.new && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {bike.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>
          )}
          {!bike.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
          {bike.discount && (
            <Badge className="bg-green-500 hover:bg-green-600">-{bike.discount}%</Badge>
          )}
        </div>

        <div className="bike-card-hover">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center text-white">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{bike.rating}</span>
            </div>
            <Button 
              size="sm"
              variant="secondary"
              className="rounded-full text-xs"
              onClick={handleAddToCart}
              disabled={!bike.inStock}
            >
              <ShoppingCart className="h-3 w-3 mr-1" /> 
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase text-muted-foreground mb-1">{bike.brand}</p>
            <h3 className="font-medium text-foreground">{bike.name}</h3>
          </div>
          <div className="text-right">
            {bike.discount ? (
              <div>
                <p className="text-xs line-through text-muted-foreground">
                  {formatPrice(bike.price)}
                </p>
                <p className="font-medium text-primary">
                  {formatPrice(bike.price * (1 - bike.discount / 100))}
                </p>
              </div>
            ) : (
              <p className="font-medium">{formatPrice(bike.price)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
