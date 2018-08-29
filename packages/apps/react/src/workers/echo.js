function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (message) => {
  await sleep(1000);
  console.log(`echo: ${message}`);
  return message;
};
