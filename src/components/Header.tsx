
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, ShoppingCart, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary flex items-center space-x-2">
          <span className="hidden sm:inline">Moto</span>
          <span className="inline-block">Dark</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/bikes" className="hover:text-primary transition-colors">All Bikes</Link>
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <Link to="/brands" className="hover:text-primary transition-colors">Brands</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button (mobile) */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSearch}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleNav}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="p-4 border-t border-border animate-slide-up md:hidden">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search bikes..." 
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isNavOpen && (
        <nav className="md:hidden border-t border-border animate-slide-up">
          <div className="flex flex-col divide-y divide-border">
            <Link to="/" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>Home</Link>
            <Link to="/bikes" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>All Bikes</Link>
            <Link to="/categories" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>Categories</Link>
            <Link to="/brands" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>Brands</Link>
            <Link to="/about" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>About</Link>
            <Link to="/contact" className="px-4 py-3 hover:bg-accent" onClick={toggleNav}>Contact</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
