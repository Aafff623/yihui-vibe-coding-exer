import Link from "next/link";
import { BlogPost } from "../blog/data";
import { categoryColors } from "../blog/data";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-zinc-800"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* 卡片装饰背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20 dark:to-purple-900/20" />

      <div className="relative z-10">
        {/* 分类标签 */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[post.category] ||
              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {post.category}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {post.readTime}
          </span>
        </div>

        {/* 标题 */}
        <h2 className="mb-3 text-xl font-bold text-black transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
          {post.title}
        </h2>

        {/* 摘要 */}
        <p
          className="mb-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.excerpt}
        </p>

        {/* 日期和阅读更多 */}
        <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
          <time className="text-xs text-zinc-500 dark:text-zinc-400">
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-xs font-medium text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400">
            阅读更多 →
          </span>
        </div>
      </div>

      {/* 悬停时的光效 */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20" />
    </Link>
  );
}
