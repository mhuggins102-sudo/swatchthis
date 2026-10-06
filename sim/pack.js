// The seed pack is written by the final sim run:
//   node sim/run.js --n 2000 --bots random,greedy,greedyDet,lookahead,lookaheadDet,solver,solverEv --lines --pack
// This file only forwards to that command for convenience.
import { spawnSync } from 'node:child_process';
const r = spawnSync(process.execPath, ['sim/run.js', '--pack', ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(r.status ?? 1);
