"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "../blog/data";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
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
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* 底部提示 */}
        {showCards && (
          <div className="mt-16 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              共 {posts.length} 篇文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
