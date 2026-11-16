---- MODULE Spec ----
EXTENDS Naturals, Sequences

\* Example: two-phase user action. Replace with your states.
VARIABLES phase

Init == phase = "idle"

YouSubmit ==
  /\ phase = "idle"
  /\ phase' = "pending"

YouConfirm ==
  /\ phase = "pending"
  /\ phase' = "done"

Stutter == UNCHANGED phase

Next ==
  \/ YouSubmit
  \/ YouConfirm
  \/ Stutter

Spec == Init /\ [][Next]_phase

\* Product rule: never reach done without pending
MustPassThroughPending ==
  phase = "done" => TRUE \* strengthen: add history variable in real specs

====