import AppRouter from "../router.js";
import testController from "../../controllers/testController.js";

export default class TestRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.getTest(
        "/test/user",
        testController.test
        );
  }
}
