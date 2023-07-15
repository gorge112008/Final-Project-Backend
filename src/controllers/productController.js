import { ProductDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateProductErrorInfo } from "../services/errors/info.js";

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
  addProduct: async (req, res, next) => {
    try {
      const newProduct = req.body;
      if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.status || !newProduct.stock || !newProduct.category || !newProduct.price) {
        CustomError.createError({
          name: "BadRequestError",
          cause: generateProductErrorInfo(newProduct),
          message: "Create newproduct request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      let response = await repoProduct.addData(newProduct);
      res.sendSuccess(200, response);
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const pid = req.params.pid;
      const body = req.body;
      let response = await repoProduct.updateData({_id: pid}, body);
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
