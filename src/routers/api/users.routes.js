import AppRouter from "../router.js";
import userController from "../../controllers/userController.js";

export default class UsersRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.getData("/users", ["PUBLIC"], userController.getUsers);

    this.getData("/users/:iud", ["PUBLIC"], userController.getUserId);

    /*****************************************************************POST*************************************************************/
    this.postData("/users", ["PUBLIC"], userController.addUser);

    /*****************************************************************DELETE*************************************************************/
    this.deleteData("/users/:iud", ["PUBLIC"], userController.deleteUser);
  }
}
