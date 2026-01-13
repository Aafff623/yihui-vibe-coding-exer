import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans dark:from-zinc-900 dark:via-zinc-800 dark:to-black">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-900/20" />
      </div>

      <main className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-8 sm:px-16">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
              欢迎来到
            </h1>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
              threetwoa
            </span>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
              的网站
            </h1>
          </div>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            这是一个基于 Next.js
            构建的现代化网站，包含博客、关于等页面。探索我们的内容，了解更多信息。
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 text-base font-medium sm:flex-row sm:justify-start">
          <Link
            className="flex h-12 min-w-[140px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            href="/blog"
          >
            <span>📝</span>
            <span>查看博客</span>
          </Link>
          <Link
            className="flex h-12 min-w-[140px] items-center justify-center whitespace-nowrap rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="/about"
          >
            关于我们
          </Link>
          <a
            className="flex h-12 min-w-[140px] items-center justify-center whitespace-nowrap rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            文档
          </a>
        </div>
      </main>
    </div>
  );
}
