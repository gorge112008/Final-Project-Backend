import winston from "winston";
import * as dotenv from "dotenv";

dotenv.config();

const ENVIROMENT = process.env.NODE_ENV;

//LOGGER SIN CONDICIONES
/*const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "http",
    }),
    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});*/

//LOGGER CON COLORES
const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "magenta",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "cyan",
  },
};

//LOGER CON CONDICIONES
const logger =
  ENVIROMENT === "production"
    ? winston.createLogger({
        transports: [
          new winston.transports.Console({
            level: "info",
          }),
          new winston.transports.File({
            filename: "logs/warn.log",
            level: "warn",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            ),
          }),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            ),
          }),
        ],
      })
    : winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
          new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
              winston.format.colorize({
                all: true,
                colors: customLevelsOptions.colors,
              }),
              winston.format.simple()
            ),
          }),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.simple(),
          }),
        ],
      });

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.info(`${req.method} en ${req.url}- ${new Date().toISOString()}`);
  /*req.logger.debug("Testeando el logger, debug");
      req.logger.info("Testeando el logger, info");
      req.logger.http("Testeando el logger, http");
      req.logger.warning("Testeando el logger, warning");
      req.logger.error("Testeando el logger, error");
      req.logger.fatal("Testeando el logger, fatal");*/
  next();
};
