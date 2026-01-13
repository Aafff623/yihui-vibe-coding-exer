// 简单的内存数据库模拟
// 在实际项目中，这里应该是真实的数据库连接（如 Prisma、Mongoose 等）

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  createdAt?: Date;
}

// 内存存储（仅用于示例，生产环境应使用真实数据库）
let products: Product[] = [
  { id: 1, name: "示例产品1", price: 99.99, description: "这是一个示例产品" },
  { id: 2, name: "示例产品2", price: 199.99, description: "这是另一个示例产品" },
];

export const db = {
  products: {
    findMany: async (): Promise<Product[]> => {
      return products;
    },
    create: async ({ data }: { data: Omit<Product, "id"> }): Promise<Product> => {
      const newProduct: Product = {
        id: products.length + 1,
        ...data,
        createdAt: new Date(),
      };
      products.push(newProduct);
      return newProduct;
    },
  },
};
