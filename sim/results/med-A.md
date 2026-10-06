### med-A (n=400)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 9.9 | 1 |
| greedy | 33.0% | 67.0% | 2.3% | 8.3% | 22.5% | 0.86 | 8.0 | 3 |
| lookahead | 66.3% | 33.8% | 1.5% | 16.5% | 48.3% | 1.79 | 7.0 | 66 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.2 | 115 |

Greedy trap rate 67.0% · winning lines found (capped) 16.6 · shortest win 6.16 cards (constructed k 8.0, par 3.84 left)

Generation: 39.4 attempts/puzzle (rejection 97.5%: unverified 479, greedy_shortcut 11586, solver_shortcut 1933, big_share 1347, few_colors 29), 786 ms mean, 4506 ms max, 2.2 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 53.5% | 56.5% | 96.7% | 85.8% | 96.7% |
| colPaint | 48.8% | 61.5% | 93.3% | 87.6% | 93.3% |
| diagPaint | 62.3% | 53.0% | 96.0% | 81.5% | 96.0% |
| transmute | 10.8% | 62.8% | 97.7% | 96.4% | 97.7% |
| colorSwap | 70.3% | 11.0% | 20.3% | 16.6% | 20.3% |
| flood | 79.3% | 61.5% | 96.5% | 91.1% | 96.5% |
| spread | 1.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 78.5% | 60.8% | 98.1% | 94.1% | 98.1% |
| majority | 54.8% | 66.7% | 100.0% | 99.3% | 100.0% |
| slide | 68.5% | 7.7% | 11.7% | 12.0% | 11.7% |
| trade | 66.8% | 28.1% | 36.7% | 41.2% | 36.7% |
| mirror | 5.8% | 56.5% | 100.0% | 100.0% | 100.0% |
| scatter | 21.0% | 61.9% | 0.0% | 89.7% | 0.0% |
| wildTransmute | 26.8% | 80.4% | 0.0% | 100.0% | 0.0% |
| luckyLine | 26.3% | 22.9% | 0.0% | 42.9% | 0.0% |
| tumble | 26.0% | 3.8% | 0.0% | 6.2% | 0.0% |
