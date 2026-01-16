#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ErrorCode, McpError, } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
// 创建 Server 实例
const server = new Server({
    name: "okx-skill",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// 定义 API Base URL
const OKX_API_URL = "https://www.okx.com/api/v5/market/ticker";
// 1. 列出可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_ticker",
                description: "获取 OKX 交易所的实时行情数据 (Fetch real-time ticker data from OKX)",
                inputSchema: {
                    type: "object",
                    properties: {
                        instId: {
                            type: "string",
                            description: "产品ID (Instrument ID), 例如: 'BTC-USDT', 'ETH-USDT-SWAP'",
                        },
                    },
                    required: ["instId"],
                },
            },
        ],
    };
});
// 2. 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== "get_ticker") {
        throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
    }
    const instId = String(request.params.arguments?.instId || "").toUpperCase();
    if (!instId) {
        throw new McpError(ErrorCode.InvalidParams, "instId is required");
    }
    try {
        // 调用 OKX API
        const response = await axios.get(OKX_API_URL, {
            params: { instId },
            timeout: 5000 // 5秒超时
        });
        const data = response.data;
        if (data.code !== "0") {
            return {
                content: [
                    {
                        type: "text",
                        text: `OKX API Error: ${data.msg || "Unknown error"}`,
                    },
                ],
                isError: true,
            };
        }
        if (!data.data || data.data.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: `No data found for instrument: ${instId}`,
                    },
                ],
            };
        }
        const ticker = data.data[0];
        // 格式化输出供 Claude 阅读
        const resultText = `
OKX Ticker Data for ${instId}:
-----------------------------
Last Price: ${ticker.last}
Best Bid:   ${ticker.bidPx}
Best Ask:   ${ticker.askPx}
High 24h:   ${ticker.high24h}
Low 24h:    ${ticker.low24h}
Vol 24h:    ${ticker.vol24h}
Time:       ${new Date(parseInt(ticker.ts)).toLocaleString()}
    `.trim();
        return {
            content: [
                {
                    type: "text",
                    text: resultText,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to fetch data: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// 3. 启动服务
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("OKX Skill (MCP Server) running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
