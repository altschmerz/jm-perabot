import { config } from 'dotenv'
import dataSource from './appDataSource'
import { app } from './configureExpress'
config()
const v8 = require('v8')

const PORT = process.env.PORT || 8080 // default port to listen

async function main(): Promise<void> {
  // Setup Backend Connection.
  await dataSource.initialize()

  // start the Express server
  app.listen(PORT, () => {
    console.log(`server is in ${process.env.NODE_ENV} mode`)
    console.log(
      `server started at http://localhost:${PORT} at time ${new Date()} with version ${
        process.version
      }`
    )
    console.log(
      `Max Old Space Size is set to: ${
        v8.getHeapStatistics().heap_size_limit / (1024 * 1024)
      } MB`
    )
  })
}

main()
