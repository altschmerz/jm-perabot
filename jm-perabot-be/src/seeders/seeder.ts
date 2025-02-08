import dataSource from '../appDataSource'
import ProductService from '../services/product.service'
import UserService from '../services/user.service'

const userService = new UserService()
const productService = new ProductService()

async function seed() {
  console.info('Dropping existing database...')
  await dataSource.initialize()
  await dataSource.dropDatabase()
  await dataSource.destroy()

  console.info('Seeding...')
  await dataSource.initialize()

  console.info('Creating users...')
  const user1 = await userService.createUser({
    username: 'admin1',
    password: 'admin123',
    email: 'admin1@gmail.com',
    name: 'Dummy1',
  })

  console.info('Creating products...')
  const huggsyProduct = productService.createProduct({
    sku: 'huggsy',
    name: 'Huggsy',
    description: "Joey's bedtime penguin pal",
    purchasePrice: 100000,
    retailPrice: 100000,
    wholesalerPrice: 100000,
    totalStock: 11,
    variants: [
      {
        name: 'Original',
        stock: 1,
      },
      {
        name: 'Fake',
        stock: 10,
      },
    ],
  })

  const cloakProduct = await productService.createProduct({
    sku: 'cloak-of-invisibility',
    name: 'The Cloak of Invisibility',
    description: 'Handy for sneaking into the private section of the library.',
    purchasePrice: 1000000,
    retailPrice: 1000000,
    wholesalerPrice: 1000000,
    totalStock: 1,
  })
}

seed().then(() => console.info('Seeding process finished.'))
