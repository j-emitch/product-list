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

    // Generate fake reviews
    product.reviews = Array.from({ length: 3 }, () => ({
      username: faker.internet.userName(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
    }));

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

router.get("/products/:product", async (req, res, next) => {
  try {
    const productId = req.params.product; 
    const product = await Product.findById(productId); 

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.send(product); 
  } catch (err) {
    next(err); 
  }
});

router.get("/products/:product/reviews", async (req, res, next) => {
  const perPage = 4;
  const page = parseInt(req.query.page) || 1; 

  try {
    const productId = req.params.product; 
    const product = await Product.findById(productId); 

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    const reviews = product.reviews.slice((page - 1) * perPage, page * perPage);

    res.send({
      reviews,
      totalReviews: product.reviews.length,
      pages: Math.ceil(product.reviews.length / perPage), 
      currentPage: page, 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
