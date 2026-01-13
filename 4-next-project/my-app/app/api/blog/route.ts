import { NextResponse } from "next/server";
import { getAllPosts } from "../../blog/data";

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "获取博客列表失败" },
      { status: 500 }
    );
  }
}
