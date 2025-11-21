
import MarkdownViewer from './components/MarkdownViewer';

const demoMarkdown = `
# 欢迎使用 Star Node 笔记平台

这是一个使用 **React** + **Tailwind CSS** + **Markdown** 构建的示例。

## 代码高亮演示

下面是一段 JavaScript 代码：

\`\`\`javascript
function greeting(name) {
  console.log(\`Hello, \${name}!\`);
  return {
    message: 'Welcome to Star Node',
    timestamp: Date.now()
  };
}

// 调用函数
greeting('Developer');
\`\`\`

## 列表与引用

- 支持无序列表
- 支持有序列表
  1. 第一点
  2. 第二点

> "Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。"

## 表格支持

| 功能 | 状态 | 备注 |
| --- | --- | --- |
| Markdown 渲染 | ✅ | react-markdown |
| 代码高亮 | ✅ | react-syntax-highlighter |
| 自动排版 | ✅ | @tailwindcss/typography |
`;

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Star Node</h1>
          <p className="text-gray-600">专为分享与阅读打造的笔记平台</p>
        </header>
        
        <main>
          <MarkdownViewer content={demoMarkdown} />
        </main>
      </div>
    </div>
  )
}

export default App
