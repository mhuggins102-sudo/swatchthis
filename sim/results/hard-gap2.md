### hard-gap2 (n=400)

Grid 6x6, 6 colors, hand 11, k 8, luck [2,2], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.3% | 0.0% | 0.0% | 0.00 | 10.8 | 3 |
| greedy | 52.0% | 48.0% | 2.0% | 18.8% | 31.3% | 1.33 | 8.2 | 9 |
| lookahead | 75.0% | 25.0% | 2.0% | 20.3% | 52.8% | 2.01 | 7.1 | 283 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.5 | 268 |

Greedy trap rate 48.0% · winning lines found (capped) 17.4 · shortest win 6.48 cards (constructed k 8.0, par 4.52 left)

Generation: 16.5 attempts/puzzle (rejection 94.0%: big_share 1024, greedy_shortcut 3653, solver_shortcut 1001, unverified 491, few_colors 43), 1240 ms mean, 6509 ms max, 2.3 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 46.0% | 62.0% | 91.8% | 86.4% | 91.8% |
| colPaint | 52.0% | 60.1% | 94.7% | 81.2% | 94.7% |
| diagPaint | 57.0% | 55.7% | 89.5% | 73.8% | 89.5% |
| transmute | 24.8% | 63.6% | 94.9% | 91.3% | 94.9% |
| colorSwap | 50.2% | 3.5% | 10.9% | 4.8% | 10.9% |
| flood | 85.3% | 69.2% | 93.8% | 91.1% | 93.8% |
| spread | 7.8% | 93.5% | 100.0% | 100.0% | 100.0% |
| stamp | 82.3% | 63.2% | 96.7% | 84.2% | 96.7% |
| majority | 62.3% | 73.1% | 98.8% | 95.8% | 98.8% |
| slide | 57.0% | 3.5% | 7.9% | 4.8% | 7.9% |
| trade | 59.0% | 14.4% | 29.7% | 18.8% | 29.7% |
| mirror | 12.0% | 85.4% | 100.0% | 100.0% | 100.0% |
| scatter | 44.3% | 54.2% | 0.0% | 68.1% | 0.0% |
| wildTransmute | 47.8% | 71.7% | 0.0% | 92.6% | 0.0% |
| luckyLine | 41.3% | 15.8% | 0.0% | 21.3% | 0.0% |
| tumble | 42.5% | 5.9% | 0.0% | 8.6% | 0.0% |
