import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

// 前后端分离，拿不到 AppRouter 的类型定义
// 除非单独声明一份
type AppRouter = any;
// 创建 tRPC 客户端
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});