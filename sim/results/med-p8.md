### med-p8 (n=300)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.0 | 1 |
| greedy | 24.0% | 76.0% | 6.7% | 4.0% | 13.3% | 0.55 | 9.1 | 2 |
| lookahead | 61.0% | 39.0% | 1.0% | 7.0% | 53.0% | 1.74 | 7.7 | 36 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 7.3 | 59 |

Greedy trap rate 76.0% · winning lines found (capped) 7.3 · shortest win 7.35 cards (constructed k 8.0, par 2.65 left)

Generation: 215.0 attempts/puzzle (rejection 99.5%: solver_shortcut 22697, greedy_shortcut 35329, big_share 4928, unverified 1222, few_colors 28, no_inverse 4), 4651 ms mean, 27921 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 35.7% | 47.7% | 93.5% | 78.5% | 93.5% |
| colPaint | 40.3% | 52.1% | 96.7% | 91.3% | 96.7% |
| diagPaint | 56.3% | 52.1% | 95.9% | 89.8% | 95.9% |
| transmute | 9.7% | 58.6% | 89.7% | 85.0% | 89.7% |
| colorSwap | 50.3% | 48.3% | 96.7% | 83.0% | 96.7% |
| flood | 63.3% | 52.1% | 91.6% | 82.5% | 91.6% |
| spread | 4.3% | 69.2% | 100.0% | 81.8% | 100.0% |
| stamp | 62.3% | 48.7% | 95.7% | 83.5% | 95.7% |
| majority | 35.0% | 59.0% | 100.0% | 98.4% | 100.0% |
| slide | 79.7% | 24.3% | 70.7% | 39.7% | 70.7% |
| trade | 60.3% | 38.7% | 78.5% | 58.3% | 78.5% |
| mirror | 3.7% | 72.7% | 100.0% | 100.0% | 100.0% |
| groupPaint | 70.0% | 36.7% | 86.7% | 57.0% | 86.7% |
| corners | 63.3% | 40.0% | 95.8% | 67.9% | 95.8% |
| rowMirror | 53.7% | 1.9% | 26.7% | 3.1% | 26.7% |
| colMirror | 62.3% | 1.6% | 23.5% | 2.7% | 23.5% |
| minority | 45.7% | 55.5% | 98.5% | 90.5% | 98.5% |
| cross | 56.0% | 54.8% | 98.2% | 93.9% | 98.2% |
| purge | 6.0% | 72.2% | 100.0% | 100.0% | 100.0% |
| scatter | 17.3% | 67.3% | 0.0% | 92.1% | 0.0% |
| wildTransmute | 22.0% | 80.3% | 0.0% | 100.0% | 0.0% |
| luckyLine | 23.3% | 30.0% | 0.0% | 52.5% | 0.0% |
| tumble | 19.7% | 8.5% | 0.0% | 17.2% | 0.0% |
| quadrants | 17.7% | 5.7% | 0.0% | 13.0% | 0.0% |
