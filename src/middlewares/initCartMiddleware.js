import config from "../config/config.js";
import axios from "axios";

const middlewareInitCart = async (req, res, next) => {
  try {
    const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
    const route = req.params.cid
      ? `/api/carts/${req.params.cid}`
      : `/api/carts`;
    const resCarts = await axios.get(`${Url}${route}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    /*const route2 = `/api/users/${req.session.user._id}`;
    const reUser = await axios.get(`${Url}${route2}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });

    console.log("REVISAR USUARIO" + JSON.stringify(reUser.data));*/
    res.locals.resCarts = resCarts.data;
    /*PRUEBA SIN CARTS*/
    //res.locals.resCarts=[];
    next();
  } catch (error) {
    next(error);
  }
};

export default middlewareInitCart;
