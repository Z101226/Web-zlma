import socket
import threading
import time

def start_server():
    import http.server
    import socketserver
    
    PORT = 9000
    Handler = http.server.SimpleHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"服务器启动在 http://localhost:{PORT}")
        print(f"当前目录: {httpd.RequestHandlerClass.server_path}")
        httpd.serve_forever()

# 在后台线程中启动服务器
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

# 等待服务器启动
time.sleep(2)

# 尝试连接到服务器
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("localhost", 9000))
    s.sendall(b"GET / HTTP/1.1\r\nHost: localhost:9000\r\n\r\n")
    response = s.recv(1024)
    s.close()
    
    print("\n服务器响应:")
    print(response.decode('utf-8')[:500] + "..." if len(response) > 500 else response.decode('utf-8'))
    print("\n✅ 服务器启动成功！")
    print("访问地址: http://localhost:9000/test_index.html")
except Exception as e:
    print(f"\n❌ 服务器启动失败: {e}")

# 保持程序运行
print("\n按 Ctrl+C 退出...")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("退出程序...")
