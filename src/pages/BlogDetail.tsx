import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { BLOGS } from "../data/blogs";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = BLOGS.find((item) => item.slug === slug);
  const relatedBlogs = BLOGS.filter((item) => item.slug !== slug).slice(0, 3);

  if (!blog) {
    return (
      <div className="pt-40 pb-24 px-6 bg-white min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-500 mb-8">This blog URL is incorrect.</p>
        <Link to="/blogs" className="text-violet-600 font-bold">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const takeaways = blog.sections.slice(0, 3).map((section) => section.heading);

  return (
    <div className="bg-[#fbfbfd] min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 z-[60]" />

      <section className="pt-36 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-violet-600 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-stretch">
            <div className="rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-gray-200/60 p-8 md:p-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles className="w-4 h-4" />
                {blog.category}
              </span>

              <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tight leading-[1.02] text-gray-950 mb-8">
                {blog.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-4xl">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-50 text-sm font-semibold text-gray-600">
                  <User className="w-4 h-4 text-violet-600" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-50 text-sm font-semibold text-gray-600">
                  <Calendar className="w-4 h-4 text-violet-600" />
                  {blog.date}
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-50 text-sm font-semibold text-gray-600">
                  <Clock className="w-4 h-4 text-violet-600" />
                  {blog.readTime}
                </div>
              </div>
            </div>

            <div className="rounded-[3rem] bg-gray-950 text-white p-8 md:p-10 shadow-2xl shadow-violet-200 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-500/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-6">
                  Strategic takeaways
                </p>

                <div className="space-y-5">
                  {takeaways.map((item) => (
                    <div key={item} className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-violet-300 shrink-0" />
                      <p className="font-semibold text-gray-100 leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/dashboard/new-audit"
                className="relative mt-10 inline-flex items-center justify-center gap-2 w-full rounded-full bg-white text-gray-950 px-6 py-4 font-bold hover:bg-violet-100 transition-colors"
              >
                Run Your Funnel Audit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] bg-gray-100 shadow-2xl shadow-gray-200/70">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[340px] md:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-3">
              {blog.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="backdrop-blur-xl bg-white/85 border border-white/50 rounded-2xl px-5 py-4 shadow-xl"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {stat.label}
                  </p>
                  <p className="font-bold text-gray-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr_360px] gap-8">
          <aside className="hidden lg:block sticky top-28 h-fit">
            <div className="rounded-[2rem] bg-white/80 backdrop-blur border border-gray-100 shadow-xl shadow-gray-100 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                In this guide
              </p>
              <div className="space-y-3">
                {blog.sections.map((section) => (
                  <a
                    key={section.heading}
                    href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`}
                    className="block text-sm font-semibold text-gray-500 hover:text-violet-600 transition-colors leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-100 p-8 md:p-10 mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                {blog.intro}
              </p>
            </div>

            <div className="space-y-8">
              {blog.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={section.heading.toLowerCase().replaceAll(" ", "-")}
                  className="scroll-mt-32 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm p-8 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center font-black">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-950">
                      {section.heading}
                    </h2>
                  </div>

                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lg text-gray-600 leading-relaxed mb-5"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <section className="mt-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-100 overflow-hidden">
              <div className="p-8 md:p-10 border-b border-gray-100">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-5">
                  <Target className="w-4 h-4" />
                  Funnel diagnosis
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-950">
                  Conversion analysis table
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {blog.table.map((row) => (
                  <div
                    key={row.problem}
                    className="grid md:grid-cols-[1fr_1fr_1.2fr] gap-0"
                  >
                    <div className="p-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Problem
                      </p>
                      <p className="font-bold text-gray-950">{row.problem}</p>
                    </div>
                    <div className="p-6 bg-gray-50/70">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Impact
                      </p>
                      <p className="text-gray-600">{row.impact}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-2">
                        Recommended fix
                      </p>
                      <p className="text-gray-700 font-medium">{row.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2.5rem] bg-gray-950 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />
              <h2 className="relative text-3xl font-display font-bold mb-5">
                Final thought
              </h2>
              <p className="relative text-lg text-gray-300 leading-relaxed">
                {blog.finalThought}
              </p>
            </section>

            <section className="mt-12">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                    Keep learning
                  </p>
                  <h2 className="text-3xl font-display font-bold">
                    Related guides
                  </h2>
                </div>
                <Link
                  to="/blogs"
                  className="hidden md:inline-flex items-center gap-2 font-bold text-gray-600 hover:text-violet-600"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blogs/${item.slug}`}
                    className="group rounded-[2rem] bg-white border border-gray-100 p-4 hover:shadow-2xl hover:shadow-gray-200 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 object-cover rounded-[1.5rem] grayscale group-hover:grayscale-0 transition-all mb-5"
                    />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-2">
                      {item.category}
                    </p>
                    <h3 className="font-bold text-gray-950 leading-snug group-hover:text-violet-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
            <div className="rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-100 p-7">
              <h3 className="font-display font-bold text-xl mb-6">
                {blog.chartTitle}
              </h3>

              <div className="space-y-5">
                {blog.chart.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="text-gray-950">{item.value}%</span>
                    </div>

                    <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-violet-50 border border-violet-100 p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
                Free AI audit
              </p>
              <h3 className="font-display font-bold text-2xl mb-3">
                Find your biggest conversion leak.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Paste your landing page URL and get a prioritized action plan in
                minutes.
              </p>

              <Link
                to="/dashboard/new-audit"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-full bg-gray-950 text-white font-bold hover:bg-violet-700 transition-colors"
              >
                Run Free Audit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}