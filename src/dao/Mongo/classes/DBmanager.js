import { productsModel } from "../models/products.model.js";
import { cartsModel } from "../models/carts.model.js";
import { messagesModel } from "../models/messages.model.js";
import { userModel } from "../models/users.model.js";

/*********************************************************PRODUCTS*************************************************************/

class ProductDao {
  async getData({ limit, page, sort, query }) {
    try {
      let products;
      products = await productsModel.paginate(query, { limit, page, sort });
      return products;
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
  async updateData(id, body) {
    try {
      const product = await productsModel.findOneAndUpdate({ _id: id }, body, {
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

/*********************************************************CARTS*************************************************************/

class CartDao {
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
  async addData(newProduct) {
    try {
      const cart = await cartsModel.create(newProduct);
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

/*********************************************************MESSAGES*************************************************************/

class MessageDao {
  async getData() {
    try {
      const messages = await messagesModel.find();
      return messages;
    } catch (err) {
      throw err;
    }
  }
  async getDataId(id) {
    try {
      const message = await messagesModel.find({ _id: id });
      return message;
    } catch (err) {
      throw err;
    }
  }
  async addData(newMessage) {
    try {
      const message = await messagesModel.create(newMessage);
      return message;
    } catch (err) {
      throw err;
    }
  }
  async updateData(id, body) {
    try {
      const message = await messagesModel.findOneAndUpdate({ _id: id }, body, {
        new: true,
        upsert: true,
      });
      return message;
    } catch (err) {
      throw err;
    }
  }

  async deleteData(id) {
    try {
      await messagesModel.findByIdAndDelete(id);
      return;
    } catch (err) {
      throw err;
    }
  }
}

/*********************************************************USERS*************************************************************/

class UserDao {
  async getData() {
    try {
      const Users = await userModel.find();
      return Users;
    } catch (err) {
      throw err;
    }
  }

  async getDataUnique(query) {
    try {
      const User = await userModel.findOne(query);
      return User;
    } catch (err) {
      throw err;
    }
  }

  async getDataId(id) {
    try {
      const User = await userModel.findOne({ _id: id }).populate("cart");
      return User;
    } catch (err) {
      throw err;
    }
  }
  async getDatabyEmail(email) {
    try {
      const User = await userModel.findOne({ email: email });
      return User;
    } catch (err) {
      throw err;
    }
  }
  async addData(newUser) {
    try {
      const response = await userModel.create(newUser);
      return response;
    } catch (err) {
      throw err;
    }
  }
  async updateData(email, body) {
    try {
      const User = await userModel.findOneAndUpdate({ email: email }, body, {
        new: true,
        upsert: true,
      });
      return User;
    } catch (err) {
      throw err;
    }
  }

  async deleteData(id) {
    try {
      await userModel.findByIdAndDelete(id);
      return;
    } catch (err) {
      throw err;
    }
  }
}

/*********************************************************EXPORTS*************************************************************/

export const ProductDAO = new ProductDao();
export const CartDAO = new CartDao();
export const MessageDAO = new MessageDao();
export const UserDAO = new UserDao();
