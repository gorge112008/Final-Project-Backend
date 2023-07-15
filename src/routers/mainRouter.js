import AppRouter from "./router.js";
import middlewareInitProducts from "../middlewares/initProductsMiddleware.js";
import middlewareInitMessages from "../middlewares/initMessagesMiddleware.js";
import middlewareInitCart from "../middlewares/initCartMiddleware.js";
import validateSession from "../middlewares/validateSessionMiddleware.js";
import publicController from "../controllers/publicController.js";
import privateController from "../controllers/privateController.js";
import { passportCall } from "../utils.js";
import { generateUser } from "../utils/generateUsers.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";

export default class ViewsRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.getRoute("/loggerTest", ["PUBLIC"], (req, res, next) => {
      try {
        let users = [];
        for (let i = 0; i < 10; i++) {
          users.push(generateUser());
        }
        req.logger.debug("Testeando el logger, debug");
        req.logger.info("Testeando el logger, info");
        req.logger.http("Testeando el logger, http");
        req.logger.warning("Testeando el logger, warning");
        req.logger.error("Testeando el logger, error");
        req.logger.fatal("Testeando el logger, fatal");
        if (users.length < 1) {
          CustomError.createError({
            name: "InternalServerError",
            cause: `Error generating users`,
            message: "Failed generated users",
            code: EErrors.INTERNAL_SERVER_ERROR,
          });
        }
        res.send({
          status: "ok",
          count: users.length,
          data: users,
        });
      } catch (error) {
        next(error);
      }
    });

    this.getRoute("/opsencilla", ["PUBLIC"], (req, res, next) => {
      try {
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
          sum += i;
        }
        res.send({ message: "Operación sencilla", result: sum });
      } catch (error) {
        next(error);
      }
    });

    this.getRoute("/opcompleja", ["PUBLIC"], (req, res, next) => {
      try {
        let sum = 0;
        for (let i = 0; i < 5e8; i++) {
          sum += i;
        }
        res.send({ message: "Operación compleja", result: sum });
      } catch (error) {
        next(error);
      }
    });

    this.getRoute("/", ["PUBLIC"], publicController.login);

    this.getRoute("/current", ["PUBLIC"], publicController.current);

    this.getRoute("/login", ["PUBLIC"], publicController.login);

    this.getRoute("/signup", ["PUBLIC"], publicController.signup);

    this.getRoute("/forgot", ["PUBLIC"], publicController.forgot);

    this.getRoute("/recover", ["PUBLIC"], publicController.recover);

    this.getRoute("/github", ["PUBLIC"], publicController.github);

    this.getRoute(
      "/profile",
      ["USER"],
      validateSession,
      publicController.profile
    );

    this.getRoute(
      "/home",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitProducts,
      publicController.home
    );

    this.getRoute(
      "/realtimeproducts",
      ["ADMIN"],
      passportCall("jwt"),
      middlewareInitProducts,
      privateController.realtimeproducts
    );

    this.getRoute(
      "/realtimeproducts/:pid",
      ["ADMIN"],
      passportCall("jwt"),
      middlewareInitProducts,
      privateController.realtimeproducts
    );

    this.getRoute(
      "/products",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitProducts,
      publicController.products
    );

    this.getRoute(
      "/products/:pid",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitProducts,
      publicController.products
    );

    this.getRoute(
      "/cart",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitCart,
      publicController.carts
    );

    this.getRoute(
      "/cart/:cid",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitCart,
      publicController.carts
    );

    this.getRoute(
      "/chat",
      ["PUBLIC"],
      passportCall("jwt"),
      middlewareInitMessages,
      publicController.chat
    );
  }
}
