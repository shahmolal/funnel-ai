import BlogCard from "../components/BlogCard";
import { BLOGS } from "../data/blogs";

export default function Blogs() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            Conversion Insights.
          </h1>

          <p className="text-lg text-gray-500 font-medium">
            Deep professional guides about funnel optimization, landing page
            strategy, conversion psychology, SaaS growth, and better CTAs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {BLOGS.map((blog) => (
            <div key={blog.slug}>
              <BlogCard
                slug={blog.slug}
                category={blog.category}
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}