import { cartsModel } from "../models/carts.model.js";

export default class CartsDao {
    async getData() {
      try {
        const carts = await cartsModel.find();
        return carts;
      } catch (err) {
        throw err;
      }
    }
    async getDataId(id) {
      try {
        const cart = await cartsModel
          .find({ _id: id })
          .populate("products.payload.product");
        return cart;
      } catch (err) {
        throw err;
      }
    }
    async addData(newCart) {
      try {
        const cart = await cartsModel.create(newCart);
        return cart;
      } catch (err) {
        throw err;
      }
    }
    async updateData(id, body) {
      try {
        const cart = await cartsModel.findOneAndUpdate({ _id: id }, body, {
          new: true,
          upsert: true,
        });
        return cart;
      } catch (err) {
        throw err;
      }
    }
  
    async deleteData(id) {
      try {
        await cartsModel.findByIdAndDelete(id);
        return;
      } catch (err) {
        throw err;
      }
    }
  }