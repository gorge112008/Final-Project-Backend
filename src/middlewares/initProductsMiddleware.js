import config from "../config/config.js";
import axios from "axios";
import { generateProduct } from "../utils/generateUsers.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateAxiosErrorInfo } from "../services/errors/info.js";

const middlewareInitProducts = async (req, res, next) => {
  const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
  const route = req.params.pid
    ? `/api/products/${req.params.pid}`
    : `/api/products`;
  try {
    const resProducts = await axios.get(`${Url}${route}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    let productsAutogenerate = [];
    for (let i = 0; i < 10; i++) {
      productsAutogenerate.push(generateProduct());
    }

    req.params.pid
      ? (res.locals.resProducts = resProducts.data)
      : (res.locals.resProducts = resProducts.data.payload);

    /*PRUEBA CON PRODUCTOS AUTOGENERADOS*/
    //res.locals.resProducts = productsAutogenerate;
    /*PRUEBA SIN PRODUCTOS*/
    //res.locals.resProducts=[];
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

export default middlewareInitProducts;
