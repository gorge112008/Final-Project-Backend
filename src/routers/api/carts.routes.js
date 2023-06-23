import AppRouter from "../router.js";
import cartController from "../../controllers/cartController.js";
import { authEndp } from "../../middlewares/authEndP.js";

export default class CartsRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    /*****************************************************************GET*************************************************************/
    this.getData("/carts", ["PUBLIC"], cartController.getCarts);

    this.getData("/carts/:cid", ["PUBLIC"], cartController.getCartId);

    this.getData("/exceptional/user", ["USER"], authEndp.User,cartController.getAuth);

    //FORK PARA FUTURAS IMPLEMENTACIONES
    /* this.getData("/buyProcess", ["PUBLIC"], async (req, res) => {
      try {
        const child = fork("./src/buyProcess.js");
        child.send("start");
        child.on("message", (message) => {
          console.log("Mensaje del hijo", message);
          res.sendSuccess(200, message);
        });
      } catch (error) {
        res.sendServerError({ error: err });
      }
    });*/

    /*****************************************************************POST*************************************************************/
    this.postData("/carts", ["USER"], cartController.addCart);
    this.postData("/carts/:cid", ["PUBLIC"], cartController.addCartId);
    this.postData(
      "/carts/:cid/products/:pid",
      ["USER"],
      cartController.addCartProductId
    );
    /******************************************************************PUT************************************************************/
    this.updateData("/carts/:cid", ["USER"], cartController.updateCart);
    this.updateData(
      "/carts/:cid/products/:pid",
      ["USER"],authEndp.User,
      cartController.updateCartProductId
    );
    /*****************************************************************DELETE*************************************************************/
    this.deleteData("/carts/:cid/delete", ["USER"],authEndp.User, cartController.deleteCart);
    this.deleteData(
      "/carts/:cid",
      ["USER"],authEndp.User,
      cartController.deleteCartProducts
    );
    this.deleteData(
      "/carts/:cid/products/:pid",
      ["USER"],authEndp.User,
      cartController.deleteCartProductId
    );
  }
}
