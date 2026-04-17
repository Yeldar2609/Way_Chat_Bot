# Wayland Website Chatbot

React + Vite chatbot UI for Wayland Academy.

## AI integration (OpenRouter)

1. Copy environment template:
   - `cp .env.example .env`
2. Put your OpenRouter API key in `.env`:
   - `VITE_OPENROUTER_API_KEY=...`
3. Start app:
   - `npm install`
   - `npm run dev`

## Current behavior

- Uses OpenRouter chat completions with streaming output.
- Applies a strict system prompt with guardrails:
  - no private student data
  - no medical/mental-health diagnosis
  - no official outcome promises
  - no invented policy
  - health questions routed to Schoen Health Center
- Injects Wayland knowledge-base context into the system prompt.
- Keeps a recent context window of the latest 10 chat messages.

## Notes

For production deployments, route LLM calls through a backend so API keys are not exposed to end users.
