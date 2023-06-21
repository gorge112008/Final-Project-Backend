import ProductsRouter from "./routers/api/products.routes.js";
import CartsRouter from "./routers/api/carts.routes.js";
import ChatRouter from "./routers/api/chat.routes.js";
import UsersRouter from "./routers/api/users.routes.js";
import ViewsRouter from "./routers/mainRouter.js";
import SessionsRouter from "./routers/api/sessions.routes.js";
import CookiesRouter from "./routers/api/cookies.routes.js";

const usersRouter = new UsersRouter(),
  sessionsRouter = new SessionsRouter(),
  productsRouter = new ProductsRouter(),
  cartsRouter = new CartsRouter(),
  chatRouter = new ChatRouter(),
  cookiesRouter = new CookiesRouter(),
  viewsRouter = new ViewsRouter();

export const routersManager = {
  usersRouter: usersRouter.Routers(),
  sessionsRouter: sessionsRouter.Routers(),
  productsRouter: productsRouter.Routers(),
  cartsRouter: cartsRouter.Routers(),
  chatRouter: chatRouter.Routers(),
  cookiesRouter: cookiesRouter.Routers(),
  viewsRouter: viewsRouter.Routers(),
};
