# 编程项目中的信息安全注意事项

## 一条铁律

**任何敏感数据都不能直接写在前端代码里。** 需要放在后端，通过环境变量的方式读取和管理。

### 什么算前端？

- 网页前端（HTML/CSS/JS 等）
- 浏览器扩展
- 小程序/移动端代码等

## 常见敏感数据与风险举例

| 类型           | 常见内容示例                  | 一旦泄露可能带来的问题   |
| -------------- | ----------------------------- | ------------------------ |
| API 密钥       | OpenAI、阿里云、Dify 密钥     | 密钥被滥用，导致费用亏损 |
| 数据库连接信息 | Supabase、Postgres 账号密码等 | 数据被人直接读取或篡改   |
| 第三方支付密钥 | Stripe、支付宝、微信等        | 被人伪造支付，损失资金   |
| 云服务凭证     | AWS、腾讯云、阿里云密钥       | 云资源被盗用或数据被窃取 |

## 日常开发保护方法

### 1. 用环境变量管理敏感信息

```javascript
// 错误示范
const apiKey = "sk-你的密钥";

// 推荐做法（Node.js 或服务端环境）
const apiKey = process.env.OPENAI_API_KEY;
```

- 建议建立 `.env.local` 文件存储环境变量
- 把 `.env.local` 等文件加到 `.gitignore`，别上传到 git/github
- 变量以 `NEXT_PUBLIC_` 开头的，前端能拿到；其他的只能后端用

### 2. Next.js 环境变量配置举例

```env
# .env.local
NEXT_PUBLIC_API_BASE=https://example.com/api
SECRET_API_KEY=你的密钥
```

### 3. 数据库访问安全（以 Supabase 为例）

```sql
-- 建议开启行级安全（RLS）
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- 只允许用户访问自己的数据
CREATE POLICY "User can access own data"
ON your_table FOR SELECT USING (auth.uid() = user_id);
```

### 4. 前端本地存储注意事项

**不要把这些信息放在 localStorage 里：**

- 用户密码
- 详细隐私信息
- 重要支付信息

**推荐：**

- sessionStorage（仅会话有效，一关网页就清空）
- HttpOnly Cookie（浏览器 JS 也读不到，更安全）

```javascript
// 服务端设置 cookie（举例）
res.setHeader(
  "Set-Cookie",
  "token=your_token; HttpOnly; Secure; SameSite=Strict"
);
```

### 5. 给 API 密钥设置调用额度

所有第三方 API 密钥都建议设置用量上限，避免泄漏后严重超支。

## 上线前安全小清单

- [ ] 没有敏感数据硬编码在仓库、前端代码里
- [ ] 本地和部署环境的环境变量配置无误
- [ ] 没有把密钥、配置等上传到 github
- [ ] 数据库像 Supabase 已设置 RLS
- [ ] 已经做了登录/鉴权
- [ ] 客户端无敏感信息存储
- [ ] 所有 API 密钥都有限制调用额度

---

**总结一句话：敏感信息只放后端，所有校验、鉴权都交给接口去做，不要觉得“只有我自己会看这个项目”。安全无小事！**
