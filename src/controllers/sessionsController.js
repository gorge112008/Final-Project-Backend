import { generateToken } from "../utils.js";
import SessionDto from "../dao/DTOs/sessionDto.js";
import { senderMail } from "../helpers/sender.js";

const sessionController = {
  getSession: async (req, res) => {
    try {
      if (req.session && req.session.counter) {
        const session = req.session.user;
        const role = session.role;
        const userName = session.first_name;
        req.session.counter++;
        const msj = `WELCOME BACK ${userName.toUpperCase()}, THIS IS YOUR ${
          req.session.counter
        } INCOME.`;
        res.sendSuccess(200, { msj: msj, session: session, role: role });
      } else {
        res.sendUserError(401, { error: `No active session` });
      }
    } catch (error) {
      res.sendServerError({ error: "Error reading session" + error });
    }
  },
  getCurrentSession: async (req, res) => {
    try {
      const { first_name, last_name, age, role } = req.user.user;
      const session = new SessionDto({ first_name, last_name, age, role });
      res.sendSuccess(200, session);
    } catch (error) {
      res.sendServerError({ error: "Error reading session" + error });
    }
  },
  getLogout: async (req, res) => {
    try {
      res.clearCookie("connect.sid");
      res.clearCookie("SessionCookie");
      res.clearCookie("coderCookieToken");
      req.session.destroy((err) => {
        if (err) {
          res.sendServerError({ error: "Error destroying session" + err });
        } else {
          const msj = `YOU HAVE ENDED YOUR SESSION SUCCESSFULLY`;
          res.sendSuccess(200, msj);
        }
      });
    } catch (error) {
      res.sendServerError({ error: "Error destroying session" + error });
    }
  },
  getGitHubSession: async (req, res) => {},
  getGitHubCallBack: async (req, res) => {
    try {
      const session = req.user;
      const role = session.role;
      const userName = session.first_name;
      const msj = `WELCOME ${userName.toUpperCase()}`;
      req.session.counter = 1;
      const login = { msj: msj, role: role };
      const token = generateToken(session);
      res.cookie("coderCookieToken", token, {
        maxAge: 60 * 60 * 1000,
        signed: true,
      });
      res.cookie("login", login);
      res.redirect("/github");
    } catch (error) {
      res.sendServerError({ error: "Not exist any session: " + error });
    }
  },
  postLogin: async (req, res) => {
    try {
      const session = req.user;
      const role = session.role;
      const userName = session.first_name;
      const msj = `WELCOME ${userName.toUpperCase()}`;
      req.session.counter = 1;
      const token = generateToken(session);
      res.cookie("coderCookieToken", token, {
        maxAge: 60 * 60 * 1000,
        signed: true,
      });
      res.sendSuccess(200, {
        success: msj,
        session: session,
        role: role,
        token: token,
      });
    } catch (error) {
      res.sendServerError({ error: "Not exist any session: " + error });
    }
  },
  postSignup: async (req, res) => {
    try {
      if (req.user && !req.user.error) {
        senderMail
          .SenderWelcome(req.user)
          .then((dat) => {
            console.log(dat);
          })
          .catch((err) => console.log(err));
        const msj = {
          success: `Email ${req.user.email} successfully registered`,
        };
        res.sendSuccess(201, msj);
      } else {
        res.sendUserError(401, { error: `Email already registered` });
      }
    } catch (error) {
      res.sendServerError({ error: "Error reading session" + error });
    }
  },
  postForgot: async (req, res) => {
    try {
      senderMail
        .SenderRecover(req.user)
        .then((dat) => {
          res.cookie("RecoveryUser", req.user.email, {
            maxAge: 30 * 60 * 1000,
            signed: true,
          });
          const msj = { success: "Request Submitted successfully" };
          res.sendSuccess(200, msj);
        })
        .catch((err) => {
          res.sendServerError({ error: "Error Request Send" + err });
        });
    } catch (error) {}
  },
  postRecover: async (req, res) => {
    try {
      const msj = { success: "Success!" };
      res.sendSuccess(200, msj);
    } catch (error) {}
  },
  getNotFound: async (req, res) => {
    try {
      res.sendUserError(404, { error: `Route not found` });
    } catch (error) {
      res.sendServerError({ error: "Error reading session" + error });
    }
  },
};

export default sessionController;
