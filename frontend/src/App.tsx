import { useRef } from "react";
import { trpc } from "./trpc-client";

function App() {
  const resultRef = useRef<HTMLDivElement>(null);
  const onClick = async () => {
    try {
      // 使用 tRPC 客户端调用 getUsers 方法
      // 就是返回值的结构有变化
      const data = await (trpc as any).getUsers.query({
        fields: ["id", "name", "email"]
      });
      resultRef.current!.innerHTML = JSON.stringify(data);
    } catch (error: unknown) {
      console.error("请求错误:", error);
      resultRef.current!.innerHTML = `错误: ${(error as Error).message}`;
    }
  };
  return (
    <div>
      <h1>发起请求</h1>
      <button onClick={onClick}>发起请求</button>
      <div id="result" ref={resultRef} style={{ width: "100%", height: "100px", border: "1px solid #000" }}>
        请求结果：
      </div>
    </div>
  );
}

export default App;
