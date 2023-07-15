import { UserDAO, CartDAO, ProductDAO, TicketDAO } from "../dao/index.js";
import DaoRepository from "../repository/DaoRepository.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import {
  generateCartErrorInfo,
  generateAuthErrorInfo,
} from "../services/errors/info.js";

const repoProduct = new DaoRepository(ProductDAO);
const repoCart = new DaoRepository(CartDAO);
const repoUser = new DaoRepository(UserDAO);
const repoTicket = new DaoRepository(TicketDAO);

const cartController = {
  getCarts: async (req, res, next) => {
    try {
      let carts = await repoCart.getData();
      if (!carts) {
        CustomError.createError({
          name: "NotFoundError",
          cause: "Carts not found in the database",
          message: "Get carts request failed",
          code: EErrors.NOT_FOUND_ERROR,
        });
      }
      res.sendSuccess(200, carts);
    } catch (error) {
      next(error);
    }
  },
  getCartId: async (req, res, next) => {
    try {
      const cid = req.params.cid;
      if (!cid || typeof cid !== "string" || cid.length < 1) {
        CustomError.createError({
          name: "BadRequestError",
          cause: `Cid is not valid, it must be a alphanumeric and valid string, received: ${cid}`,
          message: "Get cartbyID request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      let cart = await repoCart.getDataId(cid);
      if (!cart) {
        CustomError.createError({
          name: "NotFoundError",
          cause: "Cart not found in the database",
          message: "Get cartbyID request failed",
          code: EErrors.NOT_FOUND_ERROR,
        });
      }
      res.sendSuccess(200, cart);
    } catch (error) {
      next(error);
    }
  },
  getAuth: async (req, res) => {
    try {
      res.sendSuccess(200, req.session.user);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  addCart: async (req, res, next) => {
    try {
      const newCart = req.body;
      if (!newCart.products) {
        CustomError.createError({
          name: "BadRequestError",
          cause: generateCartErrorInfo({ newCart }),
          message: "Create newcart request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      const sessionUser = req.session.user;
      if (!sessionUser) {
        CustomError.createError({
          name: "AuthenticationError",
          cause: generateAuthErrorInfo({ sessionUser }),
          message: "Authentication request failed",
          code: EErrors.AUTHENTICATION_ERROR,
        });
      }
      const user = await repoUser.getDataId(sessionUser._id);
      const response = await repoCart.addData(newCart);
      user.carts.push({ cart: response._id });
      repoUser.updateData({ _id: sessionUser._id }, user);
      res.sendSuccess(200, response);
    } catch (error) {
      next(error);
    }
  },
  addCartId: async (req, res, next) => {
    try {
      const cid = req.params.cid;
      if (!cid || typeof cid !== "string" || cid.length < 1) {
        CustomError.createError({
          name: "BadRequestError",
          cause: `Cid is not valid, it must be a alphanumeric and valid string, received: ${cid}`,
          message: "Add cartbyID request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      const reqProducts = req.body;
      if (!reqProducts.products) {
        CustomError.createError({
          name: "BadRequestError",
          cause: generateCartErrorInfo({ reqProducts }),
          message: "Create newcart request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      const newProducts = reqProducts.products;
      let productsFind = [];
      if (newProducts[0].payload) {
        newProducts[0].payload.forEach((productItem) => {
          if (productItem._id) {
            let find = 0;
            productsFind.forEach((findItem) => {
              if (productItem._id == findItem.product) {
                findItem.quantity++;
                find = 1;
              }
            });
            if (find == 0) {
              productsFind.push({ product: productItem._id, quantity: 1 });
            }
          }
        });
        newProducts[0].payload = productsFind;
        reqProducts.products = newProducts[0];
        const response = await repoCart.updateData({ _id: cid }, reqProducts);
        res.sendSuccess(200, response);
      } else {
        res.sendUserError(400, {
          error: "Bad Request--> The cart is not valid",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  addCartProductId: async (req, res, next) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      if (!cid || typeof cid !== "string" || cid.length < 1) {
        CustomError.createError({
          name: "BadRequestError",
          cause: `Cart id is not valid, it must be a alphanumeric and valid string, received: ${cid}`,
          message: "Add productCartbyID request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      if (!pid || typeof pid !== "string" || pid.length < 1) {
        CustomError.createError({
          name: "BadRequestError",
          cause: `Product id is not valid, it must be a alphanumeric and valid string, received: ${pid}`,
          message: "Add productCartbyID request failed",
          code: EErrors.BAD_REQUEST_ERROR,
        });
      }
      const responsecid = await repoCart.getDataId(cid);
      const responsepid = await repoProduct.getDatatId(pid);
      if (!isNaN(responsepid) || !isNaN(responsecid)) {
        res.sendUserError(400, { error: `Error --> The route is not valid` });
      } else {
        //SI EL ARREGLO TIENE LA ID DEL CARRITO SE ENTRA
        let find = 0;
        const cartProducts = responsecid[0].products;
        cartProducts[0].payload.forEach((productItem) => {
          if (productItem.product._id == pid) {
            //SI EL PRODUCTO TIENE LA ID REPETIDA SE SUMA
            productItem.quantity++;
            find = 1;
            res.sendSuccess(200, {
              msj: "Product Added to Cart Successfully!!!",
            });
          }
        });
        if (find == 0) {
          cartProducts[0].payload.push({
            product: responsepid[0]._id,
            quantity: 1,
          });
          res.sendSuccess(200, {
            msj: "Product Added to Cart Successfully!!!",
          });
        }
        const updateProducts = { products: cartProducts[0] };
        await repoCart.updateData({ _id: cid }, updateProducts);
      }
    } catch (error) {
      next(error)
    }
  },
  purchaseCart: async (req, res) => {
    try {
      const data = req.body;
      const response = repoTicket.addData(data);
      res.sendSuccess(200, response);
      /*const stock = req.body.stock;
      const quantity = req.body.quantity;
      const cid = req.params.cid;
      const pid = req.params.pid;
      let ProductAdd;
      const responsecid = await repoCart.getDataId(cid);
      const responsepid = await repoProduct.getDataId(pid);
      if (!isNaN(responsepid) || !isNaN(responsecid)) {
        res.sendUserError(404, { error: `Error --> The route is not valid` });
      } else {
        //SI EL ARREGLO TIENE LA ID DEL CARRITO SE ENTRA
        let find = 0;
        const cartProducts = responsecid[0].products;
        cartProducts[0].payload.forEach((productItem) => {
          if (productItem.product._id == pid) {
            //SI EL PRODUCTO TIENE LA ID REPETIDA SE SUMA
            let msj = "NULL ACTION";
            if (stock > 0) {
              productItem.quantity += +stock;
              ProductAdd = productItem;
              msj = { msj: "Product Added to Cart Successfully!!!" };
            } else if (quantity > 0) {
              productItem.quantity -= +quantity;
              msj = { msj: "Product Deleted of Cart Successfully!!!" };
            }
            find = 1;
            res.sendSuccess(200, msj);
          }
        });
        if (find == 0) {
          let msj = "NULL ACTION";
          if (stock > 0) {
            cartProducts[0].payload.push({
              product: responsepid[0]._id,
              quantity: stock,
            });
            //CartsMG.addProduct({
            //  product: responsepid[0]._id,
           //   quantity: stock,
           // });
            msj = { msj: "Product Added to Cart Successfully!!!" };
          } else if (quantity > 0) {
            msj = { msj: "Product Added to Cart Failed - No stock" };
          }
          res.sendSuccess(200, msj);
        }
        const updateProducts = { products: cartProducts[0] };
        await repoCart.updateData({ _id: cid }, updateProducts);
        //const da= CartsMG.addProduct(ProductAdd);
        //console.log("SOLO MANDA MSJ"+JSON.stringify(da));
      }*/
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  updateCart: async (req, res) => {
    try {
      const cid = req.params.cid;
      const { status, payload } = req.body;
      let cart = await repoCart.getDataId(cid);
      const newPayload = payload ? payload : cart[0].products[0].payload;
      cart[0].products = [{ status: status, payload: newPayload }];
      const response = await repoCart.updateData({ _id: cid }, cart[0]);
      res.sendSuccess(200, response);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  updateCartProductId: async (req, res) => {
    try {
      const stock = req.body.stock;
      const quantity = req.body.quantity;
      const cid = req.params.cid;
      const pid = req.params.pid;
      const responsecid = await repoCart.getDataId(cid);
      const responsepid = await repoProduct.getDataId(pid);
      if (!isNaN(responsepid) || !isNaN(responsecid)) {
        res.sendUserError(404, { error: `Error --> The route is not valid` });
      } else {
        //SI EL ARREGLO TIENE LA ID DEL CARRITO SE ENTRA
        let find = 0;
        const cartProducts = responsecid[0].products;
        cartProducts[0].payload.forEach(async (productItem) => {
          if (productItem.product._id == pid) {
            //SI EL PRODUCTO TIENE LA ID REPETIDA SE SUMA
            let msj = "NULL ACTION";
            if (stock > 0) {
              productItem.quantity += +stock;
              msj = { msj: "Product Added to Cart Successfully!!!" };
            } else if (quantity > 0) {
              productItem.quantity -= +quantity;
              msj = { msj: "Product Deleted of Cart Successfully!!!" };
            }
            find = 1;
            const updateProducts = { products: cartProducts[0] };
            await repoCart.updateData({ _id: cid }, updateProducts);
            res.sendSuccess(200, msj);
          }
        });
        if (find == 0) {
          let msj = "NULL ACTION";
          if (stock > 0) {
            cartProducts[0].payload.push({
              product: responsepid[0]._id,
              quantity: stock,
            });
            msj = { msj: "Product Added to Cart Successfully!!!" };
          } else if (quantity > 0) {
            msj = { msj: "Product Added to Cart Failed - No stock" };
          }
          const updateProducts = { products: cartProducts[0] };
          await repoCart.updateData({ _id: cid }, updateProducts);
          res.sendSuccess(200, msj);
        }
      }
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { _id } = req.session.user;
      const user = await repoUser.getDataId(_id);
      const cid = req.params.cid;
      user.carts = user.carts.filter((cart) => cart.cart._id != cid);
      repoUser.updateData({ _id: _id }, user);
      await repoCart.deleteData(cid);
      res.sendSuccess(200, { msj: "DELETED CART SUCCESSFULLY" });
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
  deleteCartProducts: async (req, res) => {
    try {
      const cid = req.params.cid;
      let cart = await repoCart.getDataId(cid);
      cart[0].products = [{ status: "sucess", payload: [] }];
      const response = await repoCart.updateData({ _id: cid }, cart[0]);
      res.sendSuccess(200, response);
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },

  deleteCartProductId: async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const arrayCarts = await repoCart.getData();
      arrayCarts.forEach(async (cartItem) => {
        if (cartItem._id == cid) {
          //SI EL ARREGLO TIENE LA ID DEL CARRITO SE ENTRA
          const cartProducts = cartItem.products;
          const payloadProducts = cartProducts[0].payload;
          const newPayload = [];
          payloadProducts.forEach((productItem) => {
            if (productItem.product == null || productItem.product == pid) {
            } else {
              newPayload.push(productItem);
            }
          });
          newPayload != [] && payloadProducts == newPayload;
          cartProducts[0].payload = newPayload;
          const updateProducts = { products: cartProducts[0] };
          await repoCart.updateData({ _id: cid }, updateProducts);
          res.sendSuccess(200, { msj: "DELETED SUCCESSFULLY" });
        }
      });
    } catch (err) {
      res.sendServerError({ error: err });
    }
  },
};
export default cartController;
