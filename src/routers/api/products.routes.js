import AppRouter from "../router.js";
import middlewareGetProducts from "../../middlewares/getProductsMiddleware.js";
import UniqueGetProduct from "../../middlewares/getUniqueProduct.js";
import productController from "../../controllers/productController.js";

export default class ProductsRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    /*****************************************************************GET****************************************************************/
    this.getData(
      "/productOne",
      ["PUBLIC"],
      UniqueGetProduct,
      productController.getProducts
    );
    this.getData(
      "/products",
      ["PUBLIC"],
      middlewareGetProducts,
      productController.getProducts
    );
    this.getData("/products/:pid", ["PUBLIC"], productController.getProductId);

    /*****************************************************************POST***************************************************************/
    this.postData("/products", ["USER"],productController.addProduct);

    /*****************************************************************DELETE*************************************************************/
    this.updateData(
      "/products/:pid",
      ["USER"],
      productController.updateProduct
    );

    /*****************************************************************DELETE*************************************************************/
    this.deleteData(
      "/products/:pid",
      ["USER"],
      productController.deleteProduct
    );
  }
}
