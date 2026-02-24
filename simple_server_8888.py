import http.server
import socketserver

PORT = 8888

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/test_index.html'
        return super().do_GET()

print(f"启动服务器在端口 {PORT}...")
print(f"访问地址: http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    httpd.serve_forever()
