/-!
Minimal example: list length is never negative under `length`.
Replace with your algorithm and invariant.
-/

def length {α : Type} : List α → Nat
  | []      => 0
  | _ :: xs => length xs + 1

theorem length_nonneg {α : Type} (xs : List α) : length xs ≥ 0 := by
  simp [length]