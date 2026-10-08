<!--
  Profile README for github.com/D-L-Narayana: a "general arrangement" drawing sheet.
  Every image is a local SVG in ./assets (light mode: whiteprint, dark mode: blueprint).
  No external images, badges, counters or scripts.
-->

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/hero-light.svg">
  <img src="assets/hero-light.svg" width="100%" alt="D L Narayana: data systems, full-stack products, applied AI. An engineering drawing sheet showing an exploded assembly of three plates, A data systems, B products and C applied AI, under an inspection probe labelled D assurance, with the tagline: Data in motion. Products on top. AI with a human in the loop.">
</picture>
</p>

**I'm D L Narayana**, a computer science undergraduate (B.Tech CSE, GITAM, class of 2027) in Visakhapatnam, India. I build **data systems** that move and model data, the **full-stack products** that sit on top of them, and **applied AI**, from agents with a human in the loop to models that run in the browser. I care most about work you can check: tests, synthetic data and stated limits, so you don't have to take a README's word for it.

**[Portfolio](https://dln-portfolio.vercel.app)** · **[LinkedIn](https://linkedin.com/in/dlnarayana)** · **[nvr0910@gmail.com](mailto:nvr0910@gmail.com)** · **[GitHub](https://github.com/D-L-Narayana)**

| Sheet | Contents |
| :-- | :-- |
| [**A** — Data systems](#a--data-systems) | CDC lakehouse, retail data series |
| [**B** — Full-stack products](#b--full-stack-products) | stay booking, reservations, civic tracker |
| [**C** — Applied AI](#c--applied-ai) | agents with a human gate, in-browser vision |
| [**D** — Assurance labs](#d--assurance-labs) | educational security and privacy labs |
| [General notes](#general-notes) | method, and how to read this page |

## A — Data systems

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/detail-a-lakeflow-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/detail-a-lakeflow-light.svg">
  <img src="assets/detail-a-lakeflow-light.svg" width="100%" alt="Detail A, LakeFlow: Postgres row changes flow through Debezium and a Kafka topic log into Spark Structured Streaming, then into a Bronze table, through a data-quality gate that diverts failing rows to quarantine with the rule name, and on to Silver and Gold Parquet tables. An Airflow DAG runs backfills with the same transforms.">
</picture>
</p>

**[LakeFlow](https://github.com/D-L-Narayana/lakeflow-cdc-pipeline)** · real-time CDC lakehouse<br>
Row changes leave PostgreSQL through Debezium and Kafka. Spark Structured Streaming then lands them as Bronze → Silver → Gold Parquet, with idempotent upsert/delete merges, SCD Type 2 history, a rule-based quarantine for rows that fail quality checks, batch backfill and an Airflow DAG.<br>
<sub>PySpark · Kafka (KRaft) · Debezium · PostgreSQL · Parquet · Airflow · Docker Compose · pytest</sub>

**The retail series** covers one domain from the data warehouse to the stock shelf:

- **[Retail Lakehouse ETL](https://github.com/D-L-Narayana/retail-lakehouse-etl)**: schema-enforced PySpark batch ETL over semi-structured sales lines. It covers corrupt-record capture, schema-drift detection, deduplication, a data-quality gate, an SCD2 star-schema warehouse, Spark SQL marts and a MongoDB serving layer.
- **[RetailPulse](https://github.com/D-L-Narayana/retailpulse)**: window-function analytics in plain Python and SQL over a normalised SQLite schema, rendered to a static SVG dashboard, with zero dependencies.
- **[DemandCast](https://github.com/D-L-Narayana/demandcast)**: store-level demand forecasting with rolling-origin backtests for each series, safety stock sized from backtest error, and an (R, s, S) replenishment engine. It has tests and CI.
- **[StockLine](https://github.com/D-L-Narayana/stockline)**: a multi-store inventory and order API on FastAPI and SQLite, with atomic stock reservation, idempotent orders, optimistic locking and an append-only ledger.

## B — Full-stack products

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/section-b-staynest-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/section-b-staynest-light.svg">
  <img src="assets/section-b-staynest-light.svg" width="100%" alt="Section B-B, StayNest, drawn like a building section: interface rooms for search and filters, wishlists, booking with a price breakdown and host analytics sit on a floor of typed REST routes, a row-level-security membrane and a PostgreSQL foundation on Supabase. An end-to-end test line runs through every layer; unit-test marks sit inside each one.">
</picture>
</p>

**[StayNest](https://github.com/D-L-Narayana/staynest)** · stay booking, end to end · [demo](https://staynest-two.vercel.app)<br>
Search and filters, wishlists, a booking flow with a live price breakdown, and host analytics. It is built on Next.js server components, typed REST routes and Supabase Postgres with row-level security, and it has unit and end-to-end tests.<br>
<sub>Next.js · TypeScript · Supabase (PostgreSQL + RLS) · Tailwind</sub>

**[Lodgic](https://github.com/D-L-Narayana/lodgic)** · hotel search and reservation engine<br>
Written in TypeScript with no runtime dependencies. It has a segment-tree availability index, demand pricing with exact currency rounding, logistic-regression learning-to-rank, double-booking-safe idempotent reservations and an LRU/TTL cache, behind a REST API with an in-browser demo.

**[CityHelp](https://github.com/D-L-Narayana/cityhelp)** · civic issue tracker · [demo](https://cityhelp-sage.vercel.app)<br>
Report a city issue, upvote it and follow it on a live dashboard and map. Analytics show trends, category mix and department workload.<br>
<sub>Next.js · Recharts</sub>

## C — Applied AI

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/schematic-c-aerosentry-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/schematic-c-aerosentry-light.svg">
  <img src="assets/schematic-c-aerosentry-light.svg" width="100%" alt="Schematic C, AeroSentry: a LangGraph supervisor delegates to retrieval (hybrid RAG), tools (Pydantic calls) and vision (VLM and thermal) agents. Its proposed action is traced and passes a manually operated valve, the human-in-the-loop gate, before it becomes an approved action. Golden-set evals measure the agent graph.">
</picture>
</p>

**[AeroSentry Agents](https://github.com/D-L-Narayana/aerosentry-agents)** · multi-agent operations layer designed for drone-in-a-box fleets<br>
A LangGraph supervisor delegates to specialist agents with hybrid RAG, Pydantic tool calling and VLM/thermal analysis. A human-in-the-loop safety gate sits between a proposed action and an approved one. The system adds a fallback protocol, tracing and golden-set evals. It is served with FastAPI, packaged with Docker and checked in CI.

**In-browser vision and forensics.** These projects run their analysis in the browser:

- **[VeriLens](https://github.com/D-L-Narayana/verilens)**: privacy-first KYC checks, covering face match, passive liveness, document OCR and tamper forensics on ONNX/WASM, with no inference APIs.
- **[VeriDoc Studio](https://github.com/D-L-Narayana/veridoc-studio)**: KYC document intelligence, with WASM OCR, Verhoeff checksum validation, error-level analysis and ONNX face detection.
- **[DocuForge](https://github.com/D-L-Narayana/docuforge)**: a document-forgery detection lab. It runs ELA, copy-move, noise, EXIF and JPEG forensics in the browser, plus a PyTorch research pipeline.
- **[AlterFrame](https://github.com/D-L-Narayana/alterframe)**: hold a window between your hands and reveal an illustrated alter ego, using browser-only hand and face tracking with WebGL2 stylization.

## D — Assurance labs

These are educational security and privacy labs built on synthetic data. Here inspection stops being a habit and becomes the subject.

- **[Cyber Assurance Lab](https://github.com/D-L-Narayana/cyber-assurance-lab)**: a suite of educational cybersecurity and privacy apps with synthetic fixtures, inspectable engines, tests, audit evidence and documented limits.
- **[Permit Matrix](https://github.com/D-L-Narayana/permit-matrix)**: an API-authorization lab that runs mixed test cases against a synthetic in-browser mock, with no external targets.
- **[Petitio](https://github.com/D-L-Narayana/petitio)**: a privacy-rights workflow with profile deadlines, guarded transitions, synthetic reconciliation and session audit hashing.
- **[Tessera CSF](https://github.com/D-L-Narayana/tessera-csf)**: a NIST CSF 2.0 evidence mapper using synthetic data and custom heuristics, running browser-local in React/TypeScript.

## General notes

Notes 1–6 describe how the pipelines are built. Notes 7–8 explain how to read this page.

1. **Raw stays raw.** Bronze is append-only and schema-agnostic. Typing and business rules live downstream, where they can be versioned and replayed.
2. **Idempotency over promises.** Merges keep the latest row per key in commit order, so replaying offsets or re-running a backfill yields identical tables.
3. **Deletes and history are first-class.** Before-images drive deletes. SCD Type 2 rows carry effective-from and effective-to dates and a current flag.
4. **Quality is a gate, not a filter.** Failing rows go to quarantine with the rule that caught them, and a run fails when too many do.
5. **Observable by default.** Every run has structured JSON logs, streaming-query metrics and per-stage timings.
6. **One transform, two modes.** The same code powers streaming micro-batches and backfills, so one test suite covers both.
7. **Do not scale.** Figures quoted inside individual repos are author-reported on specific workloads, not independent benchmarks. This page leaves them out on purpose.
8. **Scope.** This is personal and portfolio work, built as a student. Demo links are portfolio deployments, not production services. The assurance labs are built on synthetic data. Forks are other people's work, so they aren't listed.

## Toolbox

- **Languages:** Python · SQL · TypeScript · JavaScript
- **Data:** PySpark · Spark SQL · Structured Streaming · Kafka · Debezium · Airflow · Parquet · PostgreSQL · MongoDB · SQLite
- **Product:** React · Next.js · Node.js · FastAPI · Supabase · Tailwind · Recharts · Vite
- **AI:** LangGraph · hybrid RAG · Pydantic tool calling · VLMs · ONNX/WASM in the browser · PyTorch · golden-set evals
- **Practice:** pytest · unit and end-to-end tests · Docker Compose · CI · structured logging
- **Exploring:** Delta Lake · Databricks · Snowflake · Kafka Streams · data contracts

<details>
<summary><b>More in the workshop</b>: analytics, tools, games and coursework</summary>
<br>

| Repo | What it is |
| :-- | :-- |
| [ABKit](https://github.com/D-L-Narayana/abkit) | A/B-testing and ranking-evaluation toolkit: z and Welch tests, power and sample size, SRM guardrail, CUPED, Holm/Bonferroni, NDCG/MRR and team-draft interleaving, validated by Monte-Carlo simulation |
| [Telecom KPI Monitor](https://github.com/D-L-Narayana/telecom-kpi-monitor) | NOC-style 4G LTE / 5G NR KPI, alarm and packet-statistics dashboard on a synthetic, seeded dataset |
| [Nova](https://github.com/D-L-Narayana/nova-ai-assistant) | no-signup AI chat assistant with server-side token streaming, expert personas, and Markdown and code rendering |
| [GitHubLens](https://github.com/D-L-Narayana/githublens) · [demo](https://githublens-kappa.vercel.app) | analyse a GitHub profile: stars, languages, top repos |
| [CodeRunner](https://github.com/D-L-Narayana/coderunner) · [demo](https://coderunner-snowy.vercel.app) | code-typing game: race the clock on real snippets and build combos |
| [ResumeForge](https://github.com/D-L-Narayana/resumeforge) · [demo](https://resumeforge-ruby-rho.vercel.app) | privacy-first career toolkit in plain HTML, CSS and JavaScript: resume builder, ATS scoring, PDF scanner, cover letters |
| [AlgoViz](https://github.com/D-L-Narayana/algoviz) · [demo](https://algoviz-lilac.vercel.app) | sorting and pathfinding visualiser with live metrics |
| [CryptoLab](https://github.com/D-L-Narayana/cryptolab) · [demo](https://cryptolab-six.vercel.app) | classical ciphers next to real Web Crypto: hashing, AES-GCM, RSA |
| [Spectra](https://github.com/D-L-Narayana/spectra) | palette and gradient generator with CSS, Tailwind and JSON export |
| [Typeflow](https://github.com/D-L-Narayana/typeflow) | minimal typing-speed test with live WPM and accuracy |
| [Stillpoint](https://github.com/D-L-Narayana/stillpoint) | generative focus environments with browser-generated soundscapes |
| [CAPSTONE](https://github.com/D-L-Narayana/CAPSTONE) | GITAM capstone: PSO-based 3D node localization for wireless sensor networks, with a Monte-Carlo study and a 3D swarm simulator |
| [Telstra cybersecurity simulation](https://github.com/D-L-Narayana/forage-telstra-cybersecurity-job-simulation) | Forage virtual job simulation, an exercise rather than employment: alert triage, firewall-log analysis, a Python firewall rule and an incident postmortem |
| [Skyscanner flight schedule](https://github.com/D-L-Narayana/skyscanner-flight-schedule) | Forage virtual job simulation, an exercise rather than employment: React with Skyscanner Backpack components, plus Jest tests |

Forks of other people's tools also appear on my profile. They're theirs, so they aren't listed here.

</details>

## Contact

I'm happy to talk about CDC semantics, SCD Type 2 modelling, data-quality gates, or how to evaluate an agent before trusting it.

**[Portfolio](https://dln-portfolio.vercel.app)** · **[LinkedIn](https://linkedin.com/in/dlnarayana)** · **[nvr0910@gmail.com](mailto:nvr0910@gmail.com)** · **[GitHub](https://github.com/D-L-Narayana)**

<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/title-block-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/title-block-light.svg">
  <img src="assets/title-block-light.svg" width="100%" alt="Drawing title block. Drawn by: D L Narayana. Checked by: you.">
</picture>
</p>

<sub>Every drawing on this page is a local SVG file in this repository. There are no external images, trackers or counters.</sub>
