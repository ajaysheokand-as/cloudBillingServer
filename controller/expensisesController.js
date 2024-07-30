const { Expens } = require("../models/expensisesSchema");
require("dotenv").config();

const addExpens = async (req, res) => {
    const userId = req.params.userId;
    try {
        const { srno, date, title, price, description } =
            req.body;

        const existingSrno = await Expens.findOne({userId, srno });
        if (existingSrno) {
            return res.status(400).json({ message: "Serial no. already exists" });
        }

        const form = new Expens({
            srno,
            userId,
            date,
            title,
            price,
            description
        });

        await form.save();

        res.status(201).json({
            message: "Expenses added successfully",
            contact: form,
        });
    } catch (error) {
        console.error("Error adding Expens:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getExpens = async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await Expens.find({userId});
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateExpens = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedCategory = await Expens.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Expenses not found" });
        }

        res.status(200).json({
            message: "Expenses updated successfully",
            contact: updatedCategory,
        });
    } catch (error) {
        console.error("Error updating Expens:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteExpens = async (req, res) => {
    try {
        const { id } = req.params;
        await Expens.findByIdAndDelete(id);
        res.status(200).json({ message: "Expenses deleted successfully" });
    } catch (error) {
        console.error("Error deleting Expenses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addExpens, getExpens, updateExpens, deleteExpens };
