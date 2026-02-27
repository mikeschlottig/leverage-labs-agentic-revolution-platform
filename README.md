# Cloudflare AI Agent Chatbot

A production-ready AI agent chatbot built with Cloudflare Workers, Agents SDK, and Model Context Protocol (MCP) integration. Features intelligent tool calling, multi-model support (Gemini, Claude, GPT), real-time streaming, and persistent conversation management using Durable Objects.

[cloudflarebutton]

## ✨ Features

- **AI Agent Architecture**: Stateful agents powered by Cloudflare Agents SDK with Durable Objects for session persistence
- **Real MCP Integration**: Connects to production MCP servers for Cloudflare tools (D1, R2, Workers KV, Browser)
- **Multi-Model Support**: Gemini 2.5 Flash/Pro, Claude Opus, GPT-4o via Cloudflare AI Gateway
- **Intelligent Tool Usage**: Automatic tool detection and execution (weather, web search, MCP tools)
- **Session Management**: Control plane Durable Object for managing multiple chat sessions
- **Real-Time Streaming**: Server-sent events for smooth chat experience
- **Modern UI**: React + Tailwind CSS + shadcn/ui with Framer Motion animations
- **TypeScript**: Full type safety throughout frontend and backend
- **Production Ready**: Error handling, loading states, responsive design

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS 3.4, shadcn/ui, Framer Motion, Lucide Icons
- **Backend**: Cloudflare Workers, Cloudflare Agents SDK, Hono, OpenAI SDK
- **AI**: Cloudflare AI Gateway, MCP SDK, Multi-model support
- **State**: Durable Objects (ChatAgent, AppController)
- **UI Components**: Radix UI, Headless UI, TanStack Query, React Hook Form
- **Dev Tools**: Bun, ESLint, TypeScript 5.8, Wrangler 4.x

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- Cloudflare Account
- Cloudflare AI Gateway configured with API key
- Wrangler CLI (`bun install -g wrangler`)

### Installation

```bash
# Clone and enter the project
git clone <your-repo> ai-agent-chatbot
cd ai-agent-chatbot

# Install dependencies
bun install

# Set environment variables in wrangler.jsonc
# Update CF_AI_BASE_URL and CF_AI_API_KEY

# Run in development
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
# Build assets
bun build

# Deploy to Cloudflare
bun run deploy

# Type generation (if needed)
bun cf-typegen
```

[cloudflarebutton]

## 📖 Usage

### Chat API

The chat system uses Durable Objects for stateful conversations:

```
POST /api/chat/:sessionId/chat
{
  "message": "What's the weather in San Francisco?",
  "model": "google-ai-studio/gemini-2.5-flash",
  "stream": true
}
```

**Endpoints**:
- `GET /api/chat/:sessionId/messages` - Get conversation
- `POST /api/chat/:sessionId/chat` - Send message
- `DELETE /api/chat/:sessionId/clear` - Clear session
- `POST /api/chat/:sessionId/model` - Update model

### Session Management

```
POST /api/sessions - Create new session
GET /api/sessions - List sessions
DELETE /api/sessions/:id - Delete session
PUT /api/sessions/:id/title - Update title
```

### Extending Agents

1. **Add Custom Tools** in `worker/tools.ts`
2. **Register MCP Servers** in `worker/mcp-client.ts`
3. **Extend ChatAgent** in `worker/agent.ts`
4. **Add Routes** in `worker/userRoutes.ts`

### Frontend Customization

- Replace `src/pages/HomePage.tsx` with your UI
- Use `src/lib/chat.ts` for API calls
- All shadcn/ui components available in `src/components/ui/`

## 🧪 Development

```bash
# Development server (HMR)
bun dev

# Build for production
bun build

# Lint
bun lint

# Type generation
bun cf-typegen
```

**Hot Reload**: Full HMR support with Vite. Backend routes auto-reload.

**Environment Variables**:
```jsonc
// wrangler.jsonc
{
  "vars": {
    "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai",
    "CF_AI_API_KEY": "your-cloudflare-api-key"
  }
}
```

## 🚀 Production Deployment

1. **Configure Wrangler**: Update `wrangler.jsonc` with your bindings
2. **Set Secrets**: `wrangler secret put CF_AI_API_KEY`
3. **Deploy**: `bun run deploy`

**Durable Objects**: Automatically provisioned (`CHAT_AGENT`, `APP_CONTROLLER`)

**Observability**: Enabled in `wrangler.jsonc`

## 🤝 Contributing

1. Fork the repository
2. `bun install`
3. Make changes in `src/` or `worker/`
4. `bun dev` for testing
5. Submit PR

## 📄 License

MIT License - see [LICENSE](LICENSE) © Leverage Labs

---

**Made with ❤️ for Cloudflare Workers**