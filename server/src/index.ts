import { startKoa } from './startKoa';
import { startIO } from './startIO';
import { initDb } from './db';
import { PORT } from './configs';

async function main() {
  await initDb();
  const server = startKoa();
  startIO(server);

  server.listen(PORT, () => {
    console.log('listening on port:' + PORT);
  });
}
main();
