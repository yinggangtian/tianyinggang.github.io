---
title: "CLI Coding Agents Without the Lock-in: Harnesses, BYOK and the Model-Agnostic Stack"
date: "2026-09-15"
tags: ["AI", "Coding Agents", "CLI", "MCP", "Agent Harness", "BYOK", "Codex CLI", "Claude Code"]
excerpt: "Notes from a few weeks of comparing OpenCode, Codex CLI, Goose, Claude Code, Aider and Gemini CLI: how to keep your agent workflow independent of any single model vendor while still letting it edit files and run commands for real."
---

# CLI Coding Agents Without the Lock-in

Since late September I have been going down a rabbit hole: **terminal-based coding agents**. The question that kept pulling me back was simple:

> How do I avoid being tied to one model or one vendor, while still having an agent that genuinely *does* the work — reads my repo, edits files, runs tests — instead of just chatting about it?

This post collects what I compared, what I tried, and the mental model that finally made the landscape make sense. A caveat up front: this space moves weekly. Treat specific flags and config keys below as a snapshot and check each tool's docs before copying anything.

## 1. Model vs. harness: the distinction that matters

Most confusion disappears once you separate two things:

- **The model** — the LLM that reasons and decides what to do next.
- **The harness** — everything around it: the agent loop, the system prompt, the tool definitions, file editing logic, permission prompts, context management, sandboxing, and session state.

A CLI coding agent is really a *harness* that happens to call a model. Two harnesses driving the same model can feel completely different, and one harness can often drive many models. That is the lever for avoiding lock-in: **choose the harness and the model independently**.

A minimal harness loop looks like this:

```text
while not done:
    response = model(messages, tools)
    if response has tool_calls:
        for call in tool_calls:
            check permission / sandbox policy
            result = run(call)          # read_file, edit_file, bash, MCP tool...
            messages.append(result)
    else:
        done = True
```

Everything interesting — edit formats, diff application, context compaction, approval modes — lives inside that loop.

## 2. The tools I compared

| Tool | Origin | Model flexibility | What stood out |
|---|---|---|---|
| **Claude Code** | Anthropic | Primarily Claude models; can be pointed at compatible gateways via environment variables | Very polished harness: Skills, hooks, subagents, MCP, plan mode, permission system |
| **Codex CLI** | OpenAI | Defaults to OpenAI; configurable custom providers via `config.toml` | Sandboxed command execution, approval modes, open source |
| **Gemini CLI** | Google | Built around Gemini | Generous free tier at launch, MCP support, open source |
| **OpenCode** | Community (SST) | Provider-agnostic by design | TUI-first, many providers, client/server architecture |
| **Goose** | Block | Provider-agnostic | MCP-native extensions model, recipes, runs locally |
| **Aider** | Community | Very broad (via LiteLLM) | Git-centric workflow, auto-commits, mature edit formats, repo map |

My rough taxonomy:

- **Vendor-first harnesses** (Claude Code, Codex CLI, Gemini CLI): tuned to one family of models, usually the best experience *with* that family.
- **Model-agnostic harnesses** (OpenCode, Goose, Aider): treat the provider as a plug-in. You trade a little polish for freedom.

Neither category is "better". The vendor-first tools often get new model features (extended thinking, native tool formats, caching hints) first. The agnostic ones let you switch when pricing, quality or availability changes.

## 3. How "bring your own key" actually works

Escaping lock-in comes down to a few connection concepts. Once you recognise them, every tool's config looks familiar.

### API key (BYOK)
You supply your own key instead of a bundled subscription. You pay per token, pick any model the provider offers, and your usage isn't tied to one product's plan limits.

### Base URL
Almost every tool lets you override the endpoint the client talks to. That single setting is what enables gateways, proxies, self-hosted models and regional endpoints.

### OpenAI-compatible APIs
Many providers and local servers (Ollama, vLLM, LM Studio, OpenRouter, various cloud gateways) expose an endpoint that mimics the OpenAI API shape. If a harness can speak "OpenAI-compatible", it can often reach a huge range of models by changing just the base URL and model name.

A generic sketch (names differ per tool — check the docs):

```toml
# Illustrative only: a custom provider entry in a CLI agent's config
[model_providers.my_gateway]
name     = "My Gateway"
base_url = "https://gateway.example.com/v1"
env_key  = "MY_GATEWAY_API_KEY"   # read the key from an env var, never hard-code it
```

### Gateways and routers
A gateway (OpenRouter, LiteLLM proxy, or a self-hosted equivalent) sits between the harness and many providers. The harness thinks it is talking to one endpoint; the gateway handles routing, fallbacks and key management. This is the most practical anti-lock-in architecture I found:

```text
harness (any CLI)  ->  gateway (one base URL, one key)  ->  Claude / GPT / Gemini / local model
```

### Compatibility is not equivalence
Here is the catch I hit repeatedly: "OpenAI-compatible" usually means the *chat/completions* shape works, but agents lean on harder features — **tool/function calling, streaming of tool-call deltas, parallel tool calls, structured outputs, newer "responses"-style APIs**. A model or gateway that chats fine can still fail or behave oddly in an agent loop because its tool-calling is partial or formatted differently. When an agent "works but keeps doing silly things", suspect tool-call fidelity before blaming the model's intelligence.

## 4. What makes an agent actually *do* things

Having a model on the other end is the easy part. These are the pieces that turn it into something that can finish a task:

### Tool calling
The model emits a structured request ("run `pytest -x`", "edit this file") and the harness executes it and feeds back the result. Quality here depends on tool schemas, how errors are returned, and how well the model was trained on that style.

### File editing
Surprisingly hard. Approaches include whole-file rewrites, search/replace blocks, unified diffs, and line-range edits. The harness has to survive the model getting a few characters wrong. Aider's long experience here shows: the edit format matters as much as the model.

### MCP (Model Context Protocol)
An open protocol for plugging tools and data sources into agents. For anti-lock-in, MCP is the most important idea in this post: **write a tool once, use it from any MCP-capable harness**. Claude Code, Codex CLI, Gemini CLI, Goose and OpenCode can all act as MCP clients, so your database tool, ticket tracker or internal docs connector isn't rewritten per vendor.

### Skills and instruction files
Reusable bundles of instructions and scripts the agent loads when relevant, plus project-level files (`CLAUDE.md`, `AGENTS.md` and similar) describing conventions, commands and gotchas. These are plain text, so they are portable in spirit even when formats differ. Keeping project knowledge in version-controlled markdown, not inside one vendor's UI, is cheap insurance.

### Sandboxing and permissions
An agent that can run shell commands can also delete your files. Good harnesses offer approval modes (ask every time / auto-approve safe commands / full auto) and sandboxing (restricted filesystem and network access). My rule of thumb: the more autonomy you grant, the stricter the sandbox should be. Run unfamiliar agents in a container or throwaway checkout first.

### Multi-agent patterns
Subagents split work: one explores the codebase, another writes tests, another reviews. The benefits are mostly **context isolation** (each subagent has a clean, focused context window) and parallelism. The costs are tokens and coordination overhead. I found it worthwhile for broad codebase exploration and independent review, and overkill for small edits.

## 5. Hands-on: installing Codex CLI and debugging startup

I wanted to try a vendor harness driven through a custom API setup, so I installed Codex CLI and ran into two classes of problems that are worth documenting because they cost me time.

### Problem 1: API key vs. login confusion
Many CLI agents support multiple auth routes (a signed-in account versus a raw API key). If both exist, or the environment variable name the tool expects differs from the one you set, you get confusing "unauthorized" or "wrong account" errors. Checklist:

1. Confirm *which* auth mode the tool is using (account login vs. API key).
2. Confirm the exact environment variable name the config's `env_key` points to, and that it is exported in the shell that launches the tool — not just in another terminal.
3. If using a custom provider, confirm the `base_url` includes the right path prefix (commonly `/v1`) and no trailing-slash surprises.
4. Test the key outside the agent with a plain `curl` request to the same base URL, so you know whether the problem is the key/endpoint or the harness.

### Problem 2: startup timeouts
On launch I hit a timeout during startup that looked like a workspace/routing step failing before the agent even reached the model. General lessons from debugging this kind of failure:

- **Separate "can't reach the service" from "service rejected me".** A hang means network/proxy/DNS; a fast error means auth/config.
- **Check proxies and corporate/university networks.** CLI tools often ignore your browser's proxy settings; set `HTTPS_PROXY`/`NO_PROXY` explicitly and see whether behaviour changes.
- **Try a different network** (e.g. phone hotspot) to rule out network filtering quickly.
- **Turn on verbose/debug logging** if the tool has it; the failing step is usually named in the log.
- **Bypass optional startup features.** If a cloud-side step (workspace sync, telemetry, update check) is blocking, see whether a config flag or offline mode lets the core agent start.

I am deliberately not claiming a single magic fix — the cause depends on network, account state and tool version, and these tools change fast. The reliable approach is the bisecting one above: isolate network, then auth, then config, then harness.

## 6. A practical anti-lock-in setup

After all this, here is the stack I would actually recommend:

1. **Keep your knowledge portable.** Project conventions in `AGENTS.md`/`CLAUDE.md`-style markdown, committed to the repo. Symlink or duplicate between formats if you use several tools.
2. **Put integrations behind MCP.** Build or adopt MCP servers for the things your agent needs, so any harness can use them.
3. **Use a gateway for model access.** One base URL and key, many models behind it. Switching models becomes a config change.
4. **Pick the harness per task.**
   - Want the most polished experience with a given model family? Use that vendor's CLI.
   - Want to swap models freely, or run local models? Use OpenCode, Goose or Aider.
5. **Sandbox by default.** Containers or disposable worktrees, and approval prompts until you trust a setup.
6. **Keep git as the safety net.** Commit before long agent runs. Aider's auto-commit habit is a good one to copy everywhere.
7. **Evaluate on your own tasks.** Benchmarks tell you little about your repo. Keep three or four representative tasks and re-run them when you change model or harness.

## 7. Where lock-in still sneaks back in

Being model-agnostic is a spectrum, not a switch. Things that quietly re-tether you:

- **Prompts tuned to one model's quirks.** Instructions that work for one family may underperform on another.
- **Provider-specific features.** Prompt caching, extended thinking and native tool formats don't always survive a gateway intact.
- **Harness-specific skills/hooks.** Powerful, but they only work in that harness. Prefer MCP and plain markdown where you can.
- **Subscriptions bundled with a CLI.** Convenient, but they bind you to that vendor's model list and limits.

The goal isn't zero coupling — it's *cheap exit*. If switching models or tools takes an afternoon instead of a rewrite, you're in good shape.

## Takeaways

- Think in **model + harness**, and choose them independently.
- **Base URL + API key + OpenAI-compatible endpoints** are the practical mechanism for BYOK, but compatibility for chat does not guarantee compatibility for tool calling.
- **MCP** is the best portability investment: tools written once, used by any harness.
- A **gateway** plus a **model-agnostic harness** gives maximum freedom; a **vendor-first harness** gives maximum polish. Many people sensibly use both.
- Agents that really edit files and run commands need **sandboxing and git discipline** — autonomy and safety have to scale together.

I'll keep updating my notes as the tools evolve. If you have a setup that works well with custom endpoints, I'd like to hear about it.
