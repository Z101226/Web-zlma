import os
import http.server
import socketserver

# 确保当前目录是脚本所在目录
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

print("=" * 60)
print(f"当前工作目录: {os.getcwd()}")
print(f"启动HTTP服务器在端口 {PORT}...")
print(f"访问地址: http://localhost:{PORT}")
print("=" * 60)

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器正在关闭...")
        httpd.shutdown()
