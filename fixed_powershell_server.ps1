# 创建一个简单的PowerShell HTTP服务器
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()

Write-Host "PowerShell HTTP服务器已启动"
Write-Host "访问地址: http://localhost:8000"
Write-Host "按 Ctrl+C 退出..."

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    Write-Host "收到请求: $($request.Url.LocalPath)"
    
    # 处理根路径请求
    $path = $request.Url.LocalPath
    if ($path -eq '/') {
        $path = '/test_index.html'
    }
    
    # 构建文件路径
    $filePath = Join-Path -Path $PSScriptRoot -ChildPath $path.TrimStart('/')
    
    Write-Host "尝试读取文件: $filePath"
    
    # 检查文件是否存在
    if (Test-Path -Path $filePath -PathType Leaf) {
        try {
            # 读取文件内容
            $content = Get-Content -Path $filePath -Raw
            
            # 设置响应内容
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            
            Write-Host "✅ 成功返回文件: $($path.TrimStart('/'))"
        } catch {
            # 处理错误
            $response.StatusCode = 500
            $errorMessage = "服务器错误: $($_.Exception.Message)"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMessage)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            
            Write-Host "❌ 服务器错误: $($_.Exception.Message)"
        } finally {
            # 关闭响应
            $response.OutputStream.Close()
            $response.Close()
        }
    } else {
        # 文件不存在
        $response.StatusCode = 404
        $errorMessage = "文件不存在: $path"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMessage)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        
        Write-Host "❌ 404 - 文件不存在: $filePath"
        
        # 关闭响应
        $response.OutputStream.Close()
        $response.Close()
    }
}

# 停止服务器
$listener.Stop()
$listener.Close()
Write-Host "服务器已停止"
