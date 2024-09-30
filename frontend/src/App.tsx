import { useRef } from "react";

function App() {
  const resultRef = useRef<HTMLDivElement>(null);
  const onClick = async () => {
    try {
      const input = {
        fields: ["id", "name", "email"]
      };
      const queryString = encodeURIComponent(JSON.stringify(input));
      const response = await fetch(`http://localhost:3000/trpc/getUsers?input=${queryString}`, {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      resultRef.current!.innerHTML = JSON.stringify(data.result.data);
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
