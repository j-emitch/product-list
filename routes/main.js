const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  const savePromises = [];

  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    savePromises.push(product.save());
  }

  try {
    await Promise.all(savePromises);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  const perPage = 9;

  const page = parseInt(req.query.page) || 1;

  try {
    const products = await Product.find({})
      .skip(perPage * (page - 1))
      .limit(perPage);

    const count = await Product.countDocuments();

    res.send({
      products,
      total: count,
      pages: Math.ceil(count / perPage),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
