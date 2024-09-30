import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  // 模拟从请求中获取用户信息
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      // 这里应该是实际的用户验证逻辑
      return { id: 1, name: '示例用户' };
    }
    return null;
  };

  const user = await getUserFromHeader();

  return {
    req,
    res,
    user,
    // 您可以在这里添加其他上下文信息，如数据库连接等
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;