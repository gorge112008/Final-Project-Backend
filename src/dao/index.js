// MEMORY PERSISTENCE
import memoryProductsDao from "./Memory/products.dao.js";
import memoryCartDao from "./Memory/carts.dao.js"
//MONGO PERSISTENCE
import mongoCartsDao from "./Mongo/classes/carts.dao.js";
import mongoMessagesDao from "./Mongo/classes/messages.dao.js";
import mongoProductsDao from "./Mongo/classes/products.dao.js";
import mongoUsersDao from "./Mongo/classes/users.dao.js";

const persistence = process.argv[2];

//MEMORY PERSISTENCE
const MemoryProductDao = new memoryProductsDao();
const MemoryCartDao = new memoryCartDao();
//MONGO PERSISTENCE
const MongoCartDao = new mongoCartsDao();
const MongoMessageDao = new mongoMessagesDao();
const MongoProductDao = new mongoProductsDao();
const MongoUserDao = new mongoUsersDao();

//export const CartDAO = MongoCartDao;
export const MessageDAO = MongoMessageDao;
export const UserDAO = MongoUserDao;

//Inicio por default mongo (npm start)
//Iniciar persistencia en memoria (npm start memory)
//Iniciar persistencia en mongo (npm start mongo)
export const ProductDAO =
persistence === "MEMORY" ? MemoryProductDao : MongoProductDao;
export const CartDAO =
persistence === "MEMORY" ? MemoryCartDao : MongoCartDao;
/*PERSISTENCIA EN MEMORIA SOLO ADMITE CRUD*/