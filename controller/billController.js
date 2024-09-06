const { Bill } = require("../models/billSchema");
require("dotenv").config();

const addBill = async (req, res) => {
  const userId = req.params.userId;
  console.log("in add bill", req.body);
  try {
    const { name, mobile, section, index, orderItems, totalAmount, subtotal, paymentMethod,gst,discount } = req.body;

    const today = new Date().setHours(0,0,0,0);
    const lastBill = await Bill.findOne({ timestamp: { $gte: today } }).sort({ billId: -1 });

    const billId = lastBill ? lastBill.billId +1 : 1;
    
    const newBill = new Bill({
      billId,
      name,
      userId,
      mobile,
      section,
      index,
      orderItems,
      totalAmount,
      subtotal,
      paymentMethod,
      gst,
      discount,
    });

    await newBill.save(); 

    res.status(201).json({
      message: "Order placed successfully",
      bill: newBill,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBillData = async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await Bill.find({userId});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getBillById = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("this id order id", orderId)
    const bill = await Bill.findById(orderId)
    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedbill = await Bill.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedbill) {
      return res.status(404).json({ message: "bill not found" });
    }

    res.status(200).json({
      message: "bill updated successfully",
      contact: updatedbill,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addBill, getBillData, getBillById, updateBill };
