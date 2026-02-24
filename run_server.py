import sys
import os

print("=" * 60)
print("Python环境检查")
print("=" * 60)
print(f"Python版本: {sys.version}")
print(f"Python路径: {sys.executable}")
print(f"当前目录: {os.getcwd()}")
print("=" * 60)

try:
    import flask
    print(f"Flask版本: {flask.__version__}")
    print("Flask导入成功!")
except ImportError as e:
    print(f"Flask导入失败: {e}")
    sys.exit(1)

print("=" * 60)
print("正在启动Flask服务器...")
print("访问地址: http://localhost:8000")
print("=" * 60)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000, use_reloader=False)
