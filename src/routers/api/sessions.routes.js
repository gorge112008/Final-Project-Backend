import AppRouter from "../router.js";
import auth from "../../middlewares/authMiddleware.js";
import { passportCall, passportCurrent, passportInit } from "../../utils.js";
import sessionController from "../../controllers/sessionsController.js";

export default class SessionsRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.getSession(
      "/sessions/session",
      ["PUBLIC"],
      sessionController.getSession
    );

    this.getSession(
      "/sessions/current",
      ["PUBLIC"],
      passportCurrent("jwt"),
      sessionController.getCurrentSession
    );

    this.getData(
      "/sessions/faillogin",
      ["PUBLIC"],
      sessionController.getFailLogin
    );

    this.getData(
      "/sessions/failregister",
      ["PUBLIC"],
      sessionController.getFailRegister
    );

    this.getData(
      "/sessions/failforgot",
      ["PUBLIC"],
      sessionController.getFailForgot
    );

    this.getData("/sessions/logout", ["PUBLIC"], sessionController.getLogout);

    this.getData(
      "/sessions/github",
      ["PUBLIC"],
      passportInit("github", {
        scope: ["user:email"],
      }),
      sessionController.getGitHubSession
    );
    this.getData(
      "/sessions/githubcallback",
      ["PUBLIC"],
      passportInit("github", {
        failureRedirect: "/login",
      }),
      auth,
      sessionController.getGitHubCallBack
    );

    this.postData(
      "/sessions/login",
      ["PUBLIC"],
      passportInit("login", {
        failureRedirect: "/api/sessions/faillogin",
      }),
      auth,
      sessionController.postLogin
    );
    this.postData(
      "/sessions/signup",
      ["PUBLIC"],
      passportInit("signup", {
        failureRedirect: "/api/sessions/failregister",
      }),
      auth,
      sessionController.postSignup
    );
    this.postData(
      "/sessions/forgot",
      ["PUBLIC"],
      passportInit("forgot", {
        failureRedirect: "/api/sessions/failforgot",
      }),
      auth,
      sessionController.postForgot
    );
    this.getData("*", sessionController.getNotFound);
  }
}
