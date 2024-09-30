import { initTRPC } from "@trpc/server"
import { z } from "zod"

// 初始化TRPC
const t = initTRPC.create()

interface User {
  id: number
  name: string
  email: string
  age: number
}

const users: User[] = [
  { id: 1, name: "John", email: "john@example.com", age: 20 },
  { id: 2, name: "Jane", email: "jane@example.com", age: 21 },
  { id: 3, name: "Doe", email: "doe@example.com", age: 22 },
  { id: 4, name: "Smith", email: "smith@example.com", age: 23 },
  { id: 5, name: "Johnson", email: "johnson@example.com", age: 24 },
]

// 创建路由
export const appRouter = t.router({
  // 创建一个路由，接收一个输入参数，返回一个用户列表
  getUsers: t.procedure
    // 使用Zod验证输入
    .input(z.object({
      // 定义一个字段，类型为数组，数组中的元素为枚举类型，枚举类型为id, name, email, age
      fields: z.array(z.enum(["id", "name", "email", "age"])),
    }))
    // 定义查询逻辑
    .query(({ input }) => {
      console.log('后端接收到的输入:', input)
      // 根据 fields 过滤用户列表
      return users.map(user => {
        const filteredUser: Partial<User> = {};
        input.fields.forEach(field => {
          filteredUser[field] = user[field] as any;
        });
        return filteredUser;
      });
    }),
})

// 导出路由类型，用于客户端类型推断
export type AppRouter = typeof appRouter