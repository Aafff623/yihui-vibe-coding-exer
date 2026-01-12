import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/30 font-sans dark:from-black dark:via-zinc-900 dark:to-zinc-800">
      <main className="container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            关于 Next.js 和 Nuxt.js
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            由 <span className="font-semibold text-blue-600 dark:text-blue-400">threetwoa</span> 整理
          </p>
        </div>

        {/* 左右两栏布局 */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          {/* Next.js 部分 - 左栏 */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black dark:bg-white">
                <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={36}
                  height={36}
                />
              </div>
              <h2 className="text-3xl font-bold text-black dark:text-zinc-50">
                Next.js
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="text-black dark:text-zinc-50">Next.js</strong>{" "}
                是由 Vercel 开发的基于 React 的全栈框架，专为生产环境优化。
              </p>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50">
                  核心特性：
                </h3>
                <ul className="ml-4 space-y-2">
                  <li className="list-disc">
                    <strong>服务端渲染 (SSR)</strong>：在服务器上渲染 React
                    组件，提升首屏加载速度和 SEO
                  </li>
                  <li className="list-disc">
                    <strong>静态站点生成 (SSG)</strong>：在构建时预渲染页面，适合内容相对静态的网站
                  </li>
                  <li className="list-disc">
                    <strong>增量静态再生 (ISR)</strong>：结合 SSG 和 SSR
                    的优势，在运行时按需更新静态页面
                  </li>
                  <li className="list-disc">
                    <strong>API 路由</strong>：内置 API 路由功能，可以创建后端
                    API 端点
                  </li>
                  <li className="list-disc">
                    <strong>文件系统路由</strong>：基于文件系统的路由，自动生成路由
                  </li>
                  <li className="list-disc">
                    <strong>图像优化</strong>：内置 Image
                    组件，自动优化图片加载
                  </li>
                  <li className="list-disc">
                    <strong>TypeScript 支持</strong>：开箱即用的 TypeScript
                    支持
                  </li>
                </ul>
              </div>
              <p className="pt-2">
                Next.js 非常适合构建需要 SEO
                优化的网站、电商平台、博客以及需要服务端渲染的复杂应用。
              </p>
            </div>
          </section>

          {/* Nuxt.js 部分 - 右栏 */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h2 className="text-3xl font-bold text-black dark:text-zinc-50">
                Nuxt.js
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="text-black dark:text-zinc-50">Nuxt.js</strong>{" "}
                是基于 Vue.js 的元框架，旨在简化 Vue
                应用的开发，提供开箱即用的最佳实践。
              </p>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50">
                  核心特性：
                </h3>
                <ul className="ml-4 space-y-2">
                  <li className="list-disc">
                    <strong>服务端渲染 (SSR)</strong>：支持 Vue
                    组件的服务端渲染，提升性能和 SEO
                  </li>
                  <li className="list-disc">
                    <strong>静态站点生成 (SSG)</strong>：可以生成完全静态的网站，部署到任何静态托管服务
                  </li>
                  <li className="list-disc">
                    <strong>自动代码分割</strong>：智能的代码分割，按需加载组件和页面
                  </li>
                  <li className="list-disc">
                    <strong>约定优于配置</strong>：基于文件系统的路由、布局和中间件，减少配置工作
                  </li>
                  <li className="list-disc">
                    <strong>模块系统</strong>：丰富的模块生态系统，轻松集成各种功能
                  </li>
                  <li className="list-disc">
                    <strong>TypeScript 支持</strong>：完整的 TypeScript
                    支持，类型安全
                  </li>
                  <li className="list-disc">
                    <strong>开发体验</strong>：热模块替换
                    (HMR)、自动导入、强大的开发工具
                  </li>
                </ul>
              </div>
              <p className="pt-2">
                Nuxt.js 非常适合 Vue.js 开发者，特别适合构建需要 SEO
                优化的网站、内容管理系统、企业级应用。
              </p>
            </div>
          </section>
        </div>

        {/* 底部总结 */}
        <section className="mb-12 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-10 shadow-xl dark:border-blue-800 dark:from-zinc-900 dark:to-zinc-800">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-black dark:text-zinc-50 sm:text-4xl">
              总结
            </h2>
            <div className="space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                <strong className="text-black dark:text-zinc-50">Next.js</strong> 和{" "}
                <strong className="text-black dark:text-zinc-50">Nuxt.js</strong>{" "}
                都是优秀的全栈框架，它们各自基于不同的前端库（React 和 Vue.js），但都提供了相似的功能和开发体验。
              </p>
              <p>
                选择哪个框架主要取决于你的技术栈偏好：如果你熟悉{" "}
                <strong className="text-blue-600 dark:text-blue-400">React</strong>，Next.js
                会是更自然的选择；如果你熟悉{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">Vue.js</strong>，Nuxt.js
                则更适合你。
              </p>
              <p>
                两者都提供了出色的开发体验、强大的性能优化和丰富的生态系统。无论选择哪个，都能帮助你构建现代化的、高性能的 Web 应用。
              </p>
              <div className="mt-8 pt-6 border-t border-zinc-300 dark:border-zinc-700">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  — <span className="font-semibold text-blue-600 dark:text-blue-400">threetwoa</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 返回首页链接 */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] bg-white px-8 text-base font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
          >
            返回首页
          </Link>
        </div>
      </main>
    </div>
  );
}
