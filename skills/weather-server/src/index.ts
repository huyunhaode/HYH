#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Create server instance
const server = new Server(
  {
    name: "weather-skill",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
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
server.setRequestHandler(CallToolRequestSchema, async (request) => {
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
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather Skill (MCP Server) running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
