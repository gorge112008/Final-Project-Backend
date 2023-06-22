import { MessageDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";

const repoMessage = new DaoRepository(MessageDAO);

const chatController = {
  getMessages: async (req, res) => {
    try {
      let messages = await repoMessage.getData();
      const limit = req.query.limit;
      if (limit && !isNaN(Number(limit))) {
        messages = messages.slice(0, limit);
      }
      res.sendSuccess(200, messages);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  getMessageId: async (req, res) => {
    try {
      const mid = req.params.mid;
      let message = await repoMessage.getDataId(mid);
      res.sendSuccess(200, message);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  addMessage: async (req, res) => {
    try {
      const newMessage = req.body;
      const response = await repoMessage.addData(newMessage);
      res.sendSuccess(200, response);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const mid = req.params.mid;
      await repoMessage.deleteData(mid);
      res.sendSuccess(200, mid);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
};
export default chatController;
