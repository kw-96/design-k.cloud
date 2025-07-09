# Design-K Hub

一个基于 Vite + React + TypeScript 的可视化前端项目，支持六边形渐变高亮、项目卡片、磨砂玻璃居中内容区等现代交互与样式。

## 主要特性
- Canvas 六边形网格渐变高亮与鼠标交互
- 首页内容居中、磨砂玻璃与渐隐遮罩
- 支持外部项目（RuleXcel、PyBegin）路径自动跳转与嵌入
- 响应式设计，适配多端

## 快速开始
```bash
npm install
npm run dev
```

## 构建生产环境
```bash
npm run build
```

## 部署
将 `docs/` 目录内容上传至 GitHub Pages 或静态服务器即可。

## 如何为 /DesignDocs 板块添加实际内容

当前 /DesignDocs 路径会显示“内容建设中”友好提示。若日后需要接入实际跳转内容，请按以下步骤操作：

1. 打开 `src/App.tsx` 文件。
2. 找到如下判断代码：
   ```js
   if (path === '/designdocs') {
     return (
       // ...友好提示内容...
     );
   }
   ```
3. 将上述判断和提示内容删除或注释掉。
4. 替换为实际内容组件或跳转逻辑，例如：
   - 直接渲染新组件：`<DesignDocs />`
   - 或用 iframe 嵌入外部项目。
5. 保存并重新构建、部署项目。

这样即可让 /DesignDocs 路径显示实际内容，移除原有友好提示。

---
