export const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or invalid. 
    Please check the following properties: 
    *first_name: needs to be a string, received ${user.first_name}
    *last_name: needs to be a string, received ${user.last_name}
    *email: needs to be a string, received ${user.email}`;
};
export const generateDatabaseErrorInfo = (data)=>{
    return `La id ingresada no es correcta o no existe en la base de datos. 
    Please check the following properties: 
    *id: needs to be a id valid, received ${data.id}`; 
}

export const generateAxiosErrorInfo = (data)=>{
    return `The data obtained by axios is not correct or the path is invalid.
    Please check the following properties: 
    *Route: Needs to be a route valid
    Received: ${data.route}`; 
}

export const generateCartErrorInfo = (cart) => {
    return `Please check the following properties: 
    *Products: Needs to be array products valid, received ${cart.products} `;
}

export const generateProductErrorInfo = (product) => {
    return `Please check the following properties: 
    *title: Needs to be a string valid, received ${product.title}
    *description: Needs to be a string valid, received ${product.description}
    *code: Needs to be a number valid, received ${product.code}
    *status: Needs to be a string valid, received ${product.status}
    *stock: Needs to be a number valid, received ${product.stock}
    *category: Needs to be a string valid, received ${product.category}
    *price: Needs to be a boolean valid, received ${product.price} `;
}


export const generateAuthErrorInfo = (user) => {
    return `Please check authentication:
    *User: Needs to be a user valid, received ${user} `;
}