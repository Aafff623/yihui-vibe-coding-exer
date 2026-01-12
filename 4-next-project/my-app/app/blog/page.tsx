"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogPosts, categoryColors } from "./data";

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [showCards, setShowCards] = useState(false);
  const fullText = "欢迎来到我的博客 ✨";

  useEffect(() => {
    setMounted(true);
    
    // 打字机效果
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setWelcomeText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // 打字完成后显示卡片
        setTimeout(() => {
          setShowCards(true);
        }, 300);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* 欢迎标题区域 */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block">
            <h1
              className={`text-4xl font-bold text-black transition-all duration-500 dark:text-zinc-50 sm:text-5xl md:text-6xl ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              {welcomeText}
              {welcomeText.length < fullText.length && (
                <span className="inline-block w-0.5 h-8 bg-blue-600 animate-pulse ml-1 dark:bg-blue-400" />
              )}
            </h1>
          </div>
          <p
            className={`mt-4 text-lg text-zinc-600 transition-all duration-700 delay-300 dark:text-zinc-400 ${
              welcomeText === fullText
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            分享技术、思考与生活
          </p>
          {/* 装饰性元素 */}
          {welcomeText === fullText && (
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-blue-600 animate-bounce dark:bg-blue-400"
                  style={{
                    animationDelay: `${i * 200}ms`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 博客卡片网格 */}
        <div
          className={`grid gap-6 transition-all duration-1000 ${
            showCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          } sm:grid-cols-2 lg:grid-cols-3`}
        >
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
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
                <p className="mb-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400 overflow-hidden text-ellipsis" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
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
          ))}
        </div>

        {/* 底部提示 */}
        {showCards && (
          <div className="mt-16 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              共 {blogPosts.length} 篇文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
