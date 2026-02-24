import http.server
import socketserver
import threading
import time

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def start_server():
    Handler = MyHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n" + "=" * 60)
        print(f"HTTP服务器正在运行...")
        print(f"访问地址: http://localhost:{PORT}")
        print(f"=" * 60)
        httpd.serve_forever()

if __name__ == "__main__":
    # 启动服务器在后台线程
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # 保持主线程运行
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n服务器正在关闭...")
