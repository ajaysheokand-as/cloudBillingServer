const { NewCategories } = require("../models/categoriesSchema");
require("dotenv").config();

const addNewCategories = async (req, res) => {
    const userId = req.params.userId;
    try {
        const { srNo, newTitle, newStatus, newDescription } =
            req.body;

        const existingSrNo = await NewCategories.findOne({userId, srNo});
        if (existingSrNo) {
            return res.status(400).json({ message: "Serial no. already exists" });
        }

        const form = new NewCategories({
            srNo,
            userId,
            newTitle,
            newStatus,
            newDescription
        });

        await form.save();

        res.status(201).json({
            message: "NewCategories added successfully",
            contact: form,
        });
    } catch (error) {
        console.error("Error adding NewCategories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getNewCategories = async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await NewCategories.find({userId});
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateNewCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedNewCategories = await NewCategories.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedNewCategories) {
            return res.status(404).json({ message: "NewCategories not found" });
        }

        res.status(200).json({
            message: "NewCategories updated successfully",
            contact: updatedNewCategories,
        });
    } catch (error) {
        console.error("Error updating NewCategories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNewCategories = async (req, res) => {
    try {
        const { id } = req.params;
        await NewCategories.findByIdAndDelete(id);
        res.status(200).json({ message: "NewCategories deleted successfully" });
    } catch (error) {
        console.error("Error deleting NewCategories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addNewCategories, getNewCategories, updateNewCategories, deleteNewCategories };
