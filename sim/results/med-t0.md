### med-t0 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 0, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.3% | 0.0% | 0.0% | 0.00 | 9.8 | 1 |
| greedy | 54.3% | 45.8% | 3.8% | 33.3% | 17.3% | 1.22 | 6.9 | 3 |
| lookahead | 91.0% | 9.0% | 1.0% | 20.0% | 70.0% | 2.51 | 4.6 | 77 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.2 | 68 |

Greedy trap rate 45.8% · winning lines found (capped) 12.5 · shortest win 4.20 cards (constructed k 7.0, par 5.80 left)

Generation: 7.5 attempts/puzzle (rejection 86.7%: greedy_shortcut 2041, big_share 456, unverified 107, few_colors 3), 109 ms mean, 786 ms max, 1.9 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 46.3% | 57.3% | 76.8% | 65.0% | 76.8% |
| colPaint | 47.5% | 69.5% | 78.9% | 77.6% | 78.9% |
| diagPaint | 48.8% | 53.8% | 64.1% | 59.7% | 64.1% |
| transmute | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| colorSwap | 63.2% | 2.4% | 4.3% | 2.6% | 4.3% |
| flood | 72.5% | 62.1% | 71.4% | 68.2% | 71.4% |
| spread | 45.8% | 98.4% | 99.5% | 99.4% | 99.5% |
| stamp | 72.5% | 67.9% | 80.7% | 75.2% | 80.7% |
| majority | 47.0% | 69.7% | 84.0% | 77.1% | 84.0% |
| slide | 64.5% | 2.7% | 5.0% | 3.0% | 5.0% |
| trade | 64.3% | 7.4% | 12.5% | 8.1% | 12.5% |
| mirror | 19.3% | 84.4% | 98.7% | 95.6% | 98.7% |
| scatter | 36.5% | 35.6% | 0.0% | 38.0% | 0.0% |
| wildTransmute | 37.3% | 60.4% | 0.0% | 63.4% | 0.0% |
| luckyLine | 37.8% | 13.2% | 0.0% | 14.6% | 0.0% |
| tumble | 39.3% | 1.3% | 0.0% | 1.4% | 0.0% |
