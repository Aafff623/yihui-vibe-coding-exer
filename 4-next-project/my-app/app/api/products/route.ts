import { db } from "@/lib/db";

export async function GET() {
  try {
    // 从数据库获取所有产品
    const products = await db.products.findMany();
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { error: "获取产品失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();

    // 数据验证
    if (!productData.name || !productData.price) {
      return Response.json(
        { error: "产品名称和价格是必填项" },
        { status: 400 }
      );
    }

    // 创建新产品
    const newProduct = await db.products.create({
      data: productData,
    });

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "创建产品失败" },
      { status: 500 }
    );
  }
}
