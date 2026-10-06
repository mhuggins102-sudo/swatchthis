### med-C (n=400)

Grid 5x5, 5 colors, hand 10, k 9, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 9.9 | 1 |
| greedy | 32.8% | 67.3% | 1.0% | 5.3% | 26.5% | 0.91 | 8.0 | 3 |
| lookahead | 66.0% | 34.0% | 0.3% | 16.3% | 49.5% | 1.81 | 6.9 | 68 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.2 | 115 |

Greedy trap rate 67.3% · winning lines found (capped) 15.1 · shortest win 6.17 cards (constructed k 9.0, par 3.83 left)

Generation: 31.1 attempts/puzzle (rejection 96.8%: solver_shortcut 2286, greedy_shortcut 8185, big_share 711, unverified 849, few_colors 14), 1031 ms mean, 8297 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 35.5% | 62.0% | 100.0% | 92.6% | 100.0% |
| colPaint | 42.5% | 60.6% | 98.8% | 95.4% | 98.8% |
| diagPaint | 52.5% | 53.3% | 97.6% | 80.0% | 97.6% |
| transmute | 9.3% | 67.6% | 100.0% | 96.2% | 100.0% |
| colorSwap | 69.3% | 10.1% | 20.6% | 15.5% | 20.6% |
| flood | 91.5% | 60.4% | 97.3% | 90.6% | 97.3% |
| spread | 1.8% | 71.4% | 100.0% | 100.0% | 100.0% |
| stamp | 77.3% | 62.5% | 99.7% | 93.2% | 99.7% |
| majority | 56.3% | 63.1% | 99.6% | 97.3% | 99.6% |
| slide | 74.3% | 5.7% | 11.8% | 9.0% | 11.8% |
| trade | 71.5% | 25.9% | 43.0% | 38.3% | 43.0% |
| mirror | 6.3% | 64.0% | 100.0% | 100.0% | 100.0% |
| scatter | 26.3% | 66.7% | 0.0% | 94.6% | 0.0% |
| wildTransmute | 25.8% | 79.6% | 0.0% | 98.8% | 0.0% |
| luckyLine | 24.3% | 24.7% | 0.0% | 40.0% | 0.0% |
| tumble | 23.8% | 5.3% | 0.0% | 10.6% | 0.0% |
