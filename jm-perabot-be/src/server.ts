import app from "./app";
import dataSource from "./appDataSource";

const PORT = 8080;

async function main() {
  await dataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

main();
