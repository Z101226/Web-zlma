import os

print("=" * 60)
print("文件存在性检查")
print("=" * 60)

files_to_check = [
    "index.html",
    "about.html",
    "services.html",
    "contact.html"
]

for file in files_to_check:
    if os.path.exists(file):
        size = os.path.getsize(file)
        print(f"✅ {file} - 存在 (大小: {size} 字节)")
    else:
        print(f"❌ {file} - 不存在")

print("=" * 60)
print(f"当前工作目录: {os.getcwd()}")
print("=" * 60)
