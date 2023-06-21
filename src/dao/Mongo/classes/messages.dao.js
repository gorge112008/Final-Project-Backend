import { messagesModel } from "../models/messages.model.js";

export default class MessageDao {
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
  