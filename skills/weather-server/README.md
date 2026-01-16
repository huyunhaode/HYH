# Weather Skill (MCP Server Demo)

这是一个简单的 MCP Server 示例，演示了如何创建一个 "Claude Skill"。

## 功能

提供了一个 `get_weather` 工具，可以查询指定城市的天气（返回模拟数据）。

## 如何使用

1. 安装依赖并构建：
   ```bash
   npm install
   npm run build
   ```

2. 配置 Claude Desktop (或其他 MCP 客户端):

   在你的 Claude Desktop 配置文件中 (`claude_desktop_config.json`) 添加：

   ```json
   {
     "mcpServers": {
       "weather-skill": {
         "command": "node",
         "args": ["/absolute/path/to/workspace/skills/weather-server/build/index.js"]
       }
     }
   }
   ```
