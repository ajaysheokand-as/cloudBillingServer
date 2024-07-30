const { Category } = require("../models/categorySchema");
const { Product } = require("../models/productSchema");
require("dotenv").config();

const addCategory = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { category, price, description } =
      req.body;

    const form = new Category({
      category,
      userId,
      price,
      description,
    });

    await form.save();

    res.status(201).json({
      message: "Category added successfully",
      contact: form,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductData = async (req, res) => {
  const userId = req.params.userId;
  try {
    const categories = await Product.find({userId});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  const userId = req.params.userId;
  try {
    const categories = await Product.find({userId}, 'category');
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllProducts = async (req, res) => {
  const userId = req.params.userId;

  const { category } = req.query;
  try {
    let products;
    if (category) {
      products = await Product.find({userId, category });
    } else {
      products = await Product.find({userId});
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getProductData, addCategory, getCategories, getAllProducts };
