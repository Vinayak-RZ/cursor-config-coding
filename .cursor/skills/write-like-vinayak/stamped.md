# Stamped: how Vinayak explains it today

**As of:** 20 October 2026, evening. **Explanation locked** from the WFES one-pager he rewrote by hand that day. **stamped-external main at the earlier snapshot:** `cbb6b9d`. **Also read** the master document for hard stops, and the copy guide only for facts that can go stale (what is live, names, numbers).

> **Which file wins.** For how he explains the product (the heading, the lede, the losses, and find / simulate / approve / keep on), this file wins over `docs/copy/STAMPED_COPY_GUIDE.md`. That guide, decided 14–15 Oct, still tells a writer not to show an approval and not to let an agent change a setting. Following both produced the drafts he rejected. Do not "correct" a draft back to those two bans.
>
> Still take from the repo, and refresh this file when they change: company name Stamped, hard stops, verified savings are zero, product names are still `[NAME: ...]`, nothing is live or in pilot, no invented customer or figure. Never reuse a website line he has not used in his own explanation.

## 1. In one breath

Stamped is AI for plant operations. It models a plant's processes and equipment from the data the plant already logs, then recommends the change that cuts the loss, inside limits set beforehand.

The losses are scrap, rejects and wasted energy, usually found after the damage, when the parts have already left. Stamped is built to catch that drift while the run can still be saved.

Never "Stamped Energy". Not an energy company, a dashboard, a replacement for MES or quality systems, a hardware company or a consultancy. Energy sits in the same sentence as scrap and rejects. It is not a separate programme, and it is not the company. A worked example comes from the open bank in section 3. The heading does not name that machine.

## 2. Lines he will sign

Use these as written when the piece has to say what Stamped is. The sentence under the heading is the company. Do not add a Company block that repeats it.

- **Kicker:** AI for plant operations.
- **Heading:** From monitoring your plant to improving it.
- **Under the heading:** Stamped models your processes and equipment from the data you already log, then recommends the change that cuts the loss, inside limits set beforehand.
- **Product:** Agents watch every run and learn each machine from that plant's own logs. They try the next setting in a model before the line sees it, and they catch a batch heading for rejection before it ships. The operator gets the change, and the record it came from.
- **What we solve:** Scrap, rejects and wasted energy are usually found after the damage. The parts have already left by then. Stamped is built to catch the drift while the run can still be saved.

The live site and the 15 Oct hero ("AI agents that work on your plant's data, every batch.") may still differ. New copy uses his heading. Do not swap it back because the guide's appendix retired it.

## 3. How a change reaches the plan

Tell it in this order, with these names. One or two words each.

1. **Find loss.** Name a loss already happening, in the plant's own words.
2. **Simulate.** They try the change on a model of that machine, and check the constraint that would make it a bad change.
3. **Approve.** The operator sees the change and the record behind it, and approves it before the machine is touched.
4. **Keep on.** Once it has proved itself, the agent runs it from then on, and it becomes part of how that line runs. It does not come back for a fresh approval every time.

**How a finding reads.** A plain mismatch a shift lead can repeat. Then three short blocks: What we found, The opportunity, How we capture it. Beside them: Evidence, Approve, and Comment. Comment is the operator saying something or asking for a different change. Caption every sample: it is a sample, written from records the plant already keeps.

**How we capture it,** in his shape: You approve. The agent makes the allowed change. Loads that must stay on stay with you.

**Two samples, two machines. The pair stays open.** On one page, the card and the steps use different machines, so the reader does not think the product is that one machine. Pick any two from the bank below, or write a new one in the same shape when the reader's line uses a different machine. Do not default to the same pair every time. Each sample is a sample. None of them is a live plant.

The shape of a new sample, in words a shift lead can say back:

- Headline, two facts: what this job needs, and what the machine is still doing.
- Tag: the area, then the loss in plain words.
- One finding sentence.
- What we found. The opportunity. How we capture it.
- Steps, if this sample is the strip: one sentence each, a scene, not a definition of the step name.

**Furnace, next part.** He used this on the card, and it is the one he said he could follow.

- Headline: This part needs less heat. The furnace is still set for the last one.
- Tag: Heat treatment · Extra fuel, not yet burned
- Finding: The last part was hotter. The burners have not come down, so that extra fuel has not been burned yet.
- What we found: The furnace is still hot from the last part. This one does not need that much heat.
- The opportunity: If the burners stay high, they burn fuel this part will never use.
- How we capture it: You approve. The agent turns the burners down. Loads that must stay on stay with you.

**Billet heater, press stopped.** He used this in the steps.

- Find loss: The forging press has stopped, but the billet heater is still running at full heat.
- Simulate: They try a lower heat for the stop on a model of that heater, and check the billets are still hot enough when the press restarts.
- Approve: The operator sees the change and the record behind it, and approves it before the heater is touched.
- Keep on: Once it has proved itself, the agent runs it on every stop, and it becomes part of how that line runs.

**Quench, parts still in the tank.** A reject caught before the load comes out.

- Headline: This load is cooling too fast. The parts are still in the quench.
- Tag: Heat treatment · A batch heading for rejection
- Finding: The loads that passed cooled more slowly. This one is already ahead of them, and it has not come out yet.
- What we found: The quench is running colder than the loads that passed. The parts are still in the tank.
- The opportunity: If it finishes this way, the batch fails after it leaves, and the heat already in it is wasted.
- How we capture it: You approve. The agent brings this quench back to the rate the good loads used. A load that must hit a hardness spec stays with you.
- Find loss: The quench is cooling this load faster than the loads that passed, and the parts are still in the tank.
- Simulate: They try a slower cool on a model of that quench, and check the parts still come out hard enough.
- Approve: The operator sees the change and the record behind it, and approves it before the quench is touched.
- Keep on: Once it has proved itself, the agent runs it on every load that is cooling too fast, and it becomes part of how that line runs.

**Induction coil, thinner shaft.** The same "still set for the last job" idea, on a different machine.

- Headline: This shaft needs a shorter heat. The coil is still set for the thicker one.
- Tag: Induction hardening · Extra heat, not yet used
- Finding: The last shaft was thicker. This one is already in the coil, and the coil has not come down.
- What we found: The coil is still on the setting for the thicker shaft. This shaft does not need that long a heat.
- The opportunity: The extra seconds heat a shaft that does not need them, and can push it out of spec.
- How we capture it: You approve. The agent shortens this heat. A shaft that must stay on full heat stays with you.

**Die, next billets not forged yet.** Scrap caught before the press makes the part.

- Headline: These parts are drifting out of size. The next billets are not forged yet.
- Tag: Forging · Scrap before the press
- Finding: The last parts from this die are moving toward the size that fails. The next billets are still in the heater.
- What we found: The die is making parts that are leaving the size that passed.
- The opportunity: If those billets are forged now, they are scrap, and the heat in them is gone.
- How we capture it: You approve. The agent holds the next billets. Releasing a part stays with you.
- Find loss: Parts from this die are drifting out of size, and the next billets have not been forged.
- Simulate: They try holding those billets on a model of that press, and check the metal is still sound when forging starts again.
- Approve: The operator sees the change and the record behind it, and approves it before the press is held.
- Keep on: Once it has proved itself, the agent holds the next billets whenever that die starts to drift, and it becomes part of how that line runs.

Say "a model of that machine." Do not say digital twin, world model, or reinforcement learning on this surface. A line he could not picture ("Ease the burners") is too compressed. Two facts, then the move.

## 4. Authority

Say the recommendation and the limits in the same breath: inside limits set beforehand.

The old pair of bans is retired for new copy. Do not apply either of these from the 14 Oct guide:

- "Do not say a person approves every change."
- "Do not say the agent changes a setting on its own."

His sequence needs both halves. The operator approves before the first touch. After the change has proved itself, the agent runs the allowed change without asking again. Approval is not on every later run, and the agent does not touch the machine before that first approval.

Loads that must stay on stay with the operator. So do the hard stops in the master document: no silent safety or critical-equipment control, no quality hold release, no maintenance authorisation or lockout bypass, no silent change to customer priority, promise dates, routing or the full dispatch sequence. Do not print that list as a "never" list. Say "loads that must stay on stay with you."

Still true: tested on a model first, the record is visible (Evidence), the team can refuse or comment, nothing is claimed live. Do not say shadow mode, safety filter, or setpoint writes unless the room is a technical meeting.

## 5. How he explains it, by audience

| | Plant owners | Plant engineers, quality and heat-treat heads | Investors and general audiences |
| --- | --- | --- | --- |
| Opening | The heading and the lede in section 2, then the loss found too late | The finding: what was found, the opportunity, how it is captured | The same loop: find, simulate, approve, keep on |
| Depth | Outcomes plus one plain line of method | Their machine names, the model check, the record | One scene, then the loop. No method names |
| Agents | The operator gets the change and the record. After it is proved, the agent runs the allowed change | Evidence on the finding. Comment if they want a different change | What the agent notices, checks, and then runs |
| Proof | A sample, labelled as a sample. A replay on their own records once they ask | The record behind the finding | Only sourced facts. Nothing implied about a live plant |
| Close | A short meeting with the person you wrote to | Same | The end state: a proved change that keeps running |

**Sector order for a technical story:** forging, then heat treatment, then a foundry line when the reader runs one. Pick the machines from the bank in section 3, two different ones if the page has a card and a strip. One machine per section.

## 6. Outcomes and how to state them

- **Lead losses, together:** scrap, rejects, wasted energy. Caught while the run can still be saved.
- **In a client letter,** scrap leads, then the parts that have already left, then energy in the same breath. One clause can separate scrap from rejection. Do not open a letter as an energy-only pitch.
- **A percentage** appears only in a letter, only as an aim he has already approved, always labelled as an aim. The public explanation and a one-pager carry no percentage, no rupee figure, and no customer.
- **Verified savings to date are zero.**
- **Two products** (names to be chosen): `[NAME: control agent system]` and `[NAME: quality agent system]`. Do not invent the names. The explanation in section 2 does not need them.
- **The four areas** are process, quality, planning and maintenance, with energy counted inside them. Not a dated roadmap.

## 7. Terms

| Use | Avoid |
| --- | --- |
| AI for plant operations; the heading in section 2 | "Stamped Energy"; an energy-only company |
| models your processes and equipment; a model of that machine; the change that cuts the loss | digital twin, world model, reinforcement learning, on a first-touch page |
| Find loss, Simulate, Approve, Keep on | "Find it. Change it. Prove it. Keep it." (retired) |
| Evidence, Approve, Comment | "Then the agent runs it" as a button or a slogan under the card |
| while the run can still be saved; inside limits set beforehand; loads that must stay on stay with you | a person approves every later run; the agent changes a setting before anyone has approved it |
| a sample finding | live, in pilot, proven, guarantee |
| | unlock, empower, platform (as the pitch), transform, showcase, innovation, superpower (public) |
| | Kalman, filters, neural nets, error tables in owner copy |

## 8. Claims

**Can say:** works on records the plant already keeps; models each machine from its own runs; tries the next setting in a model before the line sees it; the operator approves before the first touch; once proved, the agent runs the allowed change; findings come with their evidence; the operator can comment.

**Cannot say:** any savings figure, percentage, rupee figure, customer name, logo or quote not produced by that plant; that anything is live or in pilot; that the sample furnace or heater is a real plant's result; replacement of engineers; India hosting or an offline on-site mode (`[CONFIRM]`); any pricing; client names in general docs; dated roadmaps; energy-only or two-pillar framing; the word innovation.

**Team roles:** Vinayak leads engineering, product and positioning. Utso Sarkar leads outreach and sales and helps on software. Founder line when a footer needs it: Co-founder, Undergrad, IIT Roorkee. Never swap who leads outreach.

## 9. What the first drafts got wrong

The skill's voice rules were fine. The product explanation was taken from the 14–15 Oct copy guide, which contradicts the way he talks through the product.

- The guide's hero is "AI agents that work on your plant's data, every batch." He explains it as "From monitoring your plant to improving it."
- The guide's subhead is monitor, tune, and catch a batch. His lede starts with models, then the change that cuts the loss.
- The guide forbids showing an approval, because it sounds slow, and forbids an agent changing a setting. He explains a first approval, then the agent keeps running the change that proved itself.
- Early drafts put one furnace scene in the heading, the product, the problem and the steps, and compressed it into a line he could not repeat ("Ease the burners"). The heading stays the whole job. The body is a specific scene, in words a shift lead can say back. A second section gets a different machine.

## 10. Still open

Do not resolve these by guessing.

| Point | How to write it now | Still elsewhere |
| --- | --- | --- |
| Website hero | Use section 2 | Live site may still say "Turn plant data into action." |
| Copy guide authority | Use section 4 | Guide section 7 still has the two retired bans |
| Product names | Placeholders | Not chosen |
| Planning and maintenance | After the wedge, in a letter | The site may show them differently |
| Pilot labels | Do not say live or in pilot | Nothing is running at a plant |
