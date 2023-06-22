import { ProductDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";

const repoProduct = new DaoRepository(ProductDAO);

const UniqueGetProduct = async (req, res, next) => {
  try {
    const query = req.query; // Valor predeterminado de 10
    const product = await repoProduct.getDataUnique(query);
    res.locals.products = product;
    next();
  } catch (error) {
    next(error);
  }
};

export default UniqueGetProduct;
