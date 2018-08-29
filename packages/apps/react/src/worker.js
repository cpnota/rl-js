import './configure-rl';
import { createWorker } from './workers';
import standard from './workers/standard';
import log from './workers/log';
import echo from './workers/echo';

const worker = createWorker({
  standard,
  log,
  echo,
});

export const dispatch = task => worker(task);
