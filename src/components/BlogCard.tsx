import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type BlogCardProps = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

export default function BlogCard(props: BlogCardProps) {
  const { slug, category, title, excerpt, image } = props;

  return (
    <Link to={`/blogs/${slug}`} className="block group">
      <div className="flex flex-col bg-white transition-transform duration-300 hover:-translate-y-2">
        <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-violet-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-violet-100 group-hover:to-blue-100 transition-all duration-700" />

          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

          <div className="absolute inset-x-0 bottom-0 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-white font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Read Full Blog <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        <div className="space-y-4 px-2">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full group-hover:bg-violet-100 group-hover:text-violet-700 transition-colors">
            {category}
          </span>

          <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-violet-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-base text-gray-500 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all duration-300">
            Read Story <ArrowUpRight className="w-4 h-4 text-violet-600" />
          </span>
        </div>
      </div>
    </Link>
  );
}