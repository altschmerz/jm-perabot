const BASE_URL = "/products/";
import dataSource from "../../appDataSource";
import ProductService from "../../services/product.service";

const productService = new ProductService();

describe("Product Test Suite", () => {
  describe("Product service", () => {
    beforeEach(async () => {
      await dataSource.initialize();
    });

    test("Create product", async () => {
      const product = await productService.createProduct({
        sku: "test",
        name: "Test",
        description: "Test create product",
        price: 10000,
        totalStock: 1,
        categoryIds: [1],
      });
      expect(product.name).toBe("Test");
    });

    afterEach(async () => {
      await dataSource.destroy();
    });
  });
});
