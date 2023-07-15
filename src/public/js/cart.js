/*CART*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
const socket = io();
let URLorigin = window.location.origin,
  UrlP = URLorigin + "/api/products",
  UrlC = URLorigin + "/api/carts",
  UrlU = URLorigin + "/api/users",
  UrlCook = URLorigin + "/api/";
UrlException = URLorigin + "/api/exceptional/";
let opc = "static";
let btnRemove,
  btnCloseView,
  btnRemoveCart,
  btnTransferCart,
  btnPurchaseCart,
  options,
  sessionUserID;
let storeCarts = [],
  storeProducts = [],
  resExo = [],
  dataProducts = [],
  ListCarts = [];
let query = {};

const staticContain = document.querySelector(".static__container--cart"),
  titleCart = document.querySelector(".static__titleCart"),
  containCart = document.querySelector(".container__cart"),
  purchaseCart = document.querySelector(".purchaseCart"),
  purchaseWarn = document.querySelector(".purchaseWarn");

/*****************************************************************CLASES*************************************************************/

class NewCart {
  constructor() {
    this.products = [{ status: "success", payload: [] }];
  }
}

class NewDataCart {
  constructor() {
    this.payload = [];
  }
}

class SuccessPurchase {
  constructor(totalPurchase, email) {
    this.amount = totalPurchase;
    this.purchaser = { email: email };
  }
}

/*****************************************************************FUNCIONES*************************************************************/
async function authExceptional(role) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(UrlException + role, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

/*async function createListStock(stock) {
  let optListStock = [];
  for (let i = 1; i <= stock; i++) {
    optListStock[i] = i.toString();
  }
  return optListStock;
}*/

async function validAddProduct(idCart, idProduct) {
  const currentCart = await getDataCartsbyID(idCart);
  const currentProduct = currentCart[0].products[0].payload.filter(
    (product) => product.product._id == idProduct
  );
  let maxStock;
  currentProduct[0].product.stock >= 20
    ? (maxStock = 20)
    : (maxStock = currentProduct[0].product.stock);
  let stockAvaliable = maxStock - currentProduct[0].quantity;
  let optListStock = [];
  for (let i = 1; i <= stockAvaliable; i++) {
    optListStock[i] = i.toString();
  }
  if (optListStock.length < 1) {
    optListStock = null;
  }
  return { productSelect: currentProduct, listStock: optListStock };
}

async function validDelProduct(idCart, idProduct) {
  const currentCart = await getDataCartsbyID(idCart);
  const currentProduct = currentCart[0].products[0].payload.filter(
    (product) => product.product._id == idProduct
  );

  let quantityAvaliable = currentProduct[0].quantity;
  let optListStock = [];
  for (let i = 1; i <= quantityAvaliable; i++) {
    optListStock[i] = i.toString();
  }
  if (optListStock.length < 1) {
    optListStock = null;
  }
  return { productSelect: currentProduct, listStock: optListStock };
}

async function createListCarts(idCart) {
  let carts = await getDataCarts();
  let optListCarts = [];
  ListCarts = [];
  for (let i = 1; i <= carts.length; i++) {
    if (idCart != carts[i - 1].cart._id) {
      optListCarts[i] = `Cart (${i.toString()}): ${carts[i - 1].cart._id}`;
      ListCarts.push(carts[i - 1].cart._id);
    } else {
      ListCarts.push(carts[i - 1].cart._id);
    }
  }
  return optListCarts;
}

async function createHTMLCarts() {
  if (storeCarts.length == 0) {
    titleCart.innerHTML = `<p>Carts (${storeCarts.length}):</p>`;
    containCart.innerHTML = `<div class="container__empty__card">
            <div class="card">
              <div class="card-item--empty">
                <i class="fa-solid fa-cart-plus"></i></div>
              <div class="card-body--empty">
                <b class="card-text--empty">No Carts Found</b>
                <p class="card-text--empty">You have not created any cart</p>
                <p class="card-text--empty">Add first cart now</p>
              </div>
            </div>
          </div>`;
  } else {
    titleCart.innerHTML = "";
    containCart.innerHTML = "";
    let html;
    let int = -1;
    for (const listCarts of storeCarts) {
      let statColor = "aquamarine",
        warning = "",
        warn = "hidden";
      let cart = listCarts.cart;
      let countQuantity = 0;
      let cartDetails = cart.products;
      if (cartDetails[0].status === "failed") {
        statColor = "lightOrange";
        warning = "WarningPurchase";
        warn = "";
      }
      let productsCart = cartDetails[0].payload;
      const unique =
        storeCarts.length === 1 || productsCart.length === [] ? "unique" : "";
      if (productsCart.length == 0) {
        warning = "disabled";
      } else {
        for (const product of productsCart) {
          if (product.quantity) {
            countQuantity += product.quantity;
          }
        }
      }
      int++;
      html = `<div class="container__cart__card">
          <div class="card col s12">
            <div class="card_cart--header row noMargin">
              <div class="cart-header--filled col s12">
                <h5 class="cart-title--filled">ID CART: ${cart._id}</h5>
              </div>
            </div>
            <div class="card_cart--body row noMargin">
              <div class="card_imgCart col s3 m3 l3">
                <img
                  src="https://w7.pngwing.com/pngs/225/984/png-transparent-computer-icons-shopping-cart-encapsulated-postscript-shopping-cart-angle-black-shopping.png"
                  class="img-fluid rounded-start"
                  alt="..."
                />
                <div class="card_imgCart--overlay">
                  <b>${int + 1}</b>
                </div>
              </div>
              <button
                type="button"
                class="btn fas fa-trash-alt btnRemoveCart"
                id=${cart._id}
              ></button>
              <button
                type="button"
                class="btn btnPurchaseCart ${warning}"
                id=${cart._id}
              >PROCESS PURCHASE<i
              class="fa-solid fa-triangle-exclamation cartWarn ${warn}"
              ></i></button>
              <button
                type="button"
                class="btn fa-solid fa-arrow-right-arrow-left btnTransferCart ${unique}"
                id=${cart._id}
              ></button>
              <button
              type="button"
              class="btn btn-outline-warning btn-sm btnViewCart"
               >
              <a class="fa-regular fa-eye" href="/cart/${cart._id}"></a>
               </button>
              <div class="card_containCart col s8 m8 l8">
                <div class="loaded">
                  <div class="loaded--status"><b>
                    STATUS CARD:
                    <u class=${statColor}>
                      ***${cartDetails[0].status.toUpperCase()}***
                    </u>
                  </b>
                  </div>
                  <div class="loaded--quantity">
                  <b>
                    QUANTITY OF PRODUCTS:
                    <b class="quantityP">${countQuantity}</b>
                  </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      containCart.innerHTML += html;
    }
    titleCart.innerHTML = `<p>Carts (${storeCarts.length}):</p>`;
    btnPurchaseCart = document.querySelectorAll(".btnPurchaseCart");
    btnTransferCart = document.querySelectorAll(".btnTransferCart");
    btnRemoveCart = document.querySelectorAll(".btnRemoveCart");
    return [btnRemoveCart, btnTransferCart, btnPurchaseCart];
  }
}

async function crearHTMLProductsCarts() {
  if (storeProducts.length == 0) {
    titleCart.innerHTML = `<p>Cart Empty</p>`;
    containCart.innerHTML = "";
    containCart.innerHTML = `<div class="container__empty__card">
        <div class="card">
          <div class="card-item--empty">
            <i class="fa-solid fa-rectangle-xmark fa-beat-fade"></i>
          </div>
          <div class="card-body--empty">
            <b class="card-text--empty">Not Products Found</b>
            <p class="card-text--empty">
              You have not added any product in this cart
            </p>
            <p class="card-text--empty">Try adding a product first</p>
          </div>
          <div class="card__footer--empty">
            <button
              type="button"
              class="btn fas fa-edit btnAddProduct"
            ></button>
          </div>
        </div>
      </div>`;
    btnClearCart.classList.add("hidden");
    btnPurchase.classList.add("hidden");
    btnAdd = document.querySelector(".btnAddProduct");
    return btnAdd;
  } else {
    containCart.innerHTML = "";
    let html;
    let count = 0;
    for (const listProduct of storeProducts) {
      const product = listProduct.product;
      const maxStock = product.stock <= 20 ? product.stock : 20;
      const checkStock = product.stock > 20 ? 20 : product.stock;
      const addMax = listProduct.quantity >= checkStock ? "fullMax" : "";
      const minMax = listProduct.quantity >= checkStock ? "fullMin" : "";
      const failed =
        listProduct.quantity > checkStock ? "failed" : "hiddenFailed";
      /*if (product == null || listProduct.quantity == 0) {
        deletedProductCart(storeCarts[0]._id, product._id);
        continue;
      }*/
      count++;
      const total = product.price * listProduct.quantity;
      html = `<div class="container__grid__card">
          <div class="card">
            <div class="card-header--filled">
              <h5 class="card-title--filled">${product.title}</h5>
            </div>
            <div class="card-img--filled">
            <img
              class="card-img-top--filled"
              src=${product.thumbnail}
              alt="Card image cap"
            />
            </div>
            <div class="card-img-overlay">
              <button
                type="button"
                class="btn fas fa-trash-alt card__btnDelete"
                id=${product._id}
              ></button>
              <button
                type="button"
                class="btn btn-outline-warning btn-sm btnUpdate--Min ${minMax}"
                id=${product._id}
              >
                <i class="fa-regular fa-square-minus"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-warning btn-sm btnUpdate--Max ${addMax}"
                id=${product._id}
              >
                <i class="fa-regular fa-square-plus"></i>
              </button>
            </div>
            <div class="card-body">
              <b class="card-text--description">${product.description}</b>
              <u class="card-text--price">
                Unit Price: S/${product.price}
              </u>
              <b class="card-text--total">Total Price: S/${total}</b>
            </div>
            <div class="card-footer">
              <b class="card-text--quantity">
                Quantity: <b class="quantity">${listProduct.quantity}</b>
              </b>
              <b class="card-text--failed ${failed}" id=${product._id}>
                <b class="productFailed">*Max. ${maxStock} Units*</b>
              </b>
            </div>
          </div>
        </div>`;
      containCart.innerHTML += html;
    }
    existFailed = document.querySelectorAll(".failed");
    if (Object.keys(existFailed).length > 0) {
      updateCart(storeCarts[0]._id, { status: "failed" });
      purchaseCart.classList.add("WarningPurchase");
      purchaseWarn.classList.remove("hidden");
    } else {
      updateCart(storeCarts[0]._id, { status: "success" });
      purchaseCart.classList.remove("WarningPurchase");
      purchaseWarn.classList.add("hidden");
    }
    //console.log("MUESTRA FAILEDS"+JSON.stringify(Object.keys(existFailed).length));
    containCart.classList.replace("container__cart", "container__grid");
    staticContain.classList.replace(
      "static__container--cart",
      "static__container--grid"
    );
    btnClearCart.classList.remove("hidden");
    btnPurchase.classList.remove("hidden");
    titleCart.innerHTML = `<p>Products Cart (${count}):</p>`;
    bnUpdateAdd = document.querySelectorAll(".btnUpdate--Max");
    btnUpdateDel = document.querySelectorAll(".btnUpdate--Min");
    btnAllDel = document.querySelectorAll(".card__btnDelete");
    return [bnUpdateAdd, btnUpdateDel, btnAllDel];
  }
}

async function focusAction() {
  const buttonsMax = document.querySelectorAll(".div__container--focusBtn a");
  const buttonsMin = document.querySelectorAll(".asideSD__dropdown--contain a");
  buttonsMax.forEach((button) => {
    button.href == window.location.href
      ? button.classList.add("active")
      : button.classList.remove("active");
  });

  buttonsMin.forEach((button) => {
    button.href == window.location.href
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
}

async function selectAction() {
  if (RouteIndex === "cartP") {
    storeProducts = [];
    storeCarts = await getDataCarts();
    selectRemoveCart();
  } else if (RouteIndex === "cartP/") {
    socket.emit("viewingCart", storeCarts[0]._id);
    storeProducts = await getDataProductsbyID(storeCarts[0]._id);
    selectBtnCartProducts();
  }
}

async function validateStock(idProduct, stockModif, action) {
  const product = await getDataOneProductbyID(idProduct);
  const newStock = product[0].stock - stockModif;
  await updateOneProductbyID(idProduct, { stock: newStock });
}

async function validateCartStock(listProducts) {
  if (listProducts) {
    for (const product of listProducts) {
      const idProduct = product.product._id;
      const stockModif = product.quantity;
      await validateStock(idProduct, stockModif);
    }
  }
}

async function validatePayload(payload, listProducts) {
  for (const resproduct of listProducts) {
    const { quantity, ...rest } = resproduct;
    const { _id } = resproduct.product;
    const existingProduct = payload.find((p) => {
      return p.product._id == _id;
    });
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      payload.push({ ...rest, quantity });
    }
  }
  return payload;
}

async function TransferCart(idCartTransfer, idCartReceptor) {
  const listProduct1 = await getDataProductsbyID(idCartTransfer);
  const listProduct2 = await getDataProductsbyID(idCartReceptor);
  const newArrCart = new NewDataCart();
  let newStatus,
    contaFailed = 0;
  let payload = newArrCart.payload;
  await validatePayload(payload, listProduct1).then(async (data) => {
    payload = await validatePayload(data, listProduct2);
    for (const product of payload) {
      const maxStock = product.product.stock <= 20 ? product.product.stock : 20;
      if (product.quantity > maxStock) {
        contaFailed++;
      }
    }
  });
  if (contaFailed > 0) {
    newStatus = "failed";
  } else {
    newStatus = "success";
  }
  const newListProduct = await putTransfCart(idCartReceptor, {
    status: newStatus,
    payload: payload,
  });
  return newListProduct;
}

async function selectBtnCartProducts() {
  try {
    if (storeProducts != 0) {
      [bnUpdateAdd, btnUpdateDel, btnAllDel] = await crearHTMLProductsCarts();
      bnUpdateAdd.forEach((btnAdd) => {
        //ACTUALIZA SOLO LA CANTIDAD DEL PRODUCTO SELECCIONADO (SOLO AUMENTA)
        btnAdd.addEventListener("click", async (e) => {
          e.preventDefault();
          const idCart = storeCarts[0]._id;
          const idProduct = btnAdd.id;
          const validProduct = await validAddProduct(idCart, idProduct);
          const { productSelect, listStock } = validProduct;
          if (listStock) {
            Swal.fire({
              html: `How many ${productSelect[0].product.title} do you want to add to the cart?`,
              input: "select",
              inputOptions: listStock,
              footer:
                `Avaliable ${listStock.length - 1} Units` +
                `\n` +
                `(Max Units: 20)`,
              showConfirmButton: true,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "ACCEPT",
              denyButtonText: "CANCEL",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const selectValue =
                  Swal.getPopup().querySelector("select").value;
                const quantity = { stock: selectValue };
                //validateStock(idProduct, +selectValue, 2);
                updateData(idCart, idProduct, quantity)
                  .then(async (data) => {
                    if (data.status === 200) {
                      Swal.fire({
                        title: "Product(s) Added Successfully!!!",
                        text:
                          "Product Added>> " +
                          productSelect[0].product.title +
                          " -->Quantity: " +
                          selectValue,
                        icon: "success",
                        confirmButtonText: "Accept",
                      });
                      socket.emit("updateproduct", "Updated Products");
                      socket.emit(
                        "addingProductCart",
                        `Has been added ${selectValue} ${productSelect[0].product.title} al carrito.`
                      );
                    } else if (data.status === 401 || 403 || 404) {
                      console.warn("Client authorization expired or invalid");
                      Swal.fire(data.sessionData.error, "", "error");
                    }
                  })
                  .catch((error) => console.log("Error:" + error));
              } else if (result.isDenied) {
                Swal.fire("ACTION CANCELED", "", "info");
              }
            });
          } else {
            Swal.fire(
              "You have reached the maximum quantity for this product.",
              "",
              "error"
            );
          }
        });
      });
      btnUpdateDel.forEach((btnUpd) => {
        //ACTUALIZA SOLO LA CANTIDAD DEL PRODUCTO SELECCIONADO (SOLO DISMINUYE)
        btnUpd.addEventListener("click", async (e) => {
          e.preventDefault();
          const idCart = storeCarts[0]._id;
          const idProduct = btnUpd.id;
          const validProduct = await validDelProduct(idCart, idProduct);
          const { productSelect, listStock } = validProduct;
          Swal.fire({
            html: `How many ${productSelect[0].product.title} do you want to delete to the cart?`,
            input: "select",
            inputOptions: listStock,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "ACCEPT",
            denyButtonText: "CANCEL",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const selectValue = Swal.getPopup().querySelector("select").value;
              const lastValue = Object.keys(listStock).pop();
              const quantity = { quantity: selectValue };
              //validateStock(idProduct, +selectValue, 1);
              const action =
                lastValue == selectValue
                  ? deletedProductCart(idCart, idProduct)
                  : updateData(idCart, idProduct, quantity);
              action
                .then(async (data) => {
                  if (data.status === 200) {
                    Swal.fire({
                      title: "Product(s) Deleted Successfully!!!",
                      text:
                        "Product Deleted>> " +
                        productSelect[0].product.title +
                        " -->Quantity: " +
                        selectValue,
                      icon: "success",
                      confirmButtonText: "Accept",
                    });
                    socket.emit("updateproduct", "Updated Products");
                    socket.emit(
                      "deletingProductCart",
                      `Has been removed ${selectValue} ${productSelect[0].product.title} del carrito.`
                    );
                  } else if (data.status === 401 || 403 || 404) {
                    console.warn("Client authorization expired or invalid");
                    Swal.fire(data.sessionData.error, "", "error");
                  }
                })
                .catch((error) => console.log("Error:" + error));
            } else if (result.isDenied) {
              Swal.fire("ACTION CANCELED", "", "info");
            }
          });
        });
      });
      btnAllDel.forEach((btnDel) => {
        //ELIMINA DEL CARRITO EL PRODUCTO SELECCIONADO
        btnDel.addEventListener("click", async (e) => {
          e.preventDefault();
          storeCarts = await getDataCartsbyID(storeCarts[0]._id);
          let Product;
          let products = storeCarts[0].products[0].payload;
          for (const listProduct of products) {
            let product = listProduct.product;
            product._id == btnDel.id
              ? (Product = listProduct)
              : (Product = Product);
          }
          const idProduct = btnDel.id;
          const productSelect = await getDataOneProductbyID(idProduct);
          Swal.fire({
            html:
              `<h4>Are you sure to delete the product?<h4>` +
              `\n` +
              `<h6><b>(Remember that you will not be able to recover it!!!)<b><h6>`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "DELETE PRODUCT",
            denyButtonText: "CANCEL",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const idCart = storeCarts[0]._id;
              authExceptional("user")
                .then(async (data) => {
                  if (data.status === 200) {
                    //await validateStock(idProduct, +quantity, 1);
                    deletedProductCart(idCart, idProduct)
                      .then(async (data) => {
                        Swal.fire({
                          title: "Product Removed Successfully!!!",
                          text: "Product Removed>> " + "ID: " + idProduct,
                          icon: "success",
                          confirmButtonText: "Accept",
                        });
                        socket.emit("updateproduct", "Updated Products");
                        socket.emit(
                          "removeProduct",
                          `The Product ${productSelect[0].title} has been removed from cart`
                        );
                      })
                      .catch((error) => console.log("Error:" + error));
                  } else if (data.status === 401 || 403 || 404) {
                    console.warn("Client authorization expired or invalid");
                    Swal.fire(data.sessionData.error, "", "error");
                  }
                })
                .catch((error) => console.log("Error:" + error));
            } else if (result.isDenied) {
              Swal.fire("ACTION CANCELED", "", "info");
            }
          });
        });
      });
    } else {
      btnAdd = await crearHTMLProductsCarts();
      btnAdd.addEventListener("click", () => {
        window.location.href = "../products";
      });
    }
  } catch (error) {
    console.log(error + ": No hay productos para remover del carrito");
  }
}

async function selectRemoveCart() {
  try {
    if (storeCarts.length != 0) {
      [btnRemoveCart, btnTransferCart, btnPurchaseCart] =
        await createHTMLCarts();
      btnRemoveCart.forEach((selectBtn) => {
        selectBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const cardSelect = await getDataCartsbyID(selectBtn.id);
          Swal.fire({
            html:
              `<h4>Are you sure to delete the cart?<h4>` +
              `\n` +
              `<h6><b>(Remember that you will not be able to recover it!!!)<b><h6>`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "DELETE CART",
            denyButtonText: "CANCEL",
          }).then(async (result) => {
            if (result.isConfirmed) {
              authExceptional("user")
                .then(async (data) => {
                  if (data.status === 200) {
                    //await validateCartStock(cardSelect[0]._id);
                    deleteCart(cardSelect[0]._id)
                      .then(async (data) => {
                        Swal.fire({
                          title: "Cart Removed Successfully!!!",
                          text: "Cart Removed>> " + "ID: " + cardSelect[0]._id,
                          icon: "success",
                          confirmButtonText: "Accept",
                        });
                        socket.emit("updateproduct", "Updated Products");
                        socket.emit(
                          "removeCart",
                          `Cart ${cardSelect[0]._id} Removed`
                        );
                      })
                      .catch((error) => console.log("Error:" + error));
                  } else if (data.status === 401 || 403 || 404) {
                    console.warn("Client authorization expired or invalid");
                    Swal.fire(data.sessionData.error, "", "error");
                  }
                })
                .catch((error) => console.log("Error:" + error));
            } else if (result.isDenied) {
              Swal.fire("ACTION CANCELED", "", "info");
            }
          });
        });
      });
      btnTransferCart.forEach((selectBtn) => {
        selectBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const btnTransfer = selectBtn.id;
          const optCarts = await createListCarts(btnTransfer);
          Swal.fire({
            text: "Which cart do you want to add products?",
            input: "select",
            inputOptions: optCarts,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "ACCEPT",
            denyButtonText: "CANCEL",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const numCart = Swal.getPopup().querySelector("select").value;
              const selectedCartId = ListCarts[numCart - 1];
              Swal.fire({
                html:
                  `<h4>Are you sure to transfer the cart?<h4>` +
                  `\n` +
                  `<h6><b>(Remember that the transferred cart will be deleted and cannot be recovered!!!)<b><h6>`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "TRANSFER CART",
                denyButtonText: "CANCEL",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  authExceptional("user")
                    .then(async (data) => {
                      if (data.status === 200) {
                        TransferCart(btnTransfer, selectedCartId)
                          .then(async (data) => {
                            Swal.fire({
                              title: "Cart Transferred Successfully!!!",
                              text:
                                "Cart Transferred>> " + "ID: " + btnTransfer,
                              icon: "success",
                              confirmButtonText: "Accept",
                            });
                            await deleteCart(btnTransfer);
                            socket.emit("updateproduct", "Updated Products");
                            socket.emit(
                              "transferCart",
                              `The cart ${btnTransfer} has been transferred to cart ${data.sessionData._id}`
                            );
                          })
                          .catch((error) => console.log("Error:" + error));
                      } else if (data.status === 401 || 403 || 404) {
                        console.warn("Client authorization expired or invalid");
                        Swal.fire(data.sessionData.error, "", "error");
                      }
                    })
                    .catch((error) => console.log("Error:" + error));
                } else if (result.isDenied) {
                  Swal.fire("ACTION CANCELED", "", "info");
                }
              });
            } else if (result.isDenied) {
              Swal.fire("ACTION CANCELED", "", "info");
            }
          });
        });
      });
      btnPurchaseCart.forEach((selectBtn) => {
        selectBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          checkPurchaseCart(selectBtn.id);
        });
      });
    } else {
      createHTMLCarts();
    }
  } catch (error) {
    console.log(error + ": There are no carts to be removed.");
  }
}

/*INICIO FUNCIONES CRUD*/
async function getDataCarts() {
  try {
    let response = await fetch(`${UrlU}/${sessionUserID}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    return data.carts;
  } catch {
    console.log(Error);
  }
}

async function getCurrentUser() {
  try {
    let response = await fetch(`${UrlU}/${sessionUserID}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log(Error);
  }
}

async function getDataCartsbyID(id) {
  let response = await fetch(`${UrlC}/${id}`, {
    method: "GET",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    mode: "cors",
  });
  const data = await response.json();
  return data;
}

async function getDataProductsbyID(id) {
  try {
    let response = await fetch(`${UrlC}/${id}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    const dataProducts = data[0].products[0].payload;
    return dataProducts;
  } catch {
    console.log(Error);
  }
}

async function getDataOneProductbyID(id) {
  try {
    let response = await fetch(`${UrlP}/${id}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch {
    console.log(Error);
  }
}

async function createCart(data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(UrlC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function updateData(idCart, idProduct, data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}/products/${idProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function updateOneProductbyID(idProduct, data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlP}/${idProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function deletedProductCart(idCart, idProduct) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}/products/${idProduct}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function deleteAllProductsCart(idCart) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function putTransfCart(idCart, data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}

async function updateCart(idCart, data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch (err) {
    console.error(err);
  }
}

async function deleteCart(idCart) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}/delete`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch {
    console.log(Error);
  }
}
/*FIN FUNCIONES CRUD*/

async function getDataCookie(name) {
  try {
    let response = await fetch(UrlCook + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    if (response.status == 400) {
      console.warn("Client authorization expired or invalid");
      return;
    } else if (response.status == 200) {
      return response.json();
    }
  } catch {
    console.log(Error);
  }
}

/*****************************************************************SOCKETS*************************************************************/

socket.on("callCarts", async (getCarts) => {
  if (getCarts) {
    sessionUserID = getCarts.id;
    Object.assign(storeCarts, getCarts.carts);
    if (storeCarts.length == 1) {
      if (RouteIndex === "cartP") {
        storeCarts = await getDataCarts();
        storeProducts = [];
        selectRemoveCart();
      } else if (RouteIndex === "cartP/") {
        sessionStorage.setItem("cartView", storeCarts[0]._id);
        storeProducts = await getDataProductsbyID(storeCarts[0]._id);
        selectBtnCartProducts();
      }
    } else if (storeCarts.length != 1) {
      if (RouteIndex === "cartP/") {
        let idCart = sessionStorage.getItem("cartView");
        storeProducts = await getDataProductsbyID(idCart);
        selectBtnCartProducts();
      } else if (RouteIndex === "cartP") {
        storeCarts = await getDataCarts();
        storeProducts = [];
        selectRemoveCart();
      }
    }
    focusAction();
  }
});

socket.on("addingProductCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("deleteofcart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("deletingProductCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("removeProduct", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("emptyCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("removeCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("purchaseCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("transferCart", async (msj) => {
  console.log(msj);
  selectAction();
});

socket.on("viewingCart", async (id) => {
  if (RouteIndex === "cartP") {
    let int = -1;
    let btnTransferCart = [];
    let btnRemoveCart = [];
    selectRemoveCart();
    btnTransferCart = document.querySelectorAll(".btnTransferCart");
    btnRemoveCart = document.querySelectorAll(".btnRemoveCart");
    for (const cart of storeCarts) {
      int++;
      if (cart._id == id) {
        btnTransferCart[int].classList.add("hidden");
        btnRemoveCart[int].classList.add("hidden");
      }
    }
  }
});

socket.on("viewingCloseCart", async (id) => {
  if (RouteIndex === "cartP") {
    let int = -1;
    let btnTransferCart = [];
    let btnRemoveCart = [];
    selectRemoveCart();
    btnTransferCart = document.querySelectorAll(".btnTransferCart");
    btnRemoveCart = document.querySelectorAll(".btnRemoveCart");
    for (const cart of storeCarts) {
      int++;
      if (cart._id == id) {
        btnTransferCart[int].classList.remove("hidden");
        btnRemoveCart[int].classList.remove("hidden");
      }
    }
  }
});

/*****************************************************************EVENTS*************************************************************/

btnAddNewCart.addEventListener("click", () => {
  Swal.fire({
    title: "YOU WANT ADD NEW CART?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "YES",
    denyButtonText: "NOT",
  }).then((result) => {
    if (result.isConfirmed) {
      authExceptional("user")
        .then(async (data) => {
          if (data.status === 200) {
            const cart = new NewCart();
            createCart(cart)
              .then(async (data) => {
                Swal.fire({
                  title: "Cart Created Successfully!!!",
                  text: "Cart created>> " + "ID: " + data.sessionData._id,
                  icon: "success",
                  confirmButtonText: "Accept",
                });
                console.log(`New cart ${data.sessionData._id} create`);
                selectAction();
              })
              .catch((error) => console.log("Error:" + error));
          } else if (data.status === 401 || 403 || 404) {
            console.warn("Client authorization expired or invalid");
            Swal.fire(data.sessionData.error, "", "error");
          }
        })
        .catch((error) => console.log("Error:" + error));
    } else if (result.isDenied) {
      Swal.fire("ACTION CANCELED", "", "info");
    }
  });
});

async function createListProductsFailed(idCart) {
  let newHtml = `<div><b>PRODUCTS OUT STOCK</b></div><div class="checkPurchase">`;
  storeCarts = await getDataCartsbyID(idCart);
  const payload = storeCarts[0].products[0].payload;
  let contaFail = 0;
  for (const product of payload) {
    const currentProduct = await getDataOneProductbyID(product.product._id);
    const stockMax =
      currentProduct[0].stock <= 20 ? currentProduct[0].stock : 20;
    if (product.quantity > stockMax) {
      contaFail++;
      let html = `<div class="container__checkPurchase__card--outStock">
      <div class="card col s12">
        <div class="card_cart--header row noMargin">
          <div class="cart-header--filled col s12">
            <h5 class="checkPurchase-title--filled">${product.product.title} </h5>
          </div>
        </div>
        <div class="card_checkPurchase--body row noMargin">
          <div class="card_imgcheckPurchase col s3 m3 l3">
            <img
              src=${product.product.thumbnail}
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="card_containcheckPurchase col s8 m8 l8">
            <div class="loaded">
              <div class="loaded--status">
              <b>
                MAX LIMIT STOCK: 
                <b class="aquamarine size1rem">
                ${stockMax}  
                </b>
              </b>
              </div>
              <div class="loaded--quantity">
              <b>
                QUANTITY ORDERED: 
                <b class="lightOrange size1rem">
                ${product.quantity}
                </b>
                <b class="quantityP"></b>
              </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      newHtml += html;
    }
  }
  newHtml += `</div><div><b>These products will not proceed in the purchase, do you want to continue anyway?</b></div><div class="">`;
  return { html: newHtml, contaFail: contaFail };
}

async function createListProductsPurchase(idCart) {
  let productsPurchase = [],
    productsFailed = [];
  let newHtml = `<div><b>PRODUCTS PURCHASE</b></div><div class="checkPurchase">`;
  storeCarts = await getDataCartsbyID(idCart);
  const payload = storeCarts[0].products[0].payload;
  let contaFail = 0,
    totalPurchase = 0;
  for (const product of payload) {
    const currentProduct = await getDataOneProductbyID(product.product._id);
    const totalPrice = product.product.price * product.quantity;
    const stockMax =
      currentProduct[0].stock <= 20 ? currentProduct[0].stock : 20;
    if (product.quantity <= stockMax) {
      productsPurchase.push(product);
      totalPurchase += totalPrice;
      contaFail++;
      let html = `<div class="container__checkPurchase__card--getStock">
      <div class="card col s12">
        <div class="card_cart--header row noMargin">
          <div class="cart-header--filled col s12">
            <h5 class="checkPurchase-title--filled">${product.product.title} </h5>
          </div>
        </div>
        <div class="card_checkPurchase--body row noMargin">
          <div class="card_imgcheckPurchase col s3 m3 l3">
            <img
              src=${product.product.thumbnail}
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="card_containcheckPurchase col s8 m8 l8">
            <div class="loaded">
              <div class="loaded--status">
              <b>
                UNIT PRICE: 
                <b class="skyBlue size1rem">
                ${product.product.price}  
                </b>
              </b>
              </div>
              <div class="loaded--quantity">
              <b>
                QUANTITY ORDERED: 
                <b class="skyBlue size1rem">
                ${product.quantity}
                </b>
                <b class="quantityP"></b>
              </b>
              </div>
              <div class="loaded--totalPrice">
              <b>
                TOTAL PRICE: 
                <u class="aquamarine size1rem">
                ${totalPrice}
                </u>
                <b class="quantityP"></b>
              </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      newHtml += html;
    } else {
      productsFailed.push(product);
    }
  }
  newHtml += `</div><div><b>Total Purchase Amount: S/${totalPurchase}</b></div><div class="">`;
  return {
    html: newHtml,
    totalPurchase: totalPurchase,
    products: productsPurchase,
    failed: productsFailed,
  };
}

async function checkPurchaseCart(idCart) {
  const { html, contaFail } = await createListProductsFailed(idCart);
  if (contaFail > 0) {
    updateCart(idCart, { status: "failed" });
    Swal.fire({
      html: html,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "CONTINUE PURCHASE",
      denyButtonText: "CANCEL PURCHASE",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          completePurchaseCart(idCart);
        } else if (result.isDenied) {
          selectAction();
          Swal.fire("ACTION CANCELED", "", "info");
        }
      })
      .catch((error) => console.log("Error:" + error));
  } else {
    completePurchaseCart(idCart);
  }
}

async function updatePurchaseCart(idCart, data) {
  try {
    const token = await getDataCookie("getTokenCookie");
    let response = await fetch(`${UrlC}/${idCart}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return { status: response.status, sessionData: dataRes };
  } catch (err) {
    console.error(err);
  }
}

async function completePurchaseCart(idCart) {
  const { html, totalPurchase, products, failed } =
    await createListProductsPurchase(idCart);
  Swal.fire({
    html: html,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "CONFIRM PURCHASE",
    denyButtonText: "CANCEL PURCHASE",
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const user = await getCurrentUser(sessionUserID);
        const successPurchase = new SuccessPurchase(totalPurchase, user.email);
        await validateCartStock(products);
        updatePurchaseCart(idCart, successPurchase)
          .then(async (data) => {
            const status = failed.length > 0 ? "failed" : "success";
            await updateCart(idCart, { status: status, payload: failed })
              .then((data) => {
                Swal.fire("PURCHASE SUCCESS", "", "success");
                socket.emit("updateproduct", "Updated Products");
                socket.emit(
                  "purchaseCart",
                  `The Purchase of the cart ${idCart} has been made Successfully.`
                );
              })
              .catch((error) => {
                console.log("Hubo un error en el update");
              });
          })
          .catch((error) => {
            console.log("OCURRIO UN ERROR CON EL UPDATE");
          });
      } else if (result.isDenied) {
        Swal.fire("ACTION CANCELED", "", "info");
      }
    })
    .catch((error) => console.log("Error:" + error));
}

purchaseCart.addEventListener("click", async () => {
  checkPurchaseCart(storeCarts[0]._id);
});

btnClearCart.addEventListener("click", () => {
  Swal.fire({
    html:
      `<div>Failed Products</div>` +
      `<h4>Are you sure to empty the cart??<h4>` +
      `\n` +
      `<h6><b>(Remember that you will not be able to recover it!!!)<b><h6>`,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "CLEAN CART",
    denyButtonText: "CANCEL",
  }).then(async (result) => {
    if (result.isConfirmed) {
      authExceptional("user")
        .then(async (data) => {
          if (data.status === 200) {
            let idCart = storeCarts[0]._id;
            //await validateCartStock(idCart);
            deleteAllProductsCart(idCart)
              .then(async (data) => {
                Swal.fire({
                  title: "All Products Cart Removed Successfully!!!",
                  text: "Cart Clean>> " + "ID: " + idCart,
                  icon: "success",
                  confirmButtonText: "Accept",
                });
                socket.emit("emptyCart", `Cart ${idCart} emptying`);
              })
              .catch((error) => console.log("Error:" + error));
          } else if (data.status === 401 || 403 || 404) {
            console.warn("Client authorization expired or invalid");
            Swal.fire(data.sessionData.error, "", "error");
          }
        })
        .catch((error) => console.log("Error:" + error));
    } else if (result.isDenied) {
      Swal.fire("ACTION CANCELED", "", "info");
    }
  });
});

btnExitCart.onclick = () => {
  const idCart = sessionStorage.getItem("cartView");
  socket.emit("viewingCloseCart", idCart);
  window.location.href = "../cart";
};
