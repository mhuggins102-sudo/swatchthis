### med-k6 (n=400)

Grid 5x5, 5 colors, hand 10, k 6, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.3% | 0.0% | 0.0% | 0.00 | 9.8 | 1 |
| greedy | 69.0% | 31.0% | 4.0% | 48.0% | 17.0% | 1.51 | 6.5 | 3 |
| lookahead | 92.3% | 7.8% | 0.8% | 22.8% | 68.8% | 2.52 | 4.7 | 69 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.3 | 59 |

Greedy trap rate 31.0% · winning lines found (capped) 16.4 · shortest win 4.25 cards (constructed k 6.0, par 5.75 left)

Generation: 8.9 attempts/puzzle (rejection 88.8%: big_share 759, greedy_shortcut 2353, unverified 34, few_colors 16), 83 ms mean, 478 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 52.3% | 62.2% | 72.7% | 66.3% | 72.7% |
| colPaint | 50.0% | 66.5% | 79.0% | 71.5% | 79.0% |
| diagPaint | 54.5% | 49.1% | 57.8% | 53.8% | 57.8% |
| transmute | 22.8% | 73.6% | 70.3% | 79.8% | 70.3% |
| colorSwap | 50.2% | 3.0% | 5.5% | 3.3% | 5.5% |
| flood | 62.0% | 62.1% | 65.7% | 66.7% | 65.7% |
| spread | 35.8% | 97.9% | 100.0% | 100.0% | 100.0% |
| stamp | 75.0% | 65.3% | 81.0% | 70.5% | 81.0% |
| majority | 58.8% | 72.3% | 81.7% | 79.8% | 81.7% |
| slide | 53.3% | 3.8% | 1.4% | 4.1% | 1.4% |
| trade | 52.8% | 9.5% | 6.6% | 10.2% | 6.6% |
| mirror | 24.0% | 77.1% | 95.8% | 86.0% | 95.8% |
| scatter | 39.0% | 41.7% | 0.0% | 43.9% | 0.0% |
| wildTransmute | 33.5% | 71.6% | 0.0% | 74.4% | 0.0% |
| luckyLine | 37.5% | 15.3% | 0.0% | 16.7% | 0.0% |
| tumble | 35.8% | 1.4% | 0.0% | 1.5% | 0.0% |
