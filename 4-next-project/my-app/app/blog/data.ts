export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  content: string;
  author?: string;
}

// 分类颜色映射
export const categoryColors: Record<string, string> = {
  技术: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  编程: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  设计: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  工具: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

// 生成 slug 的工具函数
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格替换为连字符
    .replace(/-+/g, "-") // 多个连字符替换为单个
    .trim();
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Next.js 16 新特性深度解析",
    excerpt:
      "探索 Next.js 16 带来的全新功能和性能优化，包括 React Server Components 的改进...",
    date: "2024-01-20",
    category: "技术",
    readTime: "5 分钟",
    slug: "nextjs-16-new-features",
    author: "开发者",
    content: `
# Next.js 16 新特性深度解析

Next.js 16 带来了许多令人兴奋的新特性和改进，让我们深入探索这些变化。

## React Server Components 的改进

Next.js 16 对 React Server Components 进行了重大改进，提供了更好的性能和开发体验。

### 性能优化

- **更快的初始加载**：通过优化服务器组件的渲染流程，首屏加载时间显著减少
- **更小的包体积**：客户端 JavaScript 包体积减少了约 30%
- **更好的缓存策略**：新的缓存机制让数据获取更加高效

### 开发体验提升

- **更好的错误处理**：改进了错误边界和错误信息展示
- **更清晰的调试信息**：开发模式下提供更详细的组件树信息
- **类型安全**：更好的 TypeScript 支持

## 新的路由系统

Next.js 16 引入了全新的路由系统，提供了更灵活的路由配置。

### 动态路由增强

- 支持更复杂的路由模式
- 更好的参数验证
- 改进的中间件支持

### 布局系统

- 嵌套布局更加灵活
- 支持条件布局
- 更好的布局共享机制

## 性能监控

Next.js 16 内置了性能监控工具，帮助开发者更好地了解应用性能。

### 核心指标

- **LCP (Largest Contentful Paint)**：最大内容绘制时间
- **FID (First Input Delay)**：首次输入延迟
- **CLS (Cumulative Layout Shift)**：累积布局偏移

### 优化建议

Next.js 16 会自动分析你的应用并提供优化建议，帮助你提升性能。

## 总结

Next.js 16 是一个重大更新，带来了许多实用的新特性。无论是性能优化还是开发体验，都有了显著提升。建议所有 Next.js 开发者尽快升级到新版本。
    `,
  },
  {
    id: 2,
    title: "TypeScript 最佳实践指南",
    excerpt:
      "分享在大型项目中使用 TypeScript 的经验和技巧，提升代码质量和开发效率...",
    date: "2024-01-18",
    category: "编程",
    readTime: "8 分钟",
    slug: "typescript-best-practices",
    author: "开发者",
    content: `
# TypeScript 最佳实践指南

TypeScript 已经成为现代前端开发的标准工具。本文将分享在大型项目中使用 TypeScript 的最佳实践。

## 类型定义策略

### 使用接口而非类型别名（在需要扩展时）

\`\`\`typescript
// 推荐：使用接口
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  role: 'admin';
}

// 避免：过度使用类型别名
type User = {
  name: string;
  email: string;
}
\`\`\`

### 严格模式配置

确保在 tsconfig.json 中启用严格模式：

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## 代码组织

### 模块化设计

- 将类型定义放在单独的文件中
- 使用命名空间组织相关类型
- 避免全局类型污染

### 工具类型的使用

充分利用 TypeScript 提供的工具类型：

\`\`\`typescript
// Partial: 所有属性变为可选
type PartialUser = Partial<User>;

// Pick: 选择特定属性
type UserName = Pick<User, 'name'>;

// Omit: 排除特定属性
type UserWithoutEmail = Omit<User, 'email'>;
\`\`\`

## 错误处理

### 使用类型守卫

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
\`\`\`

### 避免使用 any

尽量使用 unknown 替代 any，并在使用时进行类型检查。

## 总结

遵循这些最佳实践可以帮助你编写更安全、更易维护的 TypeScript 代码。
    `,
  },
  {
    id: 3,
    title: "Tailwind CSS 设计系统构建",
    excerpt:
      "如何利用 Tailwind CSS 构建可扩展的设计系统，统一项目的视觉风格...",
    date: "2024-01-15",
    category: "设计",
    readTime: "6 分钟",
    slug: "tailwind-css-design-system",
    author: "开发者",
    content: `
# Tailwind CSS 设计系统构建

Tailwind CSS 提供了强大的工具来构建一致且可扩展的设计系统。

## 设计令牌

### 颜色系统

在 tailwind.config.js 中定义你的颜色系统：

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... 更多色阶
        }
      }
    }
  }
}
\`\`\`

### 间距系统

统一使用 Tailwind 的间距系统，保持一致性。

## 组件模式

### 使用 @apply 指令

\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg;
}
\`\`\`

### 组合类名

创建可复用的类名组合：

\`\`\`html
<div class="card-base">
  <h2 class="heading-lg">标题</h2>
</div>
\`\`\`

## 响应式设计

利用 Tailwind 的响应式前缀：

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  响应式文本
</div>
\`\`\`

## 总结

通过合理使用 Tailwind CSS 的功能，可以构建出既灵活又一致的设计系统。
    `,
  },
  {
    id: 4,
    title: "React 性能优化实战",
    excerpt:
      "深入探讨 React 应用的性能优化策略，包括代码分割、懒加载和渲染优化...",
    date: "2024-01-12",
    category: "技术",
    readTime: "10 分钟",
    slug: "react-performance-optimization",
    author: "开发者",
    content: `
# React 性能优化实战

性能优化是 React 应用开发中的重要课题。本文将深入探讨各种优化策略。

## 代码分割

### 路由级别的代码分割

使用 React.lazy 和 Suspense：

\`\`\`typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 组件级别的代码分割

对于大型组件，也可以进行代码分割。

## 渲染优化

### 使用 React.memo

避免不必要的重新渲染：

\`\`\`typescript
const MemoizedComponent = React.memo(MyComponent);
\`\`\`

### useMemo 和 useCallback

缓存计算结果和函数：

\`\`\`typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething();
}, []);
\`\`\`

## 虚拟滚动

对于长列表，使用虚拟滚动：

\`\`\`typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

## 总结

通过合理使用这些优化策略，可以显著提升 React 应用的性能。
    `,
  },
  {
    id: 5,
    title: "现代前端开发工具链",
    excerpt:
      "介绍当前最流行的前端开发工具和构建流程，提升开发体验和效率...",
    date: "2024-01-10",
    category: "工具",
    readTime: "7 分钟",
    slug: "modern-frontend-toolchain",
    author: "开发者",
    content: `
# 现代前端开发工具链

现代前端开发离不开强大的工具链支持。本文将介绍当前最流行的工具。

## 构建工具

### Vite

Vite 提供了极速的开发体验：

- 快速的 HMR（热模块替换）
- 基于 ESM 的构建
- 丰富的插件生态

### Webpack

虽然 Vite 很流行，但 Webpack 仍然是许多项目的选择：

- 成熟的生态系统
- 丰富的配置选项
- 强大的代码分割能力

## 代码质量工具

### ESLint

代码检查工具：

\`\`\`json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-console": "warn"
  }
}
\`\`\`

### Prettier

代码格式化工具，与 ESLint 配合使用。

## 测试工具

### Vitest

快速的单元测试框架，与 Vite 完美集成。

### Playwright

端到端测试工具，支持多浏览器。

## 总结

选择合适的工具链可以大大提升开发效率和代码质量。
    `,
  },
  {
    id: 6,
    title: "Web 可访问性设计原则",
    excerpt:
      "学习如何创建对所有人都友好的网站，遵循 WCAG 指南和最佳实践...",
    date: "2024-01-08",
    category: "设计",
    readTime: "9 分钟",
    slug: "web-accessibility-principles",
    author: "开发者",
    content: `
# Web 可访问性设计原则

可访问性是 Web 开发中的重要考虑因素。本文将介绍如何创建对所有人都友好的网站。

## WCAG 指南

### 四个核心原则

1. **可感知性**：信息和用户界面组件必须以用户能够感知的方式呈现
2. **可操作性**：用户界面组件和导航必须可操作
3. **可理解性**：信息和用户界面的操作必须可理解
4. **健壮性**：内容必须足够健壮，能够被各种用户代理（包括辅助技术）可靠地解释

## 实践建议

### 语义化 HTML

使用正确的 HTML 标签：

\`\`\`html
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
    </ul>
  </nav>
</header>
\`\`\`

### ARIA 属性

在必要时使用 ARIA 属性：

\`\`\`html
<button aria-label="关闭对话框">×</button>
\`\`\`

### 颜色对比度

确保文本和背景有足够的对比度（至少 4.5:1）。

### 键盘导航

确保所有功能都可以通过键盘访问。

## 测试工具

- **axe DevTools**：浏览器扩展，检测可访问性问题
- **WAVE**：Web 可访问性评估工具
- **Lighthouse**：Chrome 内置的可访问性审计工具

## 总结

遵循可访问性设计原则不仅能让更多人使用你的网站，还能提升整体的用户体验。
    `,
  },
];

// 根据 slug 获取文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// 获取所有文章
export function getAllPosts(): BlogPost[] {
  return blogPosts;
}
