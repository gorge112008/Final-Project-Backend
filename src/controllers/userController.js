import { UserDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";

const repoUser = new DaoRepository(UserDAO);

const userController = {
  getUsers: async (req, res) => {
    try {
        const limit = req.query.limit;
        const query = req.query;
        let users =
          Object.keys(query).length > 0
            ? await repoUser.getDataUnique(query)
            : await repoUser.getData();
        if (limit && !isNaN(Number(limit))) {
          users = users.slice(0, limit);
        }
        res.sendSuccess(200, users);
      } catch (err) {
        res.sendServerError({ error: err });
      }
  },
  getUserId: async (req, res) => {
    try {
        const iud = req.params.iud;
        let user = await repoUser.getDataId(iud);
        res.sendSuccess(200, user);
      } catch (err) {
        res.sendServerError({ error: err });
      }
  },
  addUser: async (req, res) => {
    try {
        const newUser = req.body;
        const response = await repoUser.addData(newUser);
        res.sendSuccess(200, response);
      } catch (err) {
        res.sendServerError({ error: err });
      }
  },
  updateUser: async (req, res) => {
    try {
        const iud = req.params.iud;
        const reqUser = req.body;
        const response = await repoUser.updateData({_id:iud}, reqUser);
        res.sendSuccess(200, response);
      } catch (err) {
        res.sendServerError({ error: err });
      }
  },
  deleteUser: async (req, res) => {
    try {
        const iud = req.params.iud;
        await repoUser.deleteData(iud);
        res.sendSuccess(200, iud);
      } catch (err) {
        res.sendServerError({ error: err });
      }
  },
};
export default userController;
