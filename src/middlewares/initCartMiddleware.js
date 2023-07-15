import config from "../config/config.js";
import axios from "axios";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateAxiosErrorInfo } from "../services/errors/info.js";

const middlewareInitCart = async (req, res, next) => {
  const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
  const route = req.params.cid
    ? `/api/carts/${req.params.cid}`
    : `/api/users/${req.session.user._id}`;
  try {
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
    if (error.isAxiosError) {
      const customError = CustomError.createError({
        name: "AxiosError",
        cause: generateAxiosErrorInfo({ route }),
        message: "Axios request failed",
        code: EErrors.API_ERROR,
      });
      next(customError);
    } else {
      next(error);
    }
  }
};

export default middlewareInitCart;
