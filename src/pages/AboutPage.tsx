
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">About MotoDark</h1>
        <p className="text-xl text-muted-foreground">
          India's premier destination for premium superbikes
        </p>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Founded in 2015, MotoDark began with a simple mission: to bring the world's finest motorcycles to Indian enthusiasts who demand nothing but the best. What started as a passion project by motorcycle enthusiasts has grown into India's most trusted superbike retailer.
            </p>
            <p>
              Our journey began in Bangalore with a small showroom featuring just a handful of premium bikes. Today, we operate state-of-the-art dealerships across major Indian cities, offering the most extensive collection of high-performance motorcycles in the country.
            </p>
            <p>
              At MotoDark, we believe that a superbike is more than just a mode of transportation—it's an expression of personality, a testament to engineering excellence, and above all, a source of pure, unadulterated joy.
            </p>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We represent only the finest motorcycle brands, ensuring our customers experience the pinnacle of two-wheeled engineering.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We build lasting relationships through honest advice and transparent business practices, putting our customers' needs first.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-muted-foreground">
                Our team consists of dedicated riders who share their expertise and enthusiasm for motorcycling with every customer.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Team</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
            <p>
              Behind MotoDark stands a team of motorcycle enthusiasts, racing veterans, and industry experts who bring decades of combined experience to the table. From sales consultants to service technicians, every team member is selected not just for their expertise, but for their passion for motorcycles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                <img 
                  src="https://source.unsplash.com/random/200x200?man,professional,1" 
                  alt="Rahul Sharma" 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-bold">Rahul Sharma</h3>
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                <img 
                  src="https://source.unsplash.com/random/200x200?woman,professional,2" 
                  alt="Priya Patel" 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-bold">Priya Patel</h3>
              <p className="text-sm text-muted-foreground">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                <img 
                  src="https://source.unsplash.com/random/200x200?man,professional,3" 
                  alt="Vikram Singh" 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-bold">Vikram Singh</h3>
              <p className="text-sm text-muted-foreground">Master Technician</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                <img 
                  src="https://source.unsplash.com/random/200x200?woman,professional,4" 
                  alt="Anjali Mehta" 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-bold">Anjali Mehta</h3>
              <p className="text-sm text-muted-foreground">Customer Experience</p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <div className="bg-primary/10 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Find Your Dream Ride?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Browse our extensive collection of premium motorcycles or visit one of our showrooms for a personal consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bikes">
              <Button size="lg">
                Shop Motorcycles
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
