
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { allBikes } from '@/data/bikes';
import { formatPrice } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, ArrowLeft, Star, Check, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FeaturedSection from '@/components/FeaturedSection';
import { toast } from 'sonner';

export default function BikeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [bike, setBike] = useState(allBikes.find(b => b.id === Number(id)));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);
  
  useEffect(() => {
    // Find the bike when ID changes
    const foundBike = allBikes.find(b => b.id === Number(id));
    setBike(foundBike);
    setSelectedImage(0); // Reset selected image
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    if (!bike) return;
    if (!bike.inStock) {
      toast.error("Sorry, this bike is out of stock");
      return;
    }
    addItem(bike);
  };
  
  const handleWishlist = () => {
    toast.success(`${bike?.name} added to your wishlist`);
  };

  // Get similar bikes from the same brand or category
  const similarBikes = allBikes
    .filter(b => b.id !== Number(id) && (b.brand === bike?.brand || b.category === bike?.category))
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin-slow">
          <ShoppingCart size={40} className="text-primary" />
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bike Not Found</h2>
          <Link to="/bikes">
            <Button>Browse All Bikes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/bikes">
            <Button variant="outline" size="sm" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bikes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-accent rounded-lg overflow-hidden aspect-[4/3]">
              <img 
                src={bike.images[selectedImage]} 
                alt={bike.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {bike.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${bike.name} ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Link to={`/brands/${bike.brand.toLowerCase()}`}>
                  <Badge variant="outline" className="border-muted-foreground">
                    {bike.brand}
                  </Badge>
                </Link>
                <Link to={`/categories/${bike.category.toLowerCase()}`} className="ml-2">
                  <Badge variant="outline" className="border-muted-foreground">
                    {bike.category}
                  </Badge>
                </Link>
                <div className="ml-auto flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(bike.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{bike.rating}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{bike.name}</h1>
              
              <div className="mt-4 flex items-baseline">
                {bike.discount ? (
                  <>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(bike.price * (1 - bike.discount / 100))}
                    </p>
                    <p className="ml-2 text-lg line-through text-muted-foreground">
                      {formatPrice(bike.price)}
                    </p>
                    <Badge className="ml-3 bg-green-600">Save {bike.discount}%</Badge>
                  </>
                ) : (
                  <p className="text-2xl font-bold">{formatPrice(bike.price)}</p>
                )}
              </div>
              
              {/* Status */}
              <div className="mt-6 flex items-center">
                <div className={`flex items-center ${bike.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {bike.inStock ? (
                    <>
                      <Check className="h-5 w-5 mr-1" />
                      <span>In Stock</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span>Out of Stock</span>
                    </>
                  )}
                </div>
                {bike.new && <Badge className="ml-3 bg-blue-500">New</Badge>}
                {bike.featured && <Badge className="ml-3 bg-amber-500">Featured</Badge>}
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-muted-foreground">{bike.description}</p>
              </div>

              {/* Colors */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Colors</h3>
                <div className="flex space-x-2">
                  {bike.colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer"
                      title={color}
                    >
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ 
                          backgroundColor: color.toLowerCase().replace(/\s+/g, '') 
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!bike.inStock}
                  size="lg"
                  className="flex-1 bg-bikeRed hover:bg-bikeRed/90"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  size="lg"
                  className="flex-shrink-0"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Tabs for Specs and Details */}
            <Tabs defaultValue="specs" className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="details">Additional Details</TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {bike.specs.engine && (
                    <div>
                      <p className="text-sm text-muted-foreground">Engine</p>
                      <p className="font-medium">{bike.specs.engine}</p>
                    </div>
                  )}
                  {bike.specs.power && (
                    <div>
                      <p className="text-sm text-muted-foreground">Power</p>
                      <p className="font-medium">{bike.specs.power}</p>
                    </div>
                  )}
                  {bike.specs.torque && (
                    <div>
                      <p className="text-sm text-muted-foreground">Torque</p>
                      <p className="font-medium">{bike.specs.torque}</p>
                    </div>
                  )}
                  {bike.specs.weight && (
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{bike.specs.weight}</p>
                    </div>
                  )}
                  {bike.specs.transmission && (
                    <div>
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-medium">{bike.specs.transmission}</p>
                    </div>
                  )}
                  {bike.specs.topSpeed && (
                    <div>
                      <p className="text-sm text-muted-foreground">Top Speed</p>
                      <p className="font-medium">{bike.specs.topSpeed}</p>
                    </div>
                  )}
                  {bike.specs.fuelCapacity && (
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Capacity</p>
                      <p className="font-medium">{bike.specs.fuelCapacity}</p>
                    </div>
                  )}
                  {bike.specs.seatHeight && (
                    <div>
                      <p className="text-sm text-muted-foreground">Seat Height</p>
                      <p className="font-medium">{bike.specs.seatHeight}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="details" className="p-4 border rounded-md mt-2">
                <p className="text-muted-foreground">
                  This {bike.name} by {bike.brand} represents the pinnacle of motorcycle engineering and design. 
                  With cutting-edge technology and premium materials, this {bike.category} bike delivers uncompromising performance on both road and track.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>2-year manufacturer warranty</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Free first service included</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Extended warranty options available</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Nationwide service network</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarBikes.length > 0 && (
        <FeaturedSection 
          title="Similar Bikes" 
          subtitle="You might also like these bikes" 
          bikes={similarBikes}
          viewAllLink={`/brands/${bike.brand.toLowerCase()}`}
        />
      )}
    </div>
  );
}
