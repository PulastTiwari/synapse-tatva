# Tatva's Hackwave 1.0 — Solution for Problem Statement 7

# Synapse — Unified Operations Hub (UOH)

A template driven automation runner that helps small and medium businesses (SMBs) unify visibility and orchestrate workflows across existing tools without migrating data.

## Problem Statement

- Fragmented Operations: SMBs use many disconnected tools (CRM, accounting, sheets, chat), resulting in data silos.
- Repetitive Manual Work: Inefficiencies arise from duplicate data entry across systems, manual handoffs, and ad hoc scripts.
- Slow & Inconsistent Decision Making: Fragmented data leads to delayed signals and inconsistent data, hindering timely and informed business decisions.
- High Integration Cost & Risk: SMBs face high costs from paid connectors, engineering effort for custom solutions, and the risk of vendor lock in and data compliance overhead.

## Market Analysis

- Target Users: SMBs (1–500 employees), including operations leads, sales ops, small agencies, and e commerce shop owners.
- Market Size: Targets the large SMB automation/productivity segment — a global market in the tens of billions for workflow automation tools.
- Competitors & Gaps: Existing platforms (e.g., Zapier, Make) can be expensive, complex for non-technical users, risk data migration, and often lack safe, key free testing environments.

## Proposed Solution: Synapse

Synapse (Unified Operations Hub) is a template driven automation runner that unifies visibility and orchestrates workflows across existing tools without requiring data migration.

Core Principles

- Safe by Default: A sandboxed testing environment allows safe, key free configuration and validation of workflows before switching to live mode.
- Turnkey Automation: Pre built templates for common scenarios (Order Notify, Lead Capture, Daily Summary) enable near zero setup time.
- Seamless Transition to Live: Users can switch to production mode by providing API keys as environment variables.

Key Benefits

- Dramatically reduced setup time to enable automations.
- No data migration risk — workflows run against existing tools or mocked data.
- Low operational cost and transparent logging with retry capabilities.

## Technical Overview

Tech Stack

- Backend/Runner: Lightweight Node.js service (Express) exposed via Next.js API routes (serverless friendly).
- Frontend: Next.js (App Router) + Tailwind CSS and shadcn/ui for accessible components.
- Storage: Local JSON files for templates and `logs.txt` for run logs; Google Sheets optional for a zero cost live datastore.
- Integrations: Slack (incoming webhooks), Gmail/SMTP, Google Sheets API (real mode optional).

User Flow

1. Select & Map: Choose a template and map placeholders to source fields.
2. Trigger: Start a run via webhook, POST /run/:template, or a scheduler trigger.
3. Execute & Log: Runner resolves placeholders, executes actions (mocked in default mode), and writes detailed logs.

Runtime Modes

- Mock Mode (default): MOCK_MODE=true — runner prints resolved action payloads to console and `logs.txt` without calling external APIs.
- Real Mode: MOCK_MODE=false — provide env vars (SLACK_WEBHOOK, SMTP config, sheet IDs) and the runner will attempt real API calls.

## Feasibility, Scalability & Impact

- Feasibility: The project is highly feasible due to minimal infrastructure requirements (a single stateless Node.js runner) and a safety first approach that de risks development.
- Scalability: The stateless runner scales horizontally on serverless platforms. For heavier loads, a queue (Redis / SQS) can be introduced to buffer and retry jobs.

Impact

- Business Value: Lowers total cost of ownership for SMB automation and speeds time to value compared to traditional platforms.
- Technical Value: Provides an interoperable automation model that avoids complex and risky data migrations.
- Social Value: Empowers smaller businesses to adopt automation that was previously out of reach.

## Team

- Pulast Tiwari — Backend development & integration strategy
- Yash Kumar — UX design & frontend architecture

## Getting Started (Local)

1. Install dependencies:

```bash
pnpm install
```

2. Run the dev server (Next.js app + runner APIs):

```bash
pnpm run dev
```

3. Open the dashboard in a browser:

```
http://localhost:3000
```

4. Run a template via API (example):

```bash
curl -X POST -H "Content-Type: application/json" \
  http://localhost:3000/api/run/order_notify \
  -d '{"sampleData": {"order_id": "1234", "customer_email": "you@example.com"}}'
```

Notes

- Default behavior is mock only; no keys are required to try the demo templates.
- To enable real integrations, create a `.env.local` with the required keys (SLACK_WEBHOOK, SMTP credentials, sheet IDs) and set `MOCK_MODE=false`.
