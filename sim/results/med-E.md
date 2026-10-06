### med-E (n=400)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.5, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.0% | 0.3% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 27.0% | 73.0% | 3.8% | 5.8% | 17.5% | 0.68 | 8.1 | 3 |
| lookahead | 59.8% | 40.3% | 0.3% | 14.5% | 45.0% | 1.64 | 7.0 | 54 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.2 | 95 |

Greedy trap rate 73.0% · winning lines found (capped) 14.9 · shortest win 6.25 cards (constructed k 8.0, par 3.75 left)

Generation: 28.6 attempts/puzzle (rejection 96.5%: solver_shortcut 2166, greedy_shortcut 7352, unverified 531, big_share 966, few_colors 18), 705 ms mean, 3818 ms max, 3.2 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 48.5% | 54.6% | 93.3% | 84.8% | 93.3% |
| colPaint | 49.8% | 43.7% | 96.5% | 82.1% | 96.5% |
| diagPaint | 58.0% | 45.7% | 93.1% | 79.1% | 93.1% |
| transmute | 16.8% | 50.7% | 86.6% | 82.9% | 86.6% |
| colorSwap | 70.8% | 12.0% | 30.4% | 19.0% | 30.4% |
| flood | 77.0% | 52.6% | 91.6% | 83.9% | 91.6% |
| spread | 2.8% | 90.9% | 100.0% | 100.0% | 100.0% |
| stamp | 78.3% | 52.1% | 98.1% | 88.1% | 98.1% |
| majority | 58.8% | 55.7% | 99.6% | 94.9% | 99.6% |
| slide | 65.3% | 8.0% | 12.6% | 14.2% | 12.6% |
| trade | 60.8% | 26.7% | 44.9% | 42.5% | 44.9% |
| mirror | 6.0% | 70.8% | 100.0% | 100.0% | 100.0% |
| scatter | 18.8% | 64.0% | 0.0% | 92.3% | 0.0% |
| wildTransmute | 23.3% | 69.9% | 0.0% | 98.5% | 0.0% |
| luckyLine | 29.3% | 23.1% | 0.0% | 39.7% | 0.0% |
| tumble | 28.7% | 3.5% | 0.0% | 7.5% | 0.0% |
