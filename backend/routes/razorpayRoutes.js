const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

module.exports = router;
