
import { Button } from '@/components/ui/button';
import { Bike } from '@/types/bike';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatCurrency';
import { Trash, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: Bike & { quantity: number };
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  
  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Details */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.brand}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
            <div className="text-sm text-muted-foreground">
              {formatPrice(item.price)} each
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
