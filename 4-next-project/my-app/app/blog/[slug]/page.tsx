import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, categoryColors } from "../data";

// 简单的 Markdown 渲染函数
function renderMarkdown(content: string): string {
  const lines = content.trim().split("\n");
  let html = "";
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockContent = "";
  let inList = false;
  let listType: "ul" | "ol" | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 处理代码块
    if (line.startsWith("```")) {
      // 关闭列表（如果在列表中）
      if (inList) {
        html += listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
        listType = null;
      }

      if (inCodeBlock) {
        // 结束代码块
        html += `<pre class="rounded-lg p-4 bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 overflow-x-auto"><code class="text-sm text-zinc-100">${escapeHtml(codeBlockContent)}</code></pre>`;
        codeBlockContent = "";
        inCodeBlock = false;
        codeBlockLang = "";
      } else {
        // 开始代码块
        codeBlockLang = line.substring(3).trim();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n";
      continue;
    }

    // 处理标题
    if (line.startsWith("# ")) {
      if (inList) {
        html += listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
        listType = null;
      }
      html += `<h1 class="text-3xl font-bold mt-8 mb-4 text-black dark:text-zinc-50">${line.substring(2)}</h1>`;
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) {
        html += listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
        listType = null;
      }
      html += `<h2 class="text-2xl font-bold mt-8 mb-4 text-black dark:text-zinc-50">${line.substring(3)}</h2>`;
      continue;
    }
    if (line.startsWith("### ")) {
      if (inList) {
        html += listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
        listType = null;
      }
      html += `<h3 class="text-xl font-bold mt-6 mb-3 text-black dark:text-zinc-50">${line.substring(4)}</h3>`;
      continue;
    }

    // 处理列表项
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList || listType !== "ul") {
        if (inList && listType === "ol") {
          html += "</ol>";
        }
        html += '<ul class="list-disc ml-6 mb-6 space-y-2 text-zinc-700 dark:text-zinc-300">';
        inList = true;
        listType = "ul";
      }
      const listItem = line.substring(2);
      html += `<li>${processInlineMarkdown(listItem)}</li>`;
      continue;
    }

    // 处理数字列表
    if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== "ol") {
        if (inList && listType === "ul") {
          html += "</ul>";
        }
        html += '<ol class="list-decimal ml-6 mb-6 space-y-2 text-zinc-700 dark:text-zinc-300">';
        inList = true;
        listType = "ol";
      }
      const listItem = line.replace(/^\d+\.\s/, "");
      html += `<li>${processInlineMarkdown(listItem)}</li>`;
      continue;
    }

    // 处理空行
    if (line.trim() === "") {
      if (inList) {
        html += listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
        listType = null;
      }
      html += "<br />";
      continue;
    }

    // 关闭列表（如果遇到普通段落）
    if (inList) {
      html += listType === "ol" ? "</ol>" : "</ul>";
      inList = false;
      listType = null;
    }

    // 处理普通段落
    html += `<p class="mb-6 leading-8 text-zinc-700 dark:text-zinc-300">${processInlineMarkdown(line)}</p>`;
  }

  // 关闭未关闭的列表
  if (inList) {
    html += listType === "ol" ? "</ol>" : "</ul>";
  }

  // 如果还有未关闭的代码块
  if (inCodeBlock) {
    html += `<pre class="rounded-lg p-4 bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 overflow-x-auto"><code class="text-sm text-zinc-100">${escapeHtml(codeBlockContent)}</code></pre>`;
  }

  return html;
}

// 处理行内 Markdown
function processInlineMarkdown(text: string): string {
  // 处理粗体
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-black dark:text-zinc-50">$1</strong>');
  // 处理行内代码
  text = text.replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-blue-600 dark:text-blue-400 text-sm font-mono">$1</code>');
  // 处理链接
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');
  return text;
}

// HTML 转义
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} | 我的博客`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <span>←</span>
          <span>返回博客列表</span>
        </Link>

        {/* 文章头部 */}
        <article className="mx-auto max-w-4xl">
          <header className="mb-8">
            {/* 分类和阅读时间 */}
            <div className="mb-4 flex items-center gap-4">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  categoryColors[post.category] ||
                  "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {post.category}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {post.readTime}
              </span>
              {post.author && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  作者：{post.author}
                </span>
              )}
            </div>

            {/* 标题 */}
            <h1 className="mb-4 text-4xl font-bold leading-tight text-black dark:text-zinc-50 sm:text-5xl">
              {post.title}
            </h1>

            {/* 日期 */}
            <time className="text-base text-zinc-600 dark:text-zinc-400">
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          {/* 文章内容 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-800 sm:p-12">
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-zinc-50 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-6 prose-p:leading-8 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-black dark:prose-strong:text-zinc-50 prose-ul:my-6 prose-ul:space-y-2 prose-li:text-zinc-700 dark:prose-li:text-zinc-300 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content),
              }}
            />
          </div>

          {/* 文章底部 */}
          <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <span>←</span>
                <span>返回博客</span>
              </Link>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                阅读时间：{post.readTime}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
