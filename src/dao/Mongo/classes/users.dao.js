import { userModel } from "../models/users.model.js";

export default class UserDao {
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
      const User = await userModel.findOne({ _id: id }).populate("carts.cart");
      return User;
    } catch (err) {
      throw err;
    }
  }
  async getDatabyEmail(email) {
    try {
      const User = await userModel.findOne({ email: email }).populate("carts.cart");
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
  async updateData(query, body) {
    try {
      const User = await userModel.findOneAndUpdate(query, body, {
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
