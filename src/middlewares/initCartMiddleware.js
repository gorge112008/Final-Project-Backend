import config from "../config/config.js";
import axios from "axios";

const middlewareInitCart = async (req, res, next) => {
  try {
    const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
    const route = req.params.cid
      ? `/api/carts/${req.params.cid}`
      : `/api/users/${req.session.user._id}`;
    const resCarts = await axios.get(`${Url}${route}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    if (req.params.cid) {
      res.locals.resCarts = resCarts.data;
    } else {
      res.locals.resCarts = resCarts.data.carts;
    }
    /*PRUEBA SIN CARTS*/
    //res.locals.resCarts=[];
    next();
  } catch (error) {
    next(error);
  }
};

export default middlewareInitCart;
