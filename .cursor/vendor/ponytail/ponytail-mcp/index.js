#!/usr/bin/env node
// Ponytail MCP server: serves the lazy-senior-dev ruleset over stdio.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { MODES, buildInstructions, resolveMode } from "./instructions.js";

const server = new McpServer({ name: "ponytail", version: "0.1.0" });

const modeArg = z
  .enum(MODES)
  .optional()
  .describe("Ponytail intensity: lite, full, or ultra. Omit for the configured default.");

server.registerPrompt(
  "ponytail",
  {
    title: "Ponytail mode",
    description: "Lazy senior dev instructions: YAGNI, stdlib first, the smallest correct change.",
    argsSchema: { mode: modeArg },
  },
  ({ mode }) => ({
    messages: [{ role: "user", content: { type: "text", text: buildInstructions(mode) } }],
  }),
);

server.registerTool(
  "ponytail_instructions",
  {
    title: "Ponytail instructions",
    description: "Return the Ponytail ruleset for the given intensity (lite, full, or ultra).",
    inputSchema: { mode: modeArg },
    outputSchema: { mode: z.string(), instructions: z.string() },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  ({ mode }) => {
    const resolvedMode = resolveMode(mode);
    const instructions = buildInstructions(resolvedMode);
    const structuredContent = { mode: resolvedMode, instructions };
    return { content: [{ type: "text", text: instructions }], structuredContent };
  },
);

await server.connect(new StdioServerTransport());
