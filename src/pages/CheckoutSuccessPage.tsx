
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Trigger confetti effect on successful checkout
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We've received your order and will process it as soon as possible.
          You'll receive an email with order details and tracking information once your item ships.
        </p>
        
        <div className="bg-card rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-3">Order Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">MD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Status:</span>
              <span className="font-medium text-green-600 dark:text-green-400">Paid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-medium">7-10 business days</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" />
              Track Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
