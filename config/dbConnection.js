const mongoose = require("mongoose");

const conn = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB Connected",
      connect.connection.host,
    );

      // const connect = await mongoose.connect(
      //   "mongodb://127.0.0.1:27017/CloudBilling"
      // );
      // console.log("DB Connected", connect.connection.host);
       
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};


module.exports = conn;
