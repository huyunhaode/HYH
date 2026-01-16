# OKX Market Data Skill

这是一个为您定制的 Claude Skill (MCP Server)，用于从 OKX 交易所获取实时行情数据。

## 功能

- **get_ticker**: 获取指定交易对（如 `BTC-USDT`）的最新价格、买卖一价、24小时高低点等信息。

## 安装与配置

### 1. 准备环境

确保您已经安装了 Node.js。

### 2. 构建项目

如果您是下载的代码，请先运行：

```bash
cd skills/okx-server
npm install
npm run build
```

### 3. 配置 Claude Desktop

找到您的 Claude Desktop 配置文件（通常位于）：
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

在 `mcpServers` 部分添加以下配置（请将路径修改为您的实际绝对路径）：

```json
{
  "mcpServers": {
    "okx": {
      "command": "node",
      "args": ["/绝对路径/path/to/skills/okx-server/build/index.js"]
    }
  }
}
```

### 4. 使用方法

配置完成后重启 Claude Desktop，您就可以直接问它：
- "现在 BTC-USDT 的价格是多少？"
- "帮我看看 ETH-USDT-SWAP 的盘口情况"
