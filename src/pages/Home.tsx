import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeatureGrid from '../components/FeatureGrid';
import ReportPreview from '../components/ReportPreview';
import BlogCard from '../components/BlogCard';
import PricingCards from '../components/PricingCards';
import { BLOGS } from '../data/blogs';

export default function Home() {
  const featuredBlogs = BLOGS.slice(0, 3);

  return (
    <div className="bg-white">
      <Hero />
      <HowItWorks />
      <FeatureGrid />
      <ReportPreview />
      
      {/* Blog Preview Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-lg space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                Learn how better funnels convert.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredBlogs.map((blog) => (
              <BlogCard 
                key={blog.slug}            // ✅ FIX 1
                slug={blog.slug}           // ✅ FIX 2 (MOST IMPORTANT)
                category={blog.category}
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Simple pricing for smarter conversion decisions.
          </h2>
        </div>
        <PricingCards compact />
      </section>
    </div>
  );
}