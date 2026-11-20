import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// Serves api/chat.ts during `npm run dev` the way Vercel does in production.
const devApi = (): Plugin => ({
  name: "dev-api-chat",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      const chunks: Buffer[] = [];
      for await (const c of req) chunks.push(c as Buffer);
      const mod = await server.ssrLoadModule("/api/chat.ts");
      const request = new Request(`http://${req.headers.host ?? "localhost"}/api/chat`, {
        method: req.method,
        headers: req.headers as Record<string, string>,
        body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
      });
      const response: Response = req.method === "POST" ? await mod.POST(request) : new Response("Method Not Allowed", { status: 405 });
      res.statusCode = response.status;
      response.headers.forEach((v, k) => res.setHeader(k, v));
      if (!response.body) return res.end();
      const reader = response.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Make server-only secrets from .env (e.g. ANTHROPIC_API_KEY) visible to api/chat.ts in dev.
  const env = loadEnv(mode, process.cwd(), "");
  if (env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), devApi()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});
