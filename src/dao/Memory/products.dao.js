export default class ProductsDao {
  constructor() {
    this.data = { payload: [] };
  }
  async getProducts() {
    return this.data.payload;
  }
  async getProductUnique(query) {
    let product = this.data.payload.find(
      (product) => product.code == query.code
    );
    product ? (product = product) : (product = null);
    return product;
  }
  async getProductId(id) {
    const newProduct = [];
    const product = this.data.payload.find((product) => product._id == id);
    newProduct.push(product);
    return newProduct;
  }

  async addProduct(newProduct) {
    newProduct._id = this.data.payload.length + 1;
    this.data.payload.push(newProduct);
    return newProduct;
  }
  async updateProduct(id, body) {
    let newProduct;
    const index = this.data.payload.findIndex((product) => product._id == id);
    const { status, ...rest } = this.data.payload[index];
    if (!body.code) {
      newProduct = { status: body.status, ...rest };
    } else {
      newProduct = { _id: id, ...body };
    }
    this.data.payload[index] = newProduct;
    return newProduct;
  }
  async deleteProduct(id) {
    const index = this.data.payload.findIndex((product) => product._id == id);
    this.data.payload.splice(index, 1);
    return { id };
  }
}
