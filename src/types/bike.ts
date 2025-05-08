
export interface Bike {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  specs: {
    engine?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    weight?: string;
    fuelCapacity?: string;
    seatHeight?: string;
    topSpeed?: string;
  };
  colors: string[];
  images: string[];
  featured?: boolean;
  new?: boolean;
  discount?: number;
  inStock: boolean;
  rating: number;
}

export type BikeCategory = 'Sport' | 'Cruiser' | 'Adventure' | 'Naked' | 'Touring' | 'Retro';
export type BikeBrand = 'Ducati' | 'BMW' | 'Honda' | 'Kawasaki' | 'Yamaha' | 'Suzuki' | 'Triumph' | 'KTM' | 'MV Agusta' | 'Aprilia';
