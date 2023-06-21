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
      passportInit("github"),
      auth,
      sessionController.getGitHubCallBack
    );

    this.postData(
      "/sessions/login",
      ["PUBLIC"],
      passportInit("login"),
      auth,
      sessionController.postLogin
    );
    this.postData(
      "/sessions/signup",
      ["PUBLIC"],
      passportInit("signup"),
      sessionController.postSignup
    );
    this.postData(
      "/sessions/forgot",
      ["PUBLIC"],
      passportInit("forgot"),
      sessionController.postForgot
    );
    this.getData("*", sessionController.getNotFound);
  }
}
