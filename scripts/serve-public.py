"""Serve the built site locally with the global Cloudflare Pages headers."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "dist"
headers = []
for line in (root / "_headers").read_text().splitlines():
    if line.startswith("  "):
        key, value = line.strip().split(":", 1)
        headers.append((key, value.strip()))


class PublicHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Match Pages' extensionless HTML routes (such as /privacy and /alex.ward).
        clean = self.path.split("?", 1)[0]
        target = root / clean.lstrip("/")
        if not target.is_file() and (root / (clean.lstrip("/") + ".html")).is_file():
            self.path = clean + ".html"
        super().do_GET()

    def end_headers(self):
        for key, value in headers:
            self.send_header(key, value)
        super().end_headers()


if __name__ == "__main__":
    print("Built site with CSP: http://localhost:8094/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8094), partial(PublicHandler, directory=str(root))).serve_forever()
