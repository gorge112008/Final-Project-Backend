import dotenv from "dotenv";
import {Command} from "commander";

const program = new Command();

program.option("--mode <mode>", "Execution mode", "development");
program.parse();

const environment = program.opts().mode;

dotenv.config({
  path: environment === "development" ? ".env" : ".env.prod",
});

dotenv.config();

const { USER_MONGO, PASS_MONGO, DB_MONGO, PORT } = process.env;

export default {
  mongo: {
    port: PORT || 8080,
    DB_USER: USER_MONGO,
    DB_PASS: PASS_MONGO,
    DB_NAME: DB_MONGO,
    CONNECTION_URL: `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@codercluster.xq93twh.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`,
  },
};
