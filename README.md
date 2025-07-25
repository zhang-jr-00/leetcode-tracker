# LeetCode 刷题进度跟踪器

一个基于 React 和 TypeScript 构建的 LeetCode 刷题进度跟踪应用，专门为跟随 [代码随想录](https://programmercarl.com/) 学习算法的用户设计。

## ✨ 功能特性

- 📚 **完整的章节结构**: 包含代码随想录的所有主要章节
- 🎯 **分类显示**: 教程和习题用不同颜色区分（蓝色教程，紫色习题）
- ✅ **进度跟踪**: 可以勾选完成的小节，自动计算进度
- 📊 **可视化进度**: 每个章节和总体都有进度条显示
- 🔄 **折叠/展开**: 章节可以折叠显示进度，展开查看详情
- 💾 **本地存储**: 进度自动保存到浏览器本地存储
- ❤️ **收藏功能**: 可以收藏重要的小节并添加备注
- 📝 **备注系统**: 为收藏的小节添加个人笔记和提醒
- 📁 **数据管理**: 支持导入/导出数据，便于备份和迁移
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
4. **收藏小节**: 点击小节旁的❤️按钮收藏重要内容
5. **添加备注**: 点击💬按钮为小节添加个人笔记
6. **进度保存**: 所有操作都会自动保存到本地存储

### 收藏功能
- **收藏/取消收藏**: 点击❤️按钮切换收藏状态
- **添加备注**: 点击💬按钮添加个人笔记
- **查看收藏**: 页面顶部显示所有收藏的小节
- **编辑备注**: 在收藏列表中点击✏️按钮编辑备注
- **取消收藏**: 在收藏列表中点击❌按钮取消收藏

### 数据管理
- **导出数据**: 点击"📤 导出数据"按钮将当前所有数据保存为JSON文件
- **导入数据**: 点击"📥 导入数据"按钮从JSON文件恢复数据
- **数据备份**: 建议定期导出数据作为备份，防止意外丢失
- **数据迁移**: 可以在不同设备间导入导出数据

### 控制按钮
- **展开全部**: 展开所有章节显示详情
- **折叠全部**: 折叠所有章节只显示进度
- **重置进度**: 清除所有完成标记（需要确认）

### 章节结构
应用包含以下主要章节（严格按照代码随想录结构）：
- 数组
- 链表
- 哈希表
- 字符串
- 双指针法
- 栈与队列
- 二叉树
- 回溯算法
- 贪心算法
- 动态规划
- 单调栈
- 图论
- 额外题目

每个章节包含：
- 理论基础（蓝色标签）
- 相关习题（紫色标签）
- 章节总结（蓝色标签）

## 💾 数据存储

### 本地存储
- **存储位置**: 浏览器 LocalStorage
- **自动保存**: 所有操作都会自动保存
- **持久化**: 关闭浏览器后数据不会丢失
- **跨标签页同步**: 多个标签页间数据自动同步

### 数据安全
- **定期备份**: 建议定期使用导出功能备份数据
- **导入恢复**: 可以通过导入功能恢复备份的数据
- **数据格式**: 导出为JSON格式，便于查看和编辑

### 数据丢失情况
LocalStorage 数据在以下情况下可能丢失：
- 用户主动清除浏览器数据
- 隐私模式/无痕浏览
- 浏览器卸载重装
- 存储空间满了
- 网站域名变化

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
│   ├── LikedSubSections.tsx # 收藏小节组件
│   ├── DataManager.tsx # 数据管理组件
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
- 收藏组件样式: `src/components/LikedSubSections.css`
- 数据管理样式: `src/components/DataManager.css`

## 🔧 开发

### 代码规范
- 使用 TypeScript 进行类型检查
- 组件使用函数式组件和 Hooks
- CSS 使用 BEM 命名规范
- 所有组件都有对应的 CSS 文件

### 数据持久化
- 使用 LocalStorage 保存进度数据
- 数据结构包含章节信息、完成状态、收藏状态和最后更新时间
- 自动保存，无需手动操作
- 支持导入导出功能

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！