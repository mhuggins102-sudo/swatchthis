### hard-gap3 (n=400)

Grid 6x6, 6 colors, hand 11, k 8, luck [2,2], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.8 | 3 |
| greedy | 48.0% | 52.0% | 2.8% | 21.5% | 23.8% | 1.17 | 8.2 | 8 |
| lookahead | 80.8% | 19.3% | 0.5% | 23.5% | 56.8% | 2.18 | 6.4 | 257 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.8 | 244 |

Greedy trap rate 52.0% · winning lines found (capped) 18.0 · shortest win 5.83 cards (constructed k 8.0, par 5.17 left)

Generation: 8.5 attempts/puzzle (rejection 88.3%: greedy_shortcut 1887, unverified 266, solver_shortcut 335, big_share 498, few_colors 28), 634 ms mean, 5271 ms max, 2.3 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 45.3% | 65.2% | 90.1% | 79.7% | 90.1% |
| colPaint | 42.3% | 59.2% | 89.9% | 76.9% | 89.9% |
| diagPaint | 58.8% | 51.9% | 85.5% | 65.6% | 85.5% |
| transmute | 22.5% | 70.0% | 90.0% | 91.3% | 90.0% |
| colorSwap | 53.8% | 2.3% | 7.9% | 3.0% | 7.9% |
| flood | 81.3% | 65.5% | 89.5% | 79.2% | 89.5% |
| spread | 22.0% | 94.3% | 100.0% | 100.0% | 100.0% |
| stamp | 82.3% | 61.1% | 94.5% | 77.0% | 94.5% |
| majority | 58.5% | 71.8% | 97.9% | 90.8% | 97.9% |
| slide | 62.5% | 3.2% | 4.4% | 4.0% | 4.4% |
| trade | 60.5% | 15.3% | 23.6% | 18.9% | 23.6% |
| mirror | 15.8% | 85.7% | 100.0% | 100.0% | 100.0% |
| scatter | 40.5% | 49.4% | 0.0% | 59.3% | 0.0% |
| wildTransmute | 46.8% | 76.5% | 0.0% | 88.3% | 0.0% |
| luckyLine | 46.3% | 16.2% | 0.0% | 20.4% | 0.0% |
| tumble | 45.8% | 2.7% | 0.0% | 3.7% | 0.0% |
