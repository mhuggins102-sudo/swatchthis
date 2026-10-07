### easy-p6b (n=300)

Grid 5x5, 4 colors, hand 10, k 6, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.7% | 99.3% | 0.7% | 0.0% | 0.0% | 0.01 | 10.0 | 1 |
| greedy | 62.3% | 37.7% | 15.3% | 30.3% | 16.7% | 1.26 | 7.5 | 2 |
| lookahead | 95.0% | 5.0% | 1.0% | 37.7% | 56.3% | 2.45 | 5.0 | 30 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.3 | 38 |

Greedy trap rate 37.7% · winning lines found (capped) 17.4 · shortest win 4.35 cards (constructed k 6.0, par 5.65 left)

Generation: 7.8 attempts/puzzle (rejection 87.2%: greedy_shortcut 1330, big_share 650, solver_shortcut 62, unverified 1), 55 ms mean, 268 ms max, 2.2 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 47.3% | 64.8% | 76.1% | 69.2% | 76.1% |
| colPaint | 48.7% | 58.2% | 61.0% | 61.2% | 61.0% |
| diagPaint | 51.7% | 57.4% | 58.1% | 61.8% | 58.1% |
| transmute | 21.0% | 88.9% | 90.5% | 91.8% | 90.5% |
| colorSwap | 41.3% | 59.7% | 49.2% | 62.2% | 49.2% |
| flood | 55.0% | 81.2% | 82.4% | 84.8% | 82.4% |
| spread | 35.0% | 64.8% | 86.7% | 67.3% | 86.7% |
| stamp | 59.3% | 61.8% | 66.3% | 64.7% | 66.3% |
| majority | 44.7% | 70.1% | 79.1% | 74.0% | 79.1% |
| slide | 59.3% | 12.4% | 1.7% | 12.9% | 1.7% |
| trade | 53.0% | 23.9% | 6.9% | 24.8% | 6.9% |
| mirror | 10.3% | 87.1% | 96.8% | 87.1% | 96.8% |
| groupPaint | 55.3% | 32.5% | 37.3% | 34.4% | 37.3% |
| corners | 42.7% | 37.5% | 35.9% | 40.3% | 35.9% |
| rowMirror | 40.7% | 0.8% | 0.8% | 0.9% | 0.8% |
| colMirror | 41.7% | 0.8% | 0.0% | 0.9% | 0.0% |
| minority | 56.0% | 49.4% | 55.4% | 52.2% | 55.4% |
| cross | 58.3% | 67.4% | 74.3% | 70.2% | 74.3% |
| purge | 11.0% | 97.0% | 93.9% | 100.0% | 93.9% |
| scatter | 20.3% | 57.4% | 0.0% | 58.3% | 0.0% |
| wildTransmute | 18.3% | 92.7% | 0.0% | 94.4% | 0.0% |
| luckyLine | 27.0% | 14.8% | 0.0% | 15.8% | 0.0% |
| tumble | 19.3% | 3.4% | 0.0% | 3.7% | 0.0% |
| quadrants | 15.0% | 2.2% | 0.0% | 2.4% | 0.0% |
