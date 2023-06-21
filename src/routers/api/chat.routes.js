import AppRouter from "../router.js";
import chatController from "../../controllers/chatController.js";

export default class ChatRouter extends AppRouter {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.getData("/messages", ["PUBLIC"], chatController.getMessages);

    this.getData("/messages/:mid", ["PUBLIC"], chatController.getMessageId);

    /*****************************************************************POST*************************************************************/
    this.postData("/messages", ["PUBLIC"], chatController.addMessage);

    /*****************************************************************DELETE*************************************************************/
    this.deleteData("/messages/:mid", ["PUBLIC"], chatController.deleteMessage);
  }
}
