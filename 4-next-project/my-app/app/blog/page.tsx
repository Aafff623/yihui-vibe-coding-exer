import { getAllPosts } from "./data";
import BlogList from "../components/BlogList";

async function getBlogPosts() {
  // 模拟服务端数据获取延迟
  await new Promise((resolve) => setTimeout(resolve, 0));
  return getAllPosts();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogList posts={posts} />;
}
