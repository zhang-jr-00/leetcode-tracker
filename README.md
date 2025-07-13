# LeetCode 刷题进度跟踪器

一个基于 React 和 TypeScript 构建的 LeetCode 刷题进度跟踪应用，专门为跟随 [programmercarl.com](https://programmercarl.com/) 学习算法的用户设计。

## ✨ 功能特性

- 📚 **完整的章节结构**: 包含 programmercarl.com 的所有主要章节
- 🎯 **分类显示**: 教程和习题用不同颜色区分（蓝色教程，紫色习题）
- ✅ **进度跟踪**: 可以勾选完成的小节，自动计算进度
- 📊 **可视化进度**: 每个章节和总体都有进度条显示
- 🔄 **折叠/展开**: 章节可以折叠显示进度，展开查看详情
- 💾 **本地存储**: 进度自动保存到浏览器本地存储
- 📱 **响应式设计**: 支持桌面和移动设备
- 🎨 **现代UI**: 美观的渐变背景和卡片式设计

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本
```bash
npm run build
```

## 📖 使用说明

### 基本操作
1. **查看章节**: 页面显示所有章节，每个章节显示完成进度
2. **展开/折叠**: 点击章节标题可以展开或折叠查看小节详情
3. **标记完成**: 勾选小节前的复选框来标记完成状态
4. **进度保存**: 所有操作都会自动保存到本地存储

### 控制按钮
- **展开全部**: 展开所有章节显示详情
- **折叠全部**: 折叠所有章节只显示进度
- **重置进度**: 清除所有完成标记（需要确认）

### 章节结构
应用包含以下主要章节：
- 数组
- 链表
- 哈希表
- 字符串
- 栈与队列
- 二叉树
- 回溯算法
- 贪心算法
- 动态规划
- 图论

每个章节包含：
- 理论基础（蓝色标签）
- 相关习题（紫色标签）
- 章节总结（蓝色标签）

## 🛠️ 技术栈

- **React 18**: 前端框架
- **TypeScript**: 类型安全
- **CSS3**: 样式和动画
- **LocalStorage**: 数据持久化
- **Create React App**: 项目脚手架

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── Chapter.tsx     # 章节组件
│   ├── SubSection.tsx  # 小节组件
│   ├── LeetCodeTracker.tsx # 主应用组件
│   └── *.css          # 组件样式
├── data/               # 数据文件
│   └── initialData.ts  # 初始章节数据
├── types/              # TypeScript 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   └── storage.ts      # 本地存储工具
└── App.tsx            # 主应用入口
```

## 🎨 自定义

### 添加新章节
在 `src/data/initialData.ts` 中添加新的章节数据：

```typescript
{
  id: 'new-chapter-id',
  title: '新章节名称',
  expanded: false,
  subSections: [
    { id: 'new-1', title: '新小节', type: 'tutorial', completed: false },
    { id: 'new-2', title: '新习题', type: 'exercise', completed: false },
  ]
}
```

### 修改样式
- 主应用样式: `src/components/LeetCodeTracker.css`
- 章节样式: `src/components/Chapter.css`
- 小节样式: `src/components/SubSection.css`

## 🔧 开发

### 代码规范
- 使用 TypeScript 进行类型检查
- 组件使用函数式组件和 Hooks
- CSS 使用 BEM 命名规范
- 所有组件都有对应的 CSS 文件

### 数据持久化
- 使用 LocalStorage 保存进度数据
- 数据结构包含章节信息、完成状态和最后更新时间
- 自动保存，无需手动操作

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！