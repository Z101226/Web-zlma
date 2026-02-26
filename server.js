/**
 * 简单的HTTP静态文件服务器
 * 功能：
 * 1. 提供静态文件服务（HTML、CSS、JS、图片等）
 * 2. 处理文件不存在的404错误
 * 3. 处理服务器内部错误
 */

// 导入所需模块
const http = require('http'); // HTTP服务器模块
const fs = require('fs'); // 文件系统模块
const path = require('path'); // 路径处理模块

/**
 * 创建HTTP服务器
 * @param {Object} req - HTTP请求对象
 * @param {Object} res - HTTP响应对象
 */
const server = http.createServer((req, res) => {
    // 解析请求路径
    let filePath = '.' + req.url;
    // 如果请求根路径，默认返回index.html
    if (filePath === './') {
        filePath = './index.html';
    }

    // 获取文件扩展名
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // 定义MIME类型映射表
    // 用于根据文件扩展名设置正确的Content-Type响应头
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // 根据文件扩展名获取对应的MIME类型
    // 如果没有找到对应的MIME类型，默认使用application/octet-stream
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // 读取请求的文件
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                // 文件不存在错误（ENOENT）
                // 尝试读取404.html文件并返回
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // 其他服务器错误
                res.writeHead(500); // 设置500内部服务器错误状态码
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                res.end(); 
            }
        } else {
            // 文件读取成功
            res.writeHead(200, { 'Content-Type': contentType }); // 设置200成功状态码和正确的Content-Type
            res.end(content, 'utf-8'); // 发送文件内容作为响应
        }
    });
});

// 设置服务器端口
// 优先使用环境变量中的PORT，否则默认使用8080
const PORT = process.env.PORT || 8080;

// 启动服务器并监听指定端口
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`); // 输出服务器运行信息
});