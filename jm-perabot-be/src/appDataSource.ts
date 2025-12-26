import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['build/src/models/**/*.js'],
  logging: ['error'],
  logger: 'advanced-console',
  synchronize: true,
})

export default dataSource
