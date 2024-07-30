const express = require("express");
const router = express.Router();

const { googleAuth } = require("../controller/authController");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  } = require("../controller/productController");
const { addBill, getBillData, addTableBill, updateBill, getBillById } = require("../controller/billController");
 const { addNewCategories, getNewCategories, updateNewCategories, deleteNewCategories } = require('../controller/categoriesController')
const { getProductData, addCategory, getCategories, getAllProducts } = require("../controller/categoryController");
const { addExpens, getExpens, updateExpens, deleteExpens }
  = require("../controller/expensisesController");
const { registerUser, loginUser, getUserDetails, updateUser } = require("../controller/userController");

const {addStructureFields, getStructureData, deleteStructure} = require("../controller/structureController");


router.post("/register", registerUser);

router.post("/login", loginUser);
//router.post("/auth/google/callback", googleAuth);
router.get('/user/:userId', getUserDetails);
router.put("/user/:userId", updateUser);

router.post("/product/:userId", addProduct);
router.get("/get-products/:userId", getProducts);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.post("/bill/:userId", addBill);
router.get("/bills/:userId", getBillData);
router.get('/billss/:orderId', getBillById);
router.put("/updateBill/:id", updateBill);

router.get("/get-product-data/:userId", getProductData);
router.post("/addcategory/:userId", addCategory);
router.get("/categories/:userId", getCategories);
router.get("/products/:userId", getAllProducts);

router.post("/expenses/:userId", addExpens);
router.get("/expenses/:userId", getExpens);
router.put("/expens/:id", updateExpens);
router.delete("/expens/:id", deleteExpens);

router.post("/newcategories/:userId", addNewCategories);
router.get("/newcategories/:userId", getNewCategories);
router.put("/newcategories/:id", updateNewCategories);
router.delete("/newcategories/:id", deleteNewCategories);

router.post("/structure/:userId", addStructureFields);
router.get("/getStructure/:userId", getStructureData);
router.delete("/deleteStructure/:id", deleteStructure);


module.exports = router;