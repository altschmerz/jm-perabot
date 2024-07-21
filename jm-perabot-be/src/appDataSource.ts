import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'jm-perabot-dev',
  entities: ['build/src/models/**/*.js'],
  logging: ['error'],
  logger: 'advanced-console',
  synchronize: true,
})

export default dataSource
