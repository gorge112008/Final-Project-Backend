export default class DaoRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getProduct(limit, page, sort, query) {
      const products = await this.dao.getProducts(limit, page, sort, query);
      return products;
    }
  
    async getProductUniq(query) {
      let product = await this.dao.getProductUnique(query);
      return product;
    }
  
    async getDataId(id) {
      let product = await this.dao.getProductId(id);
      return product;
    }
  
    async addProduct(newProduct) {
      let product = await this.dao.addProduct(newProduct);
      return product;
    }
    async updateProduct(id, body) {
      let product = await this.dao.updateProduct(id, body);
      return product;
    }
    async deleteProduct(id) {
      let product = await this.dao.deleteProduct(id);
      return product;
    }
  }
  