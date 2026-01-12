// 生活数据
const lifePosts = [
  {
    id: 1,
    title: "周末咖啡时光",
    date: "2024-01-20",
    content:
      "今天去了新开的咖啡店，环境很棒，咖啡也很香。坐在窗边看着外面的行人，感觉时间都慢了下来。",
    category: "日常",
    emoji: "☕",
  },
  {
    id: 2,
    title: "春天的第一场雨",
    date: "2024-01-18",
    content:
      "下了一整天的雨，空气变得清新。窝在家里看书，听着雨声，心情特别平静。",
    category: "心情",
    emoji: "🌧️",
  },
  {
    id: 3,
    title: "学会了一道新菜",
    date: "2024-01-15",
    content:
      "今天尝试做了红烧肉，虽然第一次做，但味道还不错。做饭真的是一件很治愈的事情。",
    category: "美食",
    emoji: "🍖",
  },
  {
    id: 4,
    title: "公园散步",
    date: "2024-01-12",
    content:
      "傍晚去公园走了走，看到很多人在锻炼。自己也跟着跑了几圈，感觉整个人都精神了。",
    category: "运动",
    emoji: "🏃",
  },
  {
    id: 5,
    title: "看了一部好电影",
    date: "2024-01-10",
    content:
      "周末看了一部很感人的电影，剧情很棒，演员的演技也很到位。好的电影总是能触动人心。",
    category: "娱乐",
    emoji: "🎬",
  },
  {
    id: 6,
    title: "和朋友的聚会",
    date: "2024-01-08",
    content:
      "和几个老朋友聚在一起，聊了很多以前的事情。时间过得真快，但友谊依然如初。",
    category: "友情",
    emoji: "👥",
  },
];

// 博客文章数据
const blogPosts = [
  {
    id: 1,
    title: "JavaScript 异步编程入门",
    date: "2024-01-15",
    excerpt:
      "深入理解 Promise、async/await 等异步编程概念，掌握现代 JavaScript 异步处理技巧。",
    tags: ["JavaScript", "异步编程", "前端"],
  },
  {
    id: 2,
    title: "CSS Grid 布局完全指南",
    date: "2024-01-10",
    excerpt: "学习如何使用 CSS Grid 创建复杂的响应式布局，提升前端开发效率。",
    tags: ["CSS", "布局", "前端"],
  },
  {
    id: 3,
    title: "Git 版本控制最佳实践",
    date: "2024-01-05",
    excerpt: "分享 Git 工作流、分支策略和协作技巧，让团队协作更加高效。",
    tags: ["Git", "版本控制", "工具"],
  },
  {
    id: 4,
    title: "React Hooks 深入理解",
    date: "2023-12-28",
    excerpt: "探索 React Hooks 的原理和使用场景，编写更优雅的 React 组件。",
    tags: ["React", "Hooks", "前端"],
  },
  {
    id: 5,
    title: "Web 性能优化技巧",
    date: "2023-12-20",
    excerpt: "从加载速度、渲染优化到资源管理，全面提升网站性能。",
    tags: ["性能优化", "Web", "前端"],
  },
  {
    id: 6,
    title: "TypeScript 类型系统探索",
    date: "2023-12-15",
    excerpt: "深入了解 TypeScript 的类型系统，编写类型安全的代码。",
    tags: ["TypeScript", "类型系统", "前端"],
  },
];

// DOM 加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 渲染文章列表
  renderPosts();

  // 渲染生活列表
  renderLifePosts();

  // 初始化导航菜单
  initNavigation();

  // 初始化返回顶部按钮
  initBackToTop();

  // 初始化平滑滚动
  initSmoothScroll();
});

// 渲染文章列表
function renderPosts() {
  const postsGrid = document.getElementById("postsGrid");
  if (!postsGrid) return;

  postsGrid.innerHTML = blogPosts
    .map(
      (post) => `
        <article class="post-card" onclick="viewPost(${post.id})">
            <div class="post-date">${formatDate(post.date)}</div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-tags">
                ${post.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
            </div>
        </article>
    `
    )
    .join("");
}

// 渲染生活列表
function renderLifePosts() {
  const lifeGrid = document.getElementById("lifeGrid");
  if (!lifeGrid) return;

  lifeGrid.innerHTML = lifePosts
    .map(
      (post) => `
        <div class="life-card" onclick="viewLifePost(${post.id})">
            <div class="life-emoji">${post.emoji}</div>
            <div class="life-date">${formatDate(post.date)}</div>
            <h3 class="life-title">${post.title}</h3>
            <p class="life-content">${post.content}</p>
            <div class="life-category">${post.category}</div>
        </div>
    `
    )
    .join("");
}

// 查看生活详情
function viewLifePost(postId) {
  const post = lifePosts.find((p) => p.id === postId);
  if (post) {
    alert(
      `${post.emoji} ${post.title}\n\n${post.content}\n\n日期：${formatDate(
        post.date
      )}\n分类：${post.category}`
    );
  }
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

// 查看文章详情
function viewPost(postId) {
  const post = blogPosts.find((p) => p.id === postId);
  if (post) {
    alert(
      `文章：${post.title}\n\n${post.excerpt}\n\n发布日期：${formatDate(
        post.date
      )}`
    );
    // 这里可以跳转到文章详情页
    // window.location.href = `post.html?id=${postId}`;
  }
}

// 初始化导航菜单
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // 移动端菜单切换
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // 导航链接点击事件
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      // 更新活动状态
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // 关闭移动端菜单
      if (navMenu) {
        navMenu.classList.remove("active");
      }

      // 滚动到目标区域
      scrollToSection(targetId);
    });
  });
}

// 滚动到指定区域
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 70; // 减去导航栏高度
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// 初始化返回顶部按钮
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    // 监听滚动事件
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    // 点击返回顶部
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// 初始化平滑滚动
function initSmoothScroll() {
  // 监听滚动，更新导航栏活动状态
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// 添加页面加载动画
window.addEventListener("load", function () {
  const cards = document.querySelectorAll(".post-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.animation = "fadeInUp 0.6s ease forwards";
    }, index * 100);
  });

  const lifeCards = document.querySelectorAll(".life-card");
  lifeCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.animation = "fadeInUp 0.6s ease forwards";
    }, index * 100);
  });
});
