
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BikeDetailPage from "./pages/BikeDetailPage";
import BikesPage from "./pages/BikesPage";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import BrandsPage from "./pages/BrandsPage";
import BrandPage from "./pages/BrandPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/bikes" element={<BikesPage />} />
                  <Route path="/bikes/:id" element={<BikeDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/categories/:categoryId" element={<CategoryPage />} />
                  <Route path="/brands" element={<BrandsPage />} />
                  <Route path="/brands/:brandId" element={<BrandPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
