import { productsModel } from "../models/products.model.js";

export default class ProductDao {
  async getData({ limit, page, sort, query }) {
    try {
      let products;
      products = await productsModel.paginate(query, { limit, page, sort });
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getDataUnique(query) {
    try {
      const product = await productsModel.findOne(query);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async getDataId(id) {
    try {
      const newProduct = [];
      const product = await productsModel.findOne({ _id: id });
      newProduct.push(product);
      return newProduct;
    } catch (err) {
      throw err;
    }
  }

  async addData(newProduct) {
    try {
      const product = await productsModel.create(newProduct);
      return product;
    } catch (err) {
      throw err;
    }
  }
  async updateData(query, body) {
    try {
      const product = await productsModel.findOneAndUpdate(query, body, {
        new: true,
        upsert: true,
      });
      return product;
    } catch (err) {
      throw err;
    }
  }

  async deleteData(id) {
    try {
      await productsModel.findByIdAndDelete(id);
      return;
    } catch (err) {
      throw err;
    }
  }
}
