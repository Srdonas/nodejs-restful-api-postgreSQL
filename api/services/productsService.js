const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generateProducts();
  }

  generateProducts() {
    const limit = 100;
    const products = [];
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }
  async getProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }
  async findOne(id) {
    const product = this.products.find((itemn) => itemn.id === id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    if(product.isBlock){
      throw boom.conflict('El Producto Esta Bloqueado')
    }
    return product;
  }
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name: data.name,
      price: parseInt(data.price, 10),
      description: data.description,
      image: data.image,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async updateProduct(id, data) {
    const product = this.products.find((itemn) => itemn.id === id);
    if (product) {
      product.name = data.name;
      product.price = parseInt(data.price, 10);
      product.description = data.description;
      product.image = data.image;
    }else{
      throw boom.notFound('Producto no encontrado');
    }
    return product;
  }
  async delete(id) {
    const index = this.products.findIndex((itemn) => itemn.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    } else {
      throw boom.notFound('Producto no encontrado');
    }
    return id;
  }
}

module.exports = ProductsService;
