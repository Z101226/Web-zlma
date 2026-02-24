import os
import http.server
import socketserver

# 确保当前目录是脚本所在目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 7777

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"收到请求: {self.path}")
        if self.path == '/':
            self.path = '/test_index.html'
        try:
            return super().do_GET()
        except Exception as e:
            print(f"错误: {e}")
            self.send_error(500, f"服务器错误: {e}")

print(f"当前工作目录: {os.getcwd()}")
print(f"启动服务器在端口 {PORT}...")
print(f"访问地址: http://localhost:{PORT}")

# 检查文件是否存在
if os.path.exists('test_index.html'):
    print(f"test_index.html 存在: {os.path.getsize('test_index.html')} 字节")
else:
    print("错误: test_index.html 不存在")

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("服务器已启动，等待请求...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器正在关闭...")
        httpd.shutdown()
