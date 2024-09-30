npm init -y
npm install express @types/express typescript ts-node
npx tsc --init
npm install -D nodemon

"scripts": {
    "start": "ts-node index.ts",
    "build": "tsc",
    "dev": "nodemon --exec ts-node index.ts"
},

npm install @trpc/server zod
npm i -D @types/cors
npm i cors 