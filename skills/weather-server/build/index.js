#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
// Create server instance
const server = new index_js_1.Server({
    name: "weather-skill",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Define available tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_weather",
                description: "Get the current weather for a city",
                inputSchema: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "The name of the city",
                        },
                    },
                    required: ["city"],
                },
            },
        ],
    };
});
// Handle tool execution
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_weather") {
        const city = String(request.params.arguments?.city || "Unknown");
        // Mock data - in a real skill this would call a weather API
        const weatherData = {
            temperature: "22°C",
            condition: "Sunny",
            humidity: "45%"
        };
        return {
            content: [
                {
                    type: "text",
                    text: `Current weather in ${city}: ${weatherData.temperature}, ${weatherData.condition}. Humidity: ${weatherData.humidity}`,
                },
            ],
        };
    }
    throw new Error("Tool not found");
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Weather Skill (MCP Server) running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
