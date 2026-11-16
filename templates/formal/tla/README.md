# TLA+ starter

Copy `Spec.tla` and `Model.cfg` into `formal/<name>/`.

Run:

```bash
java -cp path/to/tla2tools.jar tlc2.TLC -config Model.cfg Spec.tla
```

Prove user- or protocol-visible rules as `INVARIANT` lines. Keep constants small so TLC finishes.