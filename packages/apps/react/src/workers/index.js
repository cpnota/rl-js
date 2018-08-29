export const createWorker = workers => task => workers[task.type](task.payload);
