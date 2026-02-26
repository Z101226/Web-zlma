/**
 * 新闻动态页面脚本
 * 功能：实现新闻列表的分页显示、导航栏移动端菜单切换
 */

/**
 * 新闻数据数组
 * 包含新闻标题、日期、分类、内容和图片路径
 */
const newsData = [
    {
        title: "应用前景",
        date: "2026-02-24",
        category: "最新新闻动态",
        content: "随着工业4.0的推进，领域的应用越来越广泛。发展趋势和未来应用前景。",
        image: "img/news1.png"
    },
    {
        title: "分享",
        date: "2026-02-23",
        category: "最新新闻动态",
        content: "，本文将分享一些实用的编程技巧，帮助工程师提高编程效率。",
        image: "img/news1.png"
    },
    {
        title: "工业控制系统安全防护措施",
        date: "2026-02-22",
        category: "最新新闻动态",
        content: "工业控制系统的安全问题日益突出，本文将介绍几种常见的安全防护措施，帮助企业构建安全可靠的工业控制系统。",
        image: "img/news1.png"
    },
    {
        title: "PLC与HMI通信配置指南",
        date: "2026-02-21",
        category: "最新新闻动态",
        content: "PLC与HMI的通信是工业自动化系统中的重要环节，本文将详细介绍不同品牌PLC与HMI的通信配置方法。",
        image: "img/news1.png"
    },
    {
        title: "变频器在PLC控制系统中的应用",
        date: "2026-02-20",
        category: "最新新闻动态",
        content: "变频器作为一种重要的电力电子设备，在PLC控制系统中有着广泛的应用。本文将介绍变频器的工作原理和应用案例。",
        image: "img/news1.png"
    },
    {
        title: "PLC控制系统故障诊断与排除",
        date: "2026-02-19",
        category: "最新新闻动态",
        content: "PLC控制系统在运行过程中可能会出现各种故障，本文将介绍常见故障的诊断方法和排除技巧。",
        image: "img/news1.png"
    },
    {
        title: "ModbusRTU通信协议在工业网络中的应用", 
        date: "2026-02-18",
        category: "最新新闻动态",
        content: "Modbus 是工业领域中最常用的通信协议之一，本文将介绍Modbus 协议的基本原理和在工业网络中的应用。",
        image: "img/news1.png"
    },
    {
        title: "PLC梯形图编程规范与最佳实践",
        date: "2026-02-17",
        category: "最新新闻动态",
        content: "梯形图是PLC编程中最常用的编程语言，本文将介绍梯形图编程的规范和最佳实践，帮助工程师编写高质量的程序。",
        image: "img/news1.png"
    },
    {
        title: "工业物联网与PLC的融合发展",
        date: "2026-02-16",
        category: "最新新闻动态",
        content: "工业物联网的发展为PLC技术带来了新的机遇和挑战，本文将探讨工业物联网与PLC的融合发展趋势。",
        image: "img/news1.png"
    },
    {
        title: "PLC控制系统的节能优化方案",
        date: "2026-02-15",
        category: "最新新闻动态",
        content: "节能是工业生产中的重要课题，本文将介绍几种PLC控制系统的节能优化方案，帮助企业降低能耗。",
        image: "img/news1.png"
    }
];

/**
 * 分页配置
 * pageSize: 每页显示的新闻数量
 * currentPage: 当前页码
 */
const pageSize = 2;
let currentPage = 1;

/**
 * 页面加载完成后执行的初始化函数
 * 功能：
 * 1. 渲染初始新闻列表
 * 2. 绑定分页按钮点击事件
 * 3. 绑定导航栏菜单切换事件
 */
window.onload = function() {
    // 渲染新闻列表
    renderNews();
    
    // 绑定上一页按钮点击事件
    document.getElementById('prev-btn').onclick = function() {
        // 检查是否可以翻到上一页
        if (currentPage > 1) {
            currentPage--; // 页码减1
            renderNews(); // 重新渲染新闻列表
        }
    };
    
    // 绑定下一页按钮点击事件
    document.getElementById('next-btn').onclick = function() {
        // 检查是否可以翻到下一页
        if (currentPage < Math.ceil(newsData.length / pageSize)) {
            currentPage++; // 页码加1
            renderNews(); // 重新渲染新闻列表
        }
    };
    
    // 导航栏移动端菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.onclick = function() {
            navLinks.classList.toggle('active'); // 切换导航栏链接的显示/隐藏
        };
    }
};

/**
 * 渲染新闻列表函数
 * 功能：
 * 1. 获取新闻容器和页码信息元素
 * 2. 清空容器内容
 * 3. 计算总页数
 * 4. 更新页码信息
 * 5. 计算当前页的新闻索引范围
 * 6. 获取当前页的新闻数据
 * 7. 遍历渲染每条新闻
 */
function renderNews() {
    // 获取新闻容器和页码信息元素
    const newsContainer = document.getElementById('news-container');
    const pageInfo = document.getElementById('page-info');
    
    // 检查元素是否存在，不存在则返回
    if (!newsContainer || !pageInfo) return;
    
    // 清空容器内容
    newsContainer.innerHTML = '';
    
    // 计算总页数
    const totalPages = Math.ceil(newsData.length / pageSize);
    
    // 更新页码信息
    pageInfo.textContent = '第 ' + currentPage + ' / ' + totalPages + ' 页';
    
    // 计算当前页的新闻索引范围
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // 获取当前页的新闻数据
    const currentNews = newsData.slice(startIndex, endIndex);
    
    // 遍历渲染每条新闻
    currentNews.forEach(function(news) {
        // 创建新闻项元素
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        // 构建新闻HTML结构
        let newsHTML = '';
        // 添加新闻图片（如果有）
        if (news.image) {
            newsHTML += '<div class="news-image"><img src="' + news.image + '" alt="' + news.title + '"></div>';
        }
        // 添加新闻内容
        newsHTML += '<div class="news-content">';
        newsHTML += '<div class="news-meta">';
        newsHTML += '<span class="news-date">' + news.date + '</span>';
        // 添加新闻分类（如果有）
        if (news.category) {
            newsHTML += '<span class="news-category">' + news.category + '</span>';
        }
        newsHTML += '</div>';
        newsHTML += '<h3>' + news.title + '</h3>';
        newsHTML += '<p>' + news.content + '</p>';
        newsHTML += '<a href="#" class="news-read-more">阅读更多</a>';
        newsHTML += '</div>';
        
        // 设置新闻项HTML内容
        newsItem.innerHTML = newsHTML;
        // 将新闻项添加到容器中
        newsContainer.appendChild(newsItem);
    });
}
