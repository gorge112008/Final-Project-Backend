import config from "../config/config.js";
import axios from "axios";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateAxiosErrorInfo } from "../services/errors/info.js";

const middlewareInitMessages = async (req, res, next) => {
  const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
  const route = `/api/messages`;
  try {
    const resMessages = await axios.get(`${Url}${route}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    res.locals.resMessages = resMessages.data;
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

export default middlewareInitMessages;
