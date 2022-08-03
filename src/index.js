import { build } from './app.js';

async function start () {
  const port = 8080;

  try {
    const server = await build();
    const addr = await server.listen({ port });
    console.log(`Listening on ${addr}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();