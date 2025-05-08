
import { allBikes } from '@/data/bikes';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee, ShoppingBag, Star, ShieldCheck, Award } from 'lucide-react';

export default function Index() {
  // Get featured bikes
  const featuredBikes = allBikes
    .filter(bike => bike.featured)
    .slice(0, 4);
  
  // Get new arrivals
  const newBikes = allBikes
    .filter(bike => bike.new)
    .slice(0, 4);
  
  // Get discounted bikes
  const discountedBikes = allBikes
    .filter(bike => bike.discount)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Bar */}
      <section className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <BadgeIndianRupee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Indian Rupee Pricing</h3>
              <p className="text-xs text-muted-foreground">Transparent pricing in INR</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">50+ Premium Models</h3>
              <p className="text-xs text-muted-foreground">Extensive collection</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Premium Quality</h3>
              <p className="text-xs text-muted-foreground">World-class brands</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Secure Checkout</h3>
              <p className="text-xs text-muted-foreground">Safe payment options</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedSection 
        title="Featured Motorcycles" 
        subtitle="Our selection of premium superbikes" 
        bikes={featuredBikes} 
      />
      
      {/* New Arrivals */}
      <FeaturedSection 
        title="New Arrivals" 
        subtitle="The latest additions to our collection" 
        bikes={newBikes} 
      />
      
      {/* Special Offers */}
      {discountedBikes.length > 0 && (
        <FeaturedSection 
          title="Special Offers" 
          subtitle="Limited-time deals on select motorcycles" 
          bikes={discountedBikes} 
        />
      )}
      
      {/* Banner */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-bikeDark to-bikeDark/70 opacity-90"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://source.unsplash.com/random/1600x800?superbike,racing)', 
            backgroundBlendMode: 'overlay',
            opacity: 0.3
          }}
        ></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Authorized Dealer for Premium Brands</h2>
            <p className="mb-8">
              We are an authorized dealer for all the major premium motorcycle brands. Visit our showrooms for test rides and personalized consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/brands">
                <Button variant="default" size="lg">
                  Explore Brands
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
