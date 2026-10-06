### med-gap2 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 9.8 | 1 |
| greedy | 48.3% | 51.7% | 2.5% | 19.3% | 26.5% | 1.21 | 7.3 | 3 |
| lookahead | 83.3% | 16.8% | 2.0% | 23.0% | 58.3% | 2.23 | 6.0 | 73 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.4 | 83 |

Greedy trap rate 51.7% · winning lines found (capped) 17.3 · shortest win 5.36 cards (constructed k 7.0, par 4.64 left)

Generation: 17.9 attempts/puzzle (rejection 94.4%: greedy_shortcut 5034, big_share 962, solver_shortcut 573, unverified 190, few_colors 10), 244 ms mean, 1236 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 49.0% | 69.4% | 88.8% | 81.0% | 88.8% |
| colPaint | 52.8% | 62.1% | 85.3% | 74.9% | 85.3% |
| diagPaint | 53.0% | 57.1% | 88.7% | 71.6% | 88.7% |
| transmute | 22.3% | 70.8% | 95.5% | 95.5% | 95.5% |
| colorSwap | 58.5% | 6.4% | 12.8% | 7.5% | 12.8% |
| flood | 72.0% | 72.2% | 90.6% | 86.0% | 90.6% |
| spread | 1.8% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 77.0% | 71.1% | 95.8% | 85.2% | 95.8% |
| majority | 57.3% | 78.6% | 97.8% | 91.4% | 97.8% |
| slide | 63.0% | 7.5% | 6.7% | 9.1% | 6.7% |
| trade | 58.3% | 20.2% | 23.6% | 25.0% | 23.6% |
| mirror | 13.3% | 88.7% | 100.0% | 97.9% | 100.0% |
| scatter | 30.8% | 67.5% | 0.0% | 76.1% | 0.0% |
| wildTransmute | 38.5% | 80.5% | 0.0% | 89.9% | 0.0% |
| luckyLine | 36.0% | 20.1% | 0.0% | 24.4% | 0.0% |
| tumble | 41.0% | 5.5% | 0.0% | 7.0% | 0.0% |
