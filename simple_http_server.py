# 最简单的HTTP服务器
import http.server
import socketserver

PORT = 8000

print(f"启动HTTP服务器在端口 {PORT}...")
print(f"访问地址: http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    httpd.serve_forever()
