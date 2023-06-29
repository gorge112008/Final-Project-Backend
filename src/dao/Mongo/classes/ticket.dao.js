import { ticketModel } from "../models/ticket.model.js";

export default class TicketDao {
    async getData() {
      try {
        const ticket = await ticketModel.find();
        return ticket;
      } catch (err) {
        throw err;
      }
    }
    async getDataId(id) {
      try {
        const ticket = await ticketModel
          .find({ _id: id })
          .populate("purchaser.email");
        return ticket;
      } catch (err) {
        throw err;
      }
    }
    async addData(newTicket) {
      try {
        const ticket = await ticketModel.create(newTicket);
        return ticket;
      } catch (err) {
        throw err;
      }
    }
    async updateData(query, body) {
      try {
        const ticket = await ticketModel.findOneAndUpdate(query, body, {
          new: true,
          upsert: true,
        });
        return ticket;
      } catch (err) {
        throw err;
      }
    }
  
    async deleteData(id) {
      try {
        await ticketModel.findByIdAndDelete(id);
        return;
      } catch (err) {
        throw err;
      }
    }
  }