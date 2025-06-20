const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    const products = Array.from({ length: 90 }, () => {
      const product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://via.placeholder.com/250?text=Product+Image",
        reviews: Array.from({ length: 3 }, () => ({
          username: faker.internet.userName(),
          rating: faker.datatype.number({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
        })),
      });
      return product;
    });

    await Product.insertMany(products);
    res.status(200).send({ message: "Fake data generated successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category;
  const price = req.query.price;
  const query = req.query.query; 
  
  try {
    const compoundQuery = category ? { category: category } : {};

    if (query) {
      compoundQuery.name = { $regex: query, $options: "i" }; 
    }

    const sortOrder = 
      price === "highest" ? -1 : price === "lowest" ? 1 : null;

    const products = await Product.find(compoundQuery)
      .sort(sortOrder ? { price: sortOrder } : {}) 
      .skip(perPage * (page - 1))
      .limit(perPage);

    const count = await Product.countDocuments(compoundQuery);

    res.status(200).send({
      products,
      totalDocs: count,
      numPages: Math.ceil(count / perPage),
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

    res.status(200).send(product); 
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

    res.status(200).send({
      reviews,
      totalReviews: product.reviews.length,
      numPages: Math.ceil(product.reviews.length / perPage), 
      currentPage: page, 
    });
  } catch (err) {
    next(err);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const product = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: req.body.reviews || [],
    });

    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    next(err);
  }
});

router.post("/products/:product/reviews", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    const newReview = {
      username: req.body.username,
      text: req.body.text,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/products/:product", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully", product: deletedProduct });
  } catch (err) {
    next(err);
  }
});

router.delete("/reviews/:review", async (req, res, next) => {
  try {
    const reviewId = req.params.review;

    const product = await Product.findOne({ "reviews._id": reviewId });

    if (!product) {
      return res.status(404).send({ error: "Review not found" });
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    await product.save();

    res.status(200).send({ message: "Review deleted successfully", product: product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
