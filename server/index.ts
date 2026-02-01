import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

import { ADMIN_PASSWORD, JWT_SECRET } from "./_core/env";
import { getAdminCookieName, signAdminToken } from "./_core/localAdmin";

app.post("/api/admin/login", (req, res) => {
  const password = (req.body?.password ?? "").toString();
  if (!ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ ok: false, error: "Missing ADMIN_PASSWORD or JWT_SECRET" });
  }
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Invalid password" });
  }
  const token = signAdminToken(JWT_SECRET);
  res.cookie(getAdminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });
  return res.json({ ok: true });
});

app.use(express.json());
app.use(cookieParser());
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
