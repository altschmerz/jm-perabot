import { FindManyOptions, FindOptionsWhere, ILike } from 'typeorm'
import {
  CategoryAlreadyExistsError,
  CategoryNotFoundError,
} from '../errors/category.error'
import Category from '../models/Category'
import BaseService from './BaseService'

export default class CategoryService extends BaseService {
  async createCategory(options: { name: string }): Promise<Category> {
    const category = new Category()
    category.name = options.name
    await category.save()

    return category
  }

  async getCategories(options: {
    page: number
    pageSize: number
    name?: string
  }): Promise<{ categories: Category[]; count: number }> {
    let findOptions: FindManyOptions<Category> = {
      take: options.pageSize,
      skip: options.page * options.pageSize,
    }

    let whereFilters: FindOptionsWhere<Category> = {}
    if (options.name) whereFilters.name = ILike(options.name)

    findOptions.where = whereFilters

    const [categories, count] = await Category.findAndCount(findOptions)
    return { categories, count }
  }

  async getCategoryById(options: { id: number }): Promise<Category> {
    const category = await Category.findOne({
      where: { id: options.id },
      relations: ['products'],
    })
    if (!category) CategoryNotFoundError({ attribute: 'ID', value: options.id })

    return category
  }

  async updateCategory(options: {
    id: number
    name: string
  }): Promise<Category> {
    const category = await this.getCategoryById({ id: options.id })

    await this.checkNameUniqueness({ name: options.name })

    category.name = options.name
    await category.save()

    return category
  }

  private async checkNameUniqueness(options: {
    name: string
  }): Promise<boolean> {
    const category = await Category.findOne({
      where: { name: ILike(options.name) },
    })
    if (category) CategoryAlreadyExistsError()
    return true
  }
}
