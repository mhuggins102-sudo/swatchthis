### med-k9 (n=400)

Grid 5x5, 5 colors, hand 10, k 9, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.8% | 99.3% | 0.8% | 0.0% | 0.0% | 0.01 | 9.9 | 1 |
| greedy | 32.0% | 68.0% | 1.8% | 21.5% | 8.8% | 0.71 | 7.9 | 4 |
| lookahead | 86.5% | 13.5% | 0.8% | 20.5% | 65.3% | 2.38 | 4.8 | 68 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.1 | 94 |

Greedy trap rate 68.0% · winning lines found (capped) 12.8 · shortest win 4.13 cards (constructed k 9.0, par 5.87 left)

Generation: 4.7 attempts/puzzle (rejection 78.7%: greedy_shortcut 1251, unverified 124, big_share 104, few_colors 2), 161 ms mean, 972 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 34.5% | 63.0% | 83.3% | 76.3% | 83.3% |
| colPaint | 32.0% | 65.6% | 82.0% | 74.3% | 82.0% |
| diagPaint | 51.2% | 51.7% | 72.2% | 59.9% | 72.2% |
| transmute | 19.3% | 76.6% | 90.9% | 93.7% | 90.9% |
| colorSwap | 74.0% | 2.7% | 2.7% | 3.1% | 2.7% |
| flood | 81.8% | 63.0% | 74.9% | 73.6% | 74.9% |
| spread | 49.5% | 96.5% | 100.0% | 100.0% | 100.0% |
| stamp | 66.8% | 60.7% | 79.0% | 71.4% | 79.0% |
| majority | 44.0% | 74.4% | 87.5% | 86.8% | 87.5% |
| slide | 76.3% | 2.6% | 2.3% | 3.0% | 2.3% |
| trade | 75.0% | 11.0% | 9.3% | 12.5% | 9.3% |
| mirror | 10.8% | 83.7% | 95.3% | 94.7% | 95.3% |
| scatter | 23.5% | 36.2% | 0.0% | 39.5% | 0.0% |
| wildTransmute | 22.3% | 61.8% | 0.0% | 63.2% | 0.0% |
| luckyLine | 29.8% | 11.8% | 0.0% | 14.6% | 0.0% |
| tumble | 24.5% | 1.0% | 0.0% | 1.3% | 0.0% |
