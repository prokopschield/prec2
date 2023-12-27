# prec2

### What does this solve?

JavaScript number rounding is weird and most of the time you just want two decimal digits of precision anyway.

Under the hood, this library uses fixed-point notation and bigints.

Please note that all rounding happens towards zero.

### Usage

```typescript
import { add, sub, div, mul } from "prec2";

let sum = add(0.1, 0.2); // 0.3
let bad = 0.1 + 0.2; // 0.30000000000000004
```
