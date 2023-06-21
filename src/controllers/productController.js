//import { ProductDAO } from "../dao/Mongo/classes/DBmanager.js";
import { ProductDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";

const repoProduct = new DaoRepository(ProductDAO);

const productController = {
  getProducts: (req, res) => {
    try {
      const products = res.locals.products;
      res.sendSuccess(200, products);
    } catch (error) {
      res.sendServerError({ error: err });
    }
  },
  getProductId: async (req, res) => {
    try {
      const pid = req.params.pid;
      let product = await repoProduct.getDataId(pid);
      res.sendSuccess(200, product);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  addProduct: async (req, res) => {
    try {
      const newProduct = req.body;
      let response = await repoProduct.addData(newProduct);
      res.sendSuccess(200, response);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const pid = req.params.pid;
      const body = req.body;
      let response = await repoProduct.updateData(pid, body);
      res.sendSuccess(200, response);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const pid = req.params.pid;
      await repoProduct.deleteData(pid);
      res.sendSuccess(200, pid);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
};
export default productController;
