
import { Bike } from '@/types/bike';

// Helper function to generate placeholder images with different colors
const generatePlaceholderImages = (id: number, name: string): string[] => {
  return [
    `https://source.unsplash.com/random/800x600?superbike,motorcycle,${name.replace(/\s+/g, '')},${id}`,
    `https://source.unsplash.com/random/800x600?motorcycle,racing,${name.replace(/\s+/g, '')},${id+100}`,
    `https://source.unsplash.com/random/800x600?bike,speed,${name.replace(/\s+/g, '')},${id+200}`,
  ];
};

export const bikes: Bike[] = [
  {
    id: 1,
    name: "Panigale V4",
    brand: "Ducati",
    category: "Sport",
    price: 2499000,
    description: "The Panigale V4 is the most powerful production bike from the Ducati factory. The 1,103 cc V4 engine delivers extraordinary power and a unique sound.",
    specs: {
      engine: "1,103 cc Desmosedici Stradale V4",
      power: "214 hp at 13,000 rpm",
      torque: "124 Nm at 9,500 rpm",
      transmission: "6-speed with Ducati Quick Shift",
      weight: "175 kg (dry)",
      fuelCapacity: "16 liters",
      seatHeight: "835 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Red", "Black", "White"],
    images: generatePlaceholderImages(1, "Ducati Panigale V4"),
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 2,
    name: "S 1000 RR",
    brand: "BMW",
    category: "Sport",
    price: 2199000,
    description: "The BMW S 1000 RR revolutionized the supersport motorcycle category right from the outset. The current model features a new suspension geometry, optimized engine and a more lightweight design.",
    specs: {
      engine: "999 cc Inline-4",
      power: "207 hp at 13,500 rpm",
      torque: "113 Nm at 11,000 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "197 kg (wet)",
      fuelCapacity: "16.5 liters",
      seatHeight: "824 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Red/White/Blue", "Black", "White"],
    images: generatePlaceholderImages(2, "BMW S1000RR"),
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 3,
    name: "Ninja H2",
    brand: "Kawasaki",
    category: "Sport",
    price: 3599000,
    description: "The Kawasaki Ninja H2 is a supercharged supersport motorcycle with an unprecedented power output for a production motorcycle, uniquely designed aerodynamics, and cutting-edge electronics.",
    specs: {
      engine: "998 cc Supercharged Inline-4",
      power: "228 hp at 11,500 rpm",
      torque: "141.7 Nm at 11,000 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "216 kg (wet)",
      fuelCapacity: "17 liters",
      seatHeight: "825 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Mirror Coated Spark Black"],
    images: generatePlaceholderImages(3, "Kawasaki Ninja H2"),
    featured: true,
    inStock: false,
    rating: 4.9
  },
  {
    id: 4,
    name: "YZF-R1",
    brand: "Yamaha",
    category: "Sport",
    price: 1999000,
    description: "The Yamaha YZF-R1 is packed with MotoGP YZR-M1 technology and features a crossplane engine, ensuring a high level of control and rideability.",
    specs: {
      engine: "998 cc Crossplane Inline-4",
      power: "200 hp at 13,500 rpm",
      torque: "112.4 Nm at 11,500 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "201 kg (wet)",
      fuelCapacity: "17 liters",
      seatHeight: "855 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Yamaha Blue", "Tech Black", "Icon Blue"],
    images: generatePlaceholderImages(4, "Yamaha R1"),
    inStock: true,
    new: true,
    rating: 4.7
  },
  {
    id: 5,
    name: "GSX-R1000R",
    brand: "Suzuki",
    category: "Sport",
    price: 1899000,
    description: "The Suzuki GSX-R1000R offers ultimate performance with a perfect balance between power and handling, featuring advanced electronics and race-derived technologies.",
    specs: {
      engine: "999.8 cc Inline-4",
      power: "202 hp at 13,200 rpm",
      torque: "117.6 Nm at 10,800 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "203 kg (wet)",
      fuelCapacity: "16 liters",
      seatHeight: "825 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Metallic Triton Blue", "Glass Sparkle Black/Metallic Mat Black", "Pearl Glacier White"],
    images: generatePlaceholderImages(5, "Suzuki GSXR1000"),
    inStock: true,
    rating: 4.6
  },
  {
    id: 6,
    name: "CBR1000RR-R Fireblade SP",
    brand: "Honda",
    category: "Sport",
    price: 2399000,
    description: "The CBR1000RR-R Fireblade SP is Honda's most extreme supersport motorcycle, with technologies derived directly from the RC213V MotoGP machine.",
    specs: {
      engine: "1,000 cc Inline-4",
      power: "215 hp at 14,500 rpm",
      torque: "113 Nm at 12,500 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "201 kg (wet)",
      fuelCapacity: "16.1 liters",
      seatHeight: "831 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Grand Prix Red", "Matte Pearl Morion Black"],
    images: generatePlaceholderImages(6, "Honda Fireblade"),
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 7,
    name: "Street Triple RS",
    brand: "Triumph",
    category: "Naked",
    price: 1299000,
    description: "The Triumph Street Triple RS combines aggressive styling with exceptional performance, offering a perfect balance between track capability and road-going practicality.",
    specs: {
      engine: "765 cc Inline-3",
      power: "123 hp at 11,750 rpm",
      torque: "79 Nm at 9,350 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "166 kg (dry)",
      fuelCapacity: "17.4 liters",
      seatHeight: "825 mm",
      topSpeed: "260 km/h"
    },
    colors: ["Matt Jet Black", "Silver Ice", "Crystal White"],
    images: generatePlaceholderImages(7, "Triumph Street Triple"),
    inStock: true,
    discount: 10,
    rating: 4.7
  },
  {
    id: 8,
    name: "SuperDuke 1290 R",
    brand: "KTM",
    category: "Naked",
    price: 1899000,
    description: "The KTM SuperDuke 1290 R is known as 'The Beast' for a reason. It's one of the most aggressive naked bikes with explosive power and precise handling.",
    specs: {
      engine: "1,301 cc V-Twin",
      power: "180 hp at 9,500 rpm",
      torque: "140 Nm at 8,000 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "189 kg (dry)",
      fuelCapacity: "16 liters",
      seatHeight: "835 mm",
      topSpeed: "290 km/h"
    },
    colors: ["Orange", "Black"],
    images: generatePlaceholderImages(8, "KTM SuperDuke"),
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 9,
    name: "F4 RR",
    brand: "MV Agusta",
    category: "Sport",
    price: 3499000,
    description: "The MV Agusta F4 RR is Italian engineering and design at its finest, featuring a powerful engine, advanced electronics, and exclusive components.",
    specs: {
      engine: "998 cc Inline-4",
      power: "201 hp at 13,600 rpm",
      torque: "115 Nm at 9,300 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "190 kg (dry)",
      fuelCapacity: "17 liters",
      seatHeight: "830 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Pearl White/Black", "Red/Silver"],
    images: generatePlaceholderImages(9, "MV Agusta F4"),
    inStock: false,
    rating: 4.9
  },
  {
    id: 10,
    name: "RSV4 Factory",
    brand: "Aprilia",
    category: "Sport",
    price: 2599000,
    description: "The Aprilia RSV4 Factory is a race-bred superbike that has dominated World Superbike Championships, featuring a powerful V4 engine and cutting-edge electronics.",
    specs: {
      engine: "1,099 cc V4",
      power: "217 hp at 13,000 rpm",
      torque: "125 Nm at 10,500 rpm",
      transmission: "6-speed with Quick Shifter",
      weight: "199 kg (wet)",
      fuelCapacity: "18.5 liters",
      seatHeight: "851 mm",
      topSpeed: "299+ km/h"
    },
    colors: ["Aprilia Black", "Lava Red"],
    images: generatePlaceholderImages(10, "Aprilia RSV4"),
    featured: true,
    inStock: true,
    new: true,
    rating: 4.8
  },
];

// Generate more bikes to have a total of over 50
export const allBikes: Bike[] = [
  ...bikes,
  // Generate additional bikes
  ...Array.from({ length: 41 }, (_, i) => {
    const baseIndex = i % bikes.length;
    const baseBike = bikes[baseIndex];
    const id = bikes.length + i + 1;
    
    return {
      ...baseBike,
      id,
      name: `${baseBike.name} ${["Pro", "Sport", "Evo", "RS", "GT", "Limited", "Special"][i % 7]}`,
      price: Math.round(baseBike.price * (0.85 + Math.random() * 0.3)),
      images: generatePlaceholderImages(id, `${baseBike.brand} ${baseBike.name} ${i}`),
      featured: i % 12 === 0,
      new: i % 10 === 0,
      discount: i % 9 === 0 ? Math.floor(Math.random() * 15) + 5 : undefined,
      inStock: Math.random() > 0.2,
      rating: Math.min(5, baseBike.rating + (Math.random() * 0.4 - 0.2)).toFixed(1) as unknown as number
    };
  })
];
