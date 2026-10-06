### med-nosetup (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0, card weights {"slide":0,"trade":0,"colorSwap":0,"mirror":0.3}

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.8% | 99.3% | 0.8% | 0.0% | 0.0% | 0.01 | 9.7 | 1 |
| greedy | 73.5% | 26.5% | 2.5% | 46.5% | 24.5% | 1.69 | 6.2 | 2 |
| lookahead | 93.8% | 6.3% | 0.3% | 22.0% | 71.5% | 2.59 | 4.9 | 48 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.7 | 35 |

Greedy trap rate 26.5% · winning lines found (capped) 25.2 · shortest win 4.68 cards (constructed k 7.0, par 5.32 left)

Generation: 25.5 attempts/puzzle (rejection 96.1%: greedy_shortcut 9598, big_share 199, unverified 17), 67 ms mean, 387 ms max, 3.4 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 49.5% | 57.1% | 69.7% | 60.8% | 69.7% |
| colPaint | 50.0% | 61.5% | 74.5% | 66.5% | 74.5% |
| diagPaint | 61.0% | 45.5% | 49.6% | 47.6% | 49.6% |
| transmute | 18.0% | 80.6% | 84.7% | 86.6% | 84.7% |
| colorSwap | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| flood | 98.8% | 69.4% | 75.9% | 74.1% | 75.9% |
| spread | 33.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 79.8% | 58.9% | 72.7% | 61.8% | 72.7% |
| majority | 55.0% | 70.5% | 78.6% | 76.7% | 78.6% |
| slide | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| trade | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| mirror | 5.3% | 85.7% | 95.2% | 94.7% | 95.2% |
| scatter | 36.3% | 38.6% | 0.0% | 40.3% | 0.0% |
| wildTransmute | 43.0% | 76.7% | 0.0% | 79.0% | 0.0% |
| luckyLine | 37.0% | 11.5% | 0.0% | 12.6% | 0.0% |
| tumble | 37.5% | 2.0% | 0.0% | 2.2% | 0.0% |
