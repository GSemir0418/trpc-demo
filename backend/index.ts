import express, { Express, Request, Response } from "express"
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { createContext } from "./trpc-context";
import cors from 'cors';

const app: Express = express()
const port = 3000

// 添加 CORS 中间件
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }))

app.listen(port, () => {
    console.log(`服务器正在运行，端口号为 ${port}`)
})