//import { ProductDAO } from "../dao/Mongo/classes/DBmanager.js";
import { ProductDAO } from "../dao/index.js";

const UniqueGetProduct = async (req, res, next) => {
  try {
    const query = req.query; // Valor predeterminado de 10
    const product = await ProductDAO.getProductUnique(query);
    res.locals.products = product;
    next();
  } catch (error) {
    next(error);
  }
};

export default UniqueGetProduct;
