import './configure-rl';
import { createWorker } from './workers';
import standard from './workers/standard';
import log from './workers/log';
import echo from './workers/echo';
import hcpi from './workers/hcpi';

const worker = createWorker({
  standard,
  log,
  echo,
  hcpi,
});

export const dispatch = task => worker(task);
