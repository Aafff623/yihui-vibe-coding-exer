import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json(
      { error: "没有提供文件" },
      { status: 400 }
    );
  }

  // 类型检查：确保是 File 类型而不是 string
  if (typeof file === "string") {
    return Response.json(
      { error: "无效的文件类型" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 确保文件名唯一
  const fileName = `${Date.now()}-${file.name}`;
  const path = join(process.cwd(), "public", "uploads", fileName);

  try {
    await writeFile(path, buffer);
    return Response.json({
      success: true,
      fileName,
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("上传错误", error);
    return Response.json(
      { error: "文件上传失败" },
      { status: 500 }
    );
  }
}
