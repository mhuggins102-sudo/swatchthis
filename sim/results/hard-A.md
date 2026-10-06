### hard-A (n=400)

Grid 6x6, 6 colors, hand 11, k 9, luck [2,2], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.9 | 3 |
| greedy | 50.0% | 50.0% | 1.5% | 17.3% | 31.3% | 1.30 | 8.2 | 9 |
| lookahead | 73.8% | 26.3% | 0.8% | 21.3% | 51.7% | 1.99 | 7.1 | 310 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.5 | 289 |

Greedy trap rate 50.0% · winning lines found (capped) 16.7 · shortest win 6.46 cards (constructed k 9.0, par 4.54 left)

Generation: 9.9 attempts/puzzle (rejection 89.9%: greedy_shortcut 1831, solver_shortcut 785, unverified 554, big_share 386, few_colors 19), 1264 ms mean, 7767 ms max, 2.3 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 35.5% | 64.8% | 98.6% | 92.0% | 98.6% |
| colPaint | 41.5% | 68.7% | 97.6% | 91.9% | 97.6% |
| diagPaint | 57.8% | 54.1% | 92.2% | 73.1% | 92.2% |
| transmute | 20.8% | 62.7% | 98.8% | 96.3% | 98.8% |
| colorSwap | 53.8% | 3.7% | 7.9% | 5.1% | 7.9% |
| flood | 93.3% | 63.3% | 96.0% | 86.1% | 96.0% |
| spread | 12.8% | 94.1% | 100.0% | 100.0% | 100.0% |
| stamp | 82.8% | 63.1% | 99.1% | 85.7% | 99.1% |
| majority | 59.3% | 69.6% | 98.7% | 94.8% | 98.7% |
| slide | 58.8% | 4.3% | 7.7% | 5.7% | 7.7% |
| trade | 62.0% | 14.9% | 28.2% | 20.4% | 28.2% |
| mirror | 7.5% | 86.7% | 100.0% | 100.0% | 100.0% |
| scatter | 48.0% | 53.1% | 0.0% | 70.8% | 0.0% |
| wildTransmute | 44.8% | 71.5% | 0.0% | 87.1% | 0.0% |
| luckyLine | 40.0% | 23.1% | 0.0% | 31.9% | 0.0% |
| tumble | 42.0% | 3.6% | 0.0% | 5.8% | 0.0% |
