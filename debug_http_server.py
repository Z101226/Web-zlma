import os
import sys

print(f"Python版本: {sys.version}")
print(f"Python路径: {sys.executable}")

# 确保当前目录是脚本所在目录
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

print(f"当前工作目录: {os.getcwd()}")

# 检查文件是否存在
files_to_check = ['test_index.html', 'index.html', 'about.html', 'services.html', 'contact.html']
for file in files_to_check:
    if os.path.exists(file):
        print(f"✅ {file} 存在: {os.path.getsize(file)} 字节")
    else:
        print(f"❌ {file} 不存在")

# 尝试导入必要的模块
try:
    import http.server
    import socketserver
    print("✅ 成功导入http.server和socketserver模块")
except Exception as e:
    print(f"❌ 导入模块失败: {e}")
    sys.exit(1)

PORT = 8000

print(f"\n启动服务器在端口 {PORT}...")
print(f"访问地址: http://localhost:{PORT}")
print("按 Ctrl+C 退出...")

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"\n收到请求: {self.path}")
        if self.path == '/':
            self.path = '/test_index.html'
        try:
            print(f"处理请求: {self.path}")
            return super().do_GET()
        except Exception as e:
            print(f"错误: {e}")
            self.send_error(500, f"服务器错误: {e}")

try:
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"服务器已启动，监听端口 {PORT}")
        print(f"服务器地址: {httpd.server_address}")
        httpd.serve_forever()
except Exception as e:
    print(f"启动服务器失败: {e}")
    import traceback
    traceback.print_exc()
