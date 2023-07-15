import express from "express";
import compression from "express-compression";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import path from "path";
import Handlebars from "handlebars";
import MongoSingleton from "./utils/mongoSingletonClass.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import errorHandler from "./middlewares/errors/index.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { routersManager } from "./routers.js";
import { initializePassport } from "./config/passport.config.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { addLogger } from "./utils/logger.js";

const { DB_USER, DB_PASS, CONNECTION_URL } = config.mongo;

const app = express(); //Crear una aplicacion express

/*app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
  })
);*/
app.use(addLogger);
app.use(cors());
app.use(
  compression({
    brotli: { enabled: true },
    zlib: {},
  })
);
app.use(cookieParser("S3cr3tC0d3r"));
app.use(logger("dev"));
app.use(
  session({
    secret: "S3cr3tC0d3r",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: CONNECTION_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 600, //Segundos que dura la sesion activa (10 minutos).
    }),
  })
);
app.use(express.json()); //Configurar el servidor para que pueda entender los formatos JSON
app.use(express.urlencoded({ extended: true })); //Configurar el servidor para que pueda entender los formatos URL Encoded
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routersManager.viewsRouter);
app.use(
  "/api",
  routersManager.testRouter,
  routersManager.productsRouter,
  routersManager.cartsRouter,
  routersManager.chatRouter,
  routersManager.usersRouter,
  routersManager.cookiesRouter,
  routersManager.sessionsRouter,
);
app.use(errorHandler);

/*********************************************************************** */
//    RUTA CUSTOM PARA REVISAR TOKEN JWT DE USUARIO ACTUAL.
//    localhost:8080/api/sessions/custom
/*********************************************************************** */

app.engine(
  //Configurar el servidor para que pueda entender el motor de plantillas
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars), //Permitir el acceso a los prototipos de Handlebars
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public"))); //Configurar el servidor para que pueda entender la ruta de los archivos estaticos

const environment = async () => {
  await MongoSingleton.getInstance(CONNECTION_URL);
};

const isValidStartDate = () => {
  if (DB_USER && DB_PASS) return true;
  else return false;
};

isValidStartDate() && environment() && initializePassport(passport); //Si las credenciales de la base de datos son validas, se inicia la aplicacion

export default app;
