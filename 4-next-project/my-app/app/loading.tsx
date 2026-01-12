export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white"></div>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            加载中...
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            请稍候，正在加载内容
          </p>
        </div>
      </main>
    </div>
  );
}
