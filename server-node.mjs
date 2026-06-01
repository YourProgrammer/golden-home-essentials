import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 10000;

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

createServer((req, res) => {
  let filePath = join(__dirname, "dist/client", req.url === "/" ? "index.html" : req.url);
  
  if (!existsSync(filePath)) {
    filePath = join(__dirname, "dist/client/index.html");
  }

  const ext = extname(filePath);
  const mime = mimeTypes[ext] || "text/plain";
  
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mime });
    res.end(content);
  } catch {
    const index = readFileSync(join(__dirname, "dist/client/index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  }
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));