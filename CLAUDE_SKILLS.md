# 关于最近热门的 Claude Skills

“Claude Skills” 最近通常指的是 **Model Context Protocol (MCP)** 生态系统中的工具和能力。

## 什么是 Model Context Protocol (MCP)?

MCP 是 Anthropic 推出的一个开放标准，旨在让 AI 模型（如 Claude）能够安全、标准化地连接到外部数据和工具。通过 MCP，开发者可以构建 "MCP Servers"，这些服务器实际上就是 Claude 的“技能包” (Skills)。

当你在 Claude Desktop 或其他支持 MCP 的客户端中配置了这些 Servers 后，Claude 就获得了新的能力，例如：

1.  **读取本地文件**：直接访问和编辑你计算机上的项目。
2.  **查询数据库**：连接到 PostgreSQL, SQLite 等数据库进行查询。
3.  **访问 API**：例如获取天气、股票信息，或者控制智能家居。
4.  **操作 Git**：直接管理 GitHub 仓库。

## 为什么它很火？

1.  **标准化**：以前让 AI 使用工具需要通过特定的 Function Calling 格式，现在有了统一的协议。
2.  **生态系统**：社区迅速构建了大量的 MCP Servers（即 Skills），用户可以像安装插件一样轻松扩展 Claude 的能力。
3.  **本地优先**：MCP 特别适合连接本地开发环境和私有数据。

## 常见的 Claude Skills (MCP Servers) 例子

- **Filesystem**: 允许 Claude 读取和写入本地文件系统。
- **Git/GitHub**: 允许 Claude 查看 commit 历史、创建 PR、搜索代码。
- **Brave Search**: 让 Claude 拥有联网搜索的能力。
- **Postgres**: 让 Claude 直接分析数据库中的数据。

## 如何开发自己的 Claude Skill?

开发一个 Claude Skill 本质上就是编写一个 MCP Server。你可以使用 TypeScript (Node.js) 或 Python SDK 来通过标准输入/输出 (stdio) 或 SSE (Server-Sent Events) 暴露工具。

本项目包含一个简单的 MCP Server 示例，演示如何创建一个“获取天气”的技能。
