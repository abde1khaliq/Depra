# Depra

A proxy-based backend system that sits between any API company and their clients. It intercepts all traffic, tracks who calls what, warns consumers before deprecated endpoints die, and enforces hard cutoffs automatically. The API company configures it once and the system runs itself.

## The Core Problem It Solves

Let's a company by the name of _Payd_ built `POST /v1/charge` 3 years ago. It accepted raw card numbers — a security liability. They built `POST /v2/charge` as the proper replacement. But they have 340 clients and have no idea which ones are still calling v1, how often, or who to warn. So v1 just sits there forever. Unmaintained. Dangerous. Untouchable.

# Diagram

_Burger Chain_, _Hotel App_, and _T-Shirt Store_ are all clients for _Payd_
_Payd's Team_ point to _Depra's_ Proxy to intercept the request and check if the endpoint is deprecated if so, continue on with the request and attach a notifier in the headers back to the client.

```
                    ┌──────────────────────────────────┐
                    │              Depra               │
                    │                                  │
Burger Chain ─────> │  1. Intercept request            │
                    │  2. Check policy                 │──────▶  internal.payd.com
Hotel App    ─────> │  3. Log usage                    │◀──────  (only if allowed)
T-Shirt Store ────> │  4. Inject warning headers       │
                    │  5. Block if past sunset         │
                    │                                  │
Payd's Team ──────> │  6. Query usage reports          │
                    │  7. Grant extensions             │
                    │  8. Register new policies        │
                    └──────────────────────────────────┘
```

## What Depra Actually Consists Of

| Component                   | What It Does                                                            |
| --------------------------- | ----------------------------------------------------------------------- |
| **Proxy Gateway**           | Intercepts all traffic between Payd's clients and Payd's server         |
| **Policy Engine**           | Stores deprecation rules and evaluates every request against them       |
| **Usage Tracker**           | Logs every call, aggregates per client per endpoint                     |
| **Notification Dispatcher** | Sends warnings via email, response headers, and Slack at the right time |
| **Enforcement Gate**        | Blocks requests past their sunset date before they reach Payd           |
| **Auth Middleware**         | Identifies Payd via API key and validates request signatures            |
| **Admin API**               | Lets Payd query usage, register endpoints, and grant extensions         |

## What Gets Solved End To End

- Payd finally knows exactly who is calling v1, how often, and when they last called it
- Every active client gets warned automatically with zero manual effort from Payd
- Clients who need more time get individual extensions without affecting anyone else
- On the sunset date the endpoint is killed at the gateway — Payd's server never sees the request
- Payd's insecure v1 endpoint is permanently gone
- Their codebase is smaller, their security audit is cleaner, and no paying client was surprised

---

Depra — a proxy that sits in the middle, runs silently, and handles the entire lifecycle
of retiring an API endpoint from first warning to final block. Without #Payd's team
having to think about it after day one.
