const { Product } = require("../models/productSchema");
require("dotenv").config();

const getNextProductId = async (userId) => {
  const lastProduct = await Product.findOne({ userId }).sort({ productid: -1 });
  return lastProduct ? lastProduct.productid + 1 : 1;
};

const addProduct = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { productName, type, category, unit, stock, price, description } = req.body;

    const nextProductId = await getNextProductId(userId);

    const newProduct = new Product({
      productid: nextProductId,
      userId,
      productName,
      type,
      category,
      unit,
      stock,
      price,
      description,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getProducts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCategory = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      contact: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };
