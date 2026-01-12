import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <h1 className="text-8xl font-bold text-black dark:text-zinc-50">
              404
            </h1>
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            页面未找到
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移除。
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex h-12 items-center justify-center rounded-full bg-black px-6 text-base font-medium text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc]"
            >
              返回首页
            </Link>
            <Link
              href="/about"
              className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-base font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
            >
              关于我们
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
