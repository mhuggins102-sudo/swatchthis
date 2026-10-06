### med-lowpaint (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0, card weights {"rowPaint":0.5,"colPaint":0.5,"diagPaint":0.4,"transmute":0.4}

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 1.0% | 99.0% | 0.8% | 0.3% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 54.8% | 45.3% | 3.3% | 37.5% | 14.0% | 1.20 | 6.9 | 4 |
| lookahead | 89.0% | 11.0% | 0.5% | 18.5% | 70.0% | 2.48 | 4.5 | 88 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.0 | 83 |

Greedy trap rate 45.3% · winning lines found (capped) 13.3 · shortest win 4.01 cards (constructed k 7.0, par 5.99 left)

Generation: 9.5 attempts/puzzle (rejection 89.4%: big_share 750, greedy_shortcut 2535, unverified 86, few_colors 17), 124 ms mean, 720 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 31.8% | 59.8% | 79.5% | 70.4% | 79.5% |
| colPaint | 29.0% | 58.6% | 75.0% | 66.7% | 75.0% |
| diagPaint | 36.0% | 50.0% | 68.8% | 56.3% | 68.8% |
| transmute | 16.8% | 77.6% | 80.6% | 88.1% | 80.6% |
| colorSwap | 65.5% | 1.9% | 2.7% | 2.1% | 2.7% |
| flood | 73.8% | 59.7% | 67.8% | 66.9% | 67.8% |
| spread | 46.5% | 98.4% | 100.0% | 100.0% | 100.0% |
| stamp | 77.3% | 59.9% | 76.4% | 67.3% | 76.4% |
| majority | 52.0% | 71.6% | 87.0% | 82.3% | 87.0% |
| slide | 67.3% | 0.7% | 1.9% | 0.8% | 1.9% |
| trade | 72.0% | 10.4% | 9.0% | 11.8% | 9.0% |
| mirror | 26.3% | 78.1% | 97.1% | 90.1% | 97.1% |
| scatter | 35.0% | 25.7% | 0.0% | 27.9% | 0.0% |
| wildTransmute | 37.5% | 58.0% | 0.0% | 63.0% | 0.0% |
| luckyLine | 37.8% | 10.6% | 0.0% | 12.0% | 0.0% |
| tumble | 38.0% | 0.7% | 0.0% | 0.8% | 0.0% |
