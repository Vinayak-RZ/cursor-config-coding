# Stamped: how Vinayak explains it today

**As of:** 20 October 2026, 4:40 PM IST. **stamped-external main:** `cbb6b9d` (PR #118 merged 20 Oct 2026, 4:45 PM IST). **Also read:** `research/quality-plus-process/POSITIONING_PREFERENCES.md` and `POSITIONING_DECISION_LOG.md` (on main; status: proposed, awaiting Vinayak).

> **Refresh rule.** This file is a snapshot. Before using it, read the latest stamped-external `main` and compare it against `cbb6b9d`, especially `docs/copy/STAMPED_COPY_GUIDE.md`, the root `Stamped_Master_Document.md` plus its quality-plus-process revision (`research/quality-plus-process/Stamped_Master_Document.md`), `technical/DECISIONS.md` and the decision log. If anything changed, the repo wins and this file must be refreshed. Never reuse a line marked "under review" as settled.

Source order when they disagree: a dated decision in the log, then the copy guide (wording), then the master document (company identity), then working notes.

## 1. In one breath

Stamped is AI for plant operations. Its always-on AI agents work on the data a manufacturing plant already records: they monitor every process, model each machine from the plant's own runs, improve its control inside limits set beforehand, and catch a batch heading for rejection while it can still be saved. The plant makes fewer bad parts, throws away less scrap, and spends less energy on each good part, measured in its own numbers.

Positioned as general industrial AI for Indian plants (owners as buyers, Delhi NCR first), with sector depth on solution pages. The vision is smarter plants. The wedge is process and quality.

Never "Stamped Energy". Not an energy company, a dashboard, a replacement for MES or quality systems, a hardware company or a consultancy. Energy is one outcome (energy spent on parts that never ship), stated in a short clause, never the lead and never a separate programme.

## 2. How he explains it, by audience

| | Plant owners | Plant engineers, quality and heat-treat heads | Investors and general audiences |
| --- | --- | --- | --- |
| Opening | The loss they already recognise: a scrapped or rejected part never earns back its material, labour, time or energy | Why a lot failed, and who decides | What the technology does that is new, then why that is the business |
| Depth | Outcomes plus one plain line of method | Moderately technical, in their machine names | Non-technical stories; method names allowed in investor video and decks |
| Agents | Later, in the meeting, shown on their own records. Use "AI agents" where continuous watching is the point; otherwise state the operating rule | The two agent systems, evidence on every finding, the safety filter and the signed window | Shown as agency: what the agents notice, do and check on a shift |
| Proof | A worst-lot replay on their own records; a "line record" from their own plant once it exists | Evidence ids on each finding; matched-batch comparison | Only sourced facts; nothing implied about live plants |
| Close | A short meeting with the person you wrote to; "Book a site survey" on public surfaces | Same | The end state: agents running live in plants, paying customers |

**Sector order for technical stories:** forging (billet heating and dies) first, then heat treatment, then foundry. Keep every industry page on the site so no prospect thinks their industry is not served.

## 3. The core pitch arc

Weave this in every time (High, P&M and PR #118):

1. Models of the plant's core equipment, built from its own runs.
2. Prediction: how a load or batch will turn out, including what a sensor cannot see.
3. Control recommendations, and over time earned control, that cut scrap and rejections.
4. Always-on agents on top, on every batch and every shift.

**The founder's known-line loop** (tell it as a story): observe how the line really runs, research how the best plants run it, simulate variations on a model of this line, propose one change with its expected result, run approved shifts, measure in the plant's own numbers, adopt as the standard. Every shift then runs like the best one.

**Story moments that work** (from the pitch stories; tell them like a colleague who never sleeps): a new part the plant has never made; getting better overnight on a model of the line; saving the batch at 2 a.m.; finding the cause before the customer calls. Each one shows that Stamped notices on its own, does the homework, checks itself and asks the right person at the right moment. Pitch stories may reach past today's architecture (he is confident the team will deliver), but must not claim it runs today.

**Internal motto:** users should feel they have gained a superpower, the way he did with a general AI assistant. "Superpower" is internal only; we never claim it. Design pilots as a run of "it did that by itself?" moments and lead follow-ups with one moment and its evidence.

## 4. Outcomes and how to state them

- **Lead outcomes:** fewer rejections, less scrap, a batch caught while it can still be saved, lower energy per good part.
- **In a client letter, scrap leads** (the loss most under process control), then reruns, then rejection risk, then heat treatment. One clause separates scrap from rejection.
- **Value line:** "What we think we can move is scrap under process control, about 10 to 15% less preventable rejection and rework, and with them lower energy per good part. Those are aims, not a contract."
- **Credible framing:** an assumed 8 to 13% rejection rate and an assumed 10 to 15% cut, always labelled as assumptions. Verified savings to date are zero.
- **Two products** (names to be chosen): `[NAME: control agent system]` and `[NAME: quality agent system]`, with proof in the plant's own numbers shipped with both.
- **The four areas** are process, quality, planning and maintenance, with energy counted inside all of them. Not a fixed roadmap: no dates.

## 5. Authority and autonomy framing

**Of record (copy guide, 15 Oct):** "Stamped works inside limits set beforehand." Say what it improves and the limits in the same breath. Say: tested in simulation first; checked by a safety filter; runs in shadow mode before going live; every change logged and visible; the team can switch it off. Do not say a person approves every change (it makes Stamped sound slow). Do not say Stamped controls the furnace or changes settings on its own. Do not publish the internal hard-stop list, and avoid hard "never" lists such as "never writes to a PLC" or "nothing is written to your machines".

**Under review (D3):** "Stamped recommends and your team decides" (live site, P&M brief). Do not treat either as settled in new public copy without checking the log.

**By room:**
- Client letters: a named person turns the knob, the operator can override, the quality team releases parts, and the in-charge writes the limits. Stamped does not release material.
- Investor answers: the recorded line is "from models that recommend changes to agents that run the line's control", proved live. (Medium: investor room only; do not spread it into client documents.)
- Direct control comes only after the system is proven on that line, within limits the client's engineers sign. Heat-treatment setpoint writes are excluded by ADR-035 until a new decision.

## 6. Terms

| Use | Avoid |
| --- | --- |
| AI for plant operations; AI agents (with what they do) | "ML" or "AI agents" alone as the claim; "machine learning and AI" (dropped, every vendor says it) |
| every batch; your own numbers; while it can still be saved; limits set beforehand; good parts; beyond your best runs; always on | unlock, empower, platform (as the pitch), transform, superpower (public), plant operating system, intelligence layer, decision intelligence |
| Live Control | Live SCADA |
| line record | case study |
| site survey, then implementation; worst-lot replay | cycle, first cycle, improvement cycle; guarantee; pre-agreed success criteria in a letter |
| a model of each machine (call it a digital twin only after it passes validation) | "digital twin" in client writing unless he has used it there (Medium) |
| "AI-based predictive control" on technical pages, decks and site surveys only | that phrase in headlines or first-touch copy |
| the plants we work with | place names the reader cannot use |
| | "Smarter control" as a pillar name (rejected; still in the master doc and guide) |
| | "Find it. Change it. Prove it. Keep it." (retired) |
| | Kalman, unscented filters, neural nets, error tables, world models or reinforcement learning in owner letters (allowed in decks and technical meetings) |

## 7. Claims

**Can say:** works on records the plant already keeps; models each machine from its own runs; tests a change in a model before the line sees it; findings come with their evidence; gains measured against matched batches on the plant's own line; the Ask agent answers questions in ordinary language from their data and does not invent numbers that are not in the record.

**Cannot say:** any savings figure, percentage, rupee figure, customer name, logo or quote not produced by that plant; competitor results as ours; that anything is live or in pilot (the first paid pilot is still a proposal); autonomous setpoint writes or furnace control today; replacement of engineers; India hosting or an offline on-site mode (`[CONFIRM]`); "first finding within about two weeks" (unconfirmed); any pricing figure; client names in general docs; failed earlier products by name (say "three directions before this; some failed on value proposition, one on go-to-market"); dated roadmaps; energy-only or two-pillar framing.

**Team roles:** Vinayak leads engineering, product and positioning. Utso Sarkar leads outreach and sales and helps on software. Never swap them.

## 8. Open decisions under review

From the decision log (merged with PR #118; proposed, awaiting Vinayak) and the open website plan. Do not resolve these by guessing; ask.

| Point | Of record | Under review | Conflict |
| --- | --- | --- | --- |
| Hero | "AI agents that work on your plant's data, every batch." (15 Oct) | Eyebrow "Industrial AI", H1 "From monitoring your plant to improving it." (website plan, not signed off). Live site still says "Turn plant data into action." | Record, plan and live site all differ |
| D3 Authority line | "Stamped works inside limits set beforehand." | "Stamped recommends and your team decides" | A positioning diagram still ends "Your team decides" |
| D17/D20 Three steps | Copy guide and ADR-035 keep autonomous execution unbuilt and staged | Monitoring, Decision making, Autonomous execution shown equally; a "Planned" tag on step 3 was rejected. Proposed pairing: "proven changes, inside the limits your engineers signed", never on hard-stop classes | Equal display versus not-built status |
| Pilot labels | None agreed; nothing presented as in pilot | "Available in pilots" and "On the way"; nothing "Live" until a plant runs it | Needs a rule change |
| D5 Planning and maintenance | Master doc: they come after the wedge | Site shows Planning live, Maintenance "coming soon" | Site versus master doc |
| Agents section on the homepage | Copy guide keeps agent detail for meetings | Possibly a compact section after "What we improve" | Outcomes-first rule versus showcase |
| Product names | `[NAME: ...]` placeholders | Not chosen | |
