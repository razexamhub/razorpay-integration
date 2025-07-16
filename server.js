const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_stSgFyQjlpFMEy", // 🔁 Replace with your Razorpay Key ID
  key_secret: "your_secret_key_here" // 🔁 Replace with your Razorpay Secret Key
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: currency || "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 100000),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
