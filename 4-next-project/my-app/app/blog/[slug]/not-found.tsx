import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-black dark:text-zinc-50 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
          文章未找到
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          抱歉，您访问的文章不存在或已被删除。
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-medium transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <span>←</span>
          <span>返回博客列表</span>
        </Link>
      </div>
    </div>
  );
}
