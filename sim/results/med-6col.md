### med-6col (n=400)

Grid 5x5, 6 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 1.0% | 99.0% | 0.5% | 0.5% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 55.5% | 44.5% | 3.5% | 38.5% | 13.5% | 1.21 | 7.0 | 3 |
| lookahead | 91.0% | 9.0% | 1.0% | 24.3% | 65.8% | 2.47 | 4.7 | 80 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.2 | 68 |

Greedy trap rate 44.5% · winning lines found (capped) 15.1 · shortest win 4.19 cards (constructed k 7.0, par 5.81 left)

Generation: 6.8 attempts/puzzle (rejection 85.3%: big_share 306, greedy_shortcut 1850, unverified 112, few_colors 55), 115 ms mean, 858 ms max, 1.9 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 43.5% | 62.1% | 70.7% | 67.9% | 70.7% |
| colPaint | 43.5% | 65.5% | 79.9% | 73.5% | 79.9% |
| diagPaint | 52.8% | 57.3% | 66.4% | 63.0% | 66.4% |
| transmute | 25.5% | 68.6% | 75.5% | 76.9% | 75.5% |
| colorSwap | 65.3% | 3.1% | 6.5% | 3.4% | 6.5% |
| flood | 69.8% | 64.2% | 69.2% | 69.6% | 69.2% |
| spread | 50.2% | 99.0% | 100.0% | 100.0% | 100.0% |
| stamp | 66.5% | 65.0% | 79.3% | 72.4% | 79.3% |
| majority | 41.8% | 73.7% | 89.8% | 82.6% | 89.8% |
| slide | 65.3% | 2.7% | 2.3% | 2.9% | 2.3% |
| trade | 61.3% | 8.2% | 7.3% | 8.8% | 7.3% |
| mirror | 17.3% | 84.1% | 95.7% | 95.1% | 95.7% |
| scatter | 37.3% | 35.6% | 0.0% | 39.6% | 0.0% |
| wildTransmute | 37.0% | 39.9% | 0.0% | 42.4% | 0.0% |
| luckyLine | 40.3% | 18.6% | 0.0% | 20.0% | 0.0% |
| tumble | 34.5% | 2.9% | 0.0% | 3.3% | 0.0% |
