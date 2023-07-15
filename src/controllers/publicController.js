let publicProducts, publicMessages, publicCarts;

const publicController = {
  index: (req, res) => {
    res.render("public/index", { isLogin: true, style: "/css/index.css" });
  },
  current: (req, res) => {
    res.render("public/current", { isLogin: true, style: "/css/current.css" });
  },
  login: (req, res) => {
    res.render("public/login", { isLogin: true, style: "/css/login.css" });
  },
  signup: (req, res) => {
    res.render("public/signup", { isLogin: true, style: "/css/signup.css" });
  },
  forgot: (req, res) => {
    res.render("public/forgot", { isLogin: true, style: "/css/forgot.css" });
  },
  recover: (req, res) => {
    res.render("public/recover", { isLogin: true, style: "/css/forgot.css" });
  },
  github: (req, res) => {
    const { msj, role } = req.cookies.login;
    res.clearCookie("login");
    res.render("public/github", { isLogin: true, msj: msj, role: role });
  },
  profile: (req, res) => {
    const resSession = req.session.user;
    res.render("public/profile", {
      role: resSession.role,
      user: resSession.email,
      body: resSession,
      style: "/css/profile.css",
    });
  },
  home: (req, res) => {
    const { role, email } = req.user.user;
    publicProducts = res.locals.resProducts;
    res.render("public/home", {
      role: role,
      user: email,
      body: publicProducts,
    });
  },
  products: (req, res) => {
    const { _id, role, email } = req.user.user;
    publicProducts = { id: _id, products: res.locals.resProducts };
    res.render("public/products", {
      role: role,
      user: email,
      body: publicProducts.products,
    });
  },
  carts: (req, res) => {
    const { _id, role, email } = req.user.user;
    publicCarts = { id: _id, carts: res.locals.resCarts };
    res.render("public/cart", {
      role: role,
      user: email,
      body: publicCarts.carts,
    });
  },
  chat: (req, res) => {
    const { role, email } = req.user.user;
    publicMessages = res.locals.resMessages;
    res.render("public/chat", {
      role: role,
      user: email,
      body: publicMessages,
    });
  }
};

export default publicController;
export { publicProducts, publicMessages, publicCarts };
