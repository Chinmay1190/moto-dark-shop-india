
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { formatPrice } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Add some items first.");
      return;
    }
    
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      setProcessing(false);
      window.location.href = '/checkout/success';
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-2 h-8 w-8" />
          Your Cart {totalItems > 0 && `(${totalItems} item${totalItems !== 1 ? 's' : ''})`}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-muted inline-flex p-6 rounded-full mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping and add some awesome bikes to your cart!</p>
            <Link to="/bikes">
              <Button>Browse Motorcycles</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Cart Items</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping Button */}
              <div className="mt-6">
                <Link to="/bikes">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(totalPrice * 0.18)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice * 1.18)}</span>
                </div>
                
                {/* Currently this is a demo without actual payment integration */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Proceed to Checkout"}
                  {!processing && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                
                <div className="mt-4 text-xs text-muted-foreground flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-1 flex-shrink-0" />
                  <p>This is a demo application. No actual payment will be processed.</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
