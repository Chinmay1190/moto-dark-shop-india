
import { useState, useEffect } from 'react';
import { allBikes } from '@/data/bikes';
import BikeCard from '@/components/BikeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ChevronDown, FilterX, Search, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/utils/formatCurrency';
import { Bike, BikeCategory, BikeBrand } from '@/types/bike';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BikesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get filters from URL or set defaults
  const initialCategory = queryParams.get('category') || '';
  const initialBrand = queryParams.get('brand') || '';
  const initialMinPrice = Number(queryParams.get('minPrice')) || 0;
  const initialMaxPrice = Number(queryParams.get('maxPrice')) || 4000000;
  const initialSort = queryParams.get('sort') || 'featured';
  const initialInStock = queryParams.get('inStock') === 'true';
  const initialSearch = queryParams.get('search') || '';

  // Filter states
  const [category, setCategory] = useState<string>(initialCategory);
  const [brand, setBrand] = useState<string>(initialBrand);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(initialInStock);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  
  // UI states
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>(allBikes);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get unique categories and brands
  const categories = Array.from(new Set(allBikes.map(bike => bike.category)));
  const brands = Array.from(new Set(allBikes.map(bike => bike.brand)));
  
  // Get price range
  const maxPossiblePrice = Math.max(...allBikes.map(bike => bike.price));

  // Apply filters
  useEffect(() => {
    setIsLoading(true);
    
    // Update URL with current filters
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (brand) params.set('brand', brand);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < maxPossiblePrice) params.set('maxPrice', priceRange[1].toString());
    if (sortBy !== 'featured') params.set('sort', sortBy);
    if (inStockOnly) params.set('inStock', 'true');
    if (searchQuery) params.set('search', searchQuery);
    
    navigate({ search: params.toString() }, { replace: true });
    
    // Filter bikes
    let result = [...allBikes];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(bike => 
        bike.name.toLowerCase().includes(query) || 
        bike.brand.toLowerCase().includes(query) || 
        bike.category.toLowerCase().includes(query)
      );
    }
    
    if (category) {
      result = result.filter(bike => bike.category === category);
    }
    
    if (brand) {
      result = result.filter(bike => bike.brand === brand);
    }
    
    if (inStockOnly) {
      result = result.filter(bike => bike.inStock);
    }
    
    result = result.filter(bike => 
      bike.price >= priceRange[0] && bike.price <= priceRange[1]
    );
    
    // Apply sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default sort by featured
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.new && !b.new) return -1;
        if (!a.new && b.new) return 1;
        return b.rating - a.rating;
      });
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setFilteredBikes(result);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [category, brand, priceRange, inStockOnly, sortBy, searchQuery, navigate, maxPossiblePrice]);

  const resetFilters = () => {
    setCategory('');
    setBrand('');
    setPriceRange([0, maxPossiblePrice]);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (category) count++;
    if (brand) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPossiblePrice) count++;
    if (inStockOnly) count++;
    if (searchQuery) count++;
    return count;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden">
          <Button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)} 
            variant="outline"
            className="w-full flex justify-between"
          >
            <span className="flex items-center">
              <FilterX className="mr-2 h-4 w-4" />
              Filters {getActiveFiltersCount() > 0 ? `(${getActiveFiltersCount()})` : ''}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Filters - Left Side */}
        <div className={`lg:w-1/4 space-y-6 ${isFiltersOpen || 'hidden lg:block'}`}>
          <div className="bg-card rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <Button 
                  onClick={resetFilters} 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search</Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search bikes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-2 block">Category</Label>
              <div className="space-y-2 mt-1">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <Checkbox 
                      id={`category-${cat}`}
                      checked={category === cat}
                      onCheckedChange={() => setCategory(category === cat ? '' : cat)}
                    />
                    <label 
                      htmlFor={`category-${cat}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-2 block">Brand</Label>
              <div className="space-y-2 mt-1 max-h-48 overflow-y-auto">
                {brands.map((b) => (
                  <div key={b} className="flex items-center">
                    <Checkbox 
                      id={`brand-${b}`}
                      checked={brand === b}
                      onCheckedChange={() => setBrand(brand === b ? '' : b)}
                    />
                    <label 
                      htmlFor={`brand-${b}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {b}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-4 block">Price Range</Label>
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={maxPossiblePrice}
                step={50000}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                />
                <label 
                  htmlFor="in-stock"
                  className="ml-2 text-sm cursor-pointer"
                >
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products - Right Side */}
        <div className="lg:w-3/4">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Motorcycles</h1>
              <p className="text-muted-foreground">
                {isLoading ? 'Loading...' : `${filteredBikes.length} result${filteredBikes.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  Category: {category}
                  <button onClick={() => setCategory('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              
              {brand && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  Brand: {brand}
                  <button onClick={() => setBrand('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < maxPossiblePrice) && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button 
                    onClick={() => setPriceRange([0, maxPossiblePrice])} 
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {inStockOnly && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-muted-foreground hover:text-primary"
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Product Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin-slow">
                <ShoppingBag size={40} className="text-primary" />
              </div>
            </div>
          ) : filteredBikes.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg shadow">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No motorcycles found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query</p>
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="mt-6"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.map(bike => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
