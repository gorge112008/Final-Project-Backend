export default class CartsDao {
  constructor() {
    this.data = [];
  }

  async getCarts() {
    return this.data;
  }

  async getCartId(id) {
    const findCart = [];
    let cart = this.data.find((cart) => cart._id == id);
    cart && findCart.push(cart);
    return findCart;
  }

  async addCart(newCart) {
    newCart._id = this.data.length + 1;
    let int = 0;
    do {
      int++;
      newCart._id = this.data.length + int;
    } while (this.data.find((cart) => cart._id == newCart._id));

    this.data.push(newCart);
    return newCart;
  }
  async updateCart(id, body) {
    const index = this.data.findIndex((c) => c._id == id);
    this.data[index] = body;
    return body;
  }
  async deleteCart(id) {
    console.log("LLEGA +" + id);
    const index = this.data.findIndex((c) => c._id == id);
    this.data.splice(index, 1);
    return { id };
  }
}
