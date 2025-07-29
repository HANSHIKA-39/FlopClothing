const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const Counter = require("../models/Counter");

const router = express.Router();

// ================================
// @route   POST /api/checkout
// @desc    Create a new checkout session
// @access  Private
// ================================
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const checkout = new Checkout({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      totalAmount: totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    await checkout.save();
    res.status(201).json(checkout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
// @route   PUT /api/checkout/:id/pay
// @desc    Mark checkout as paid
// @access  Private
// ================================
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus.toLowerCase() === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = "Paid";
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();

      return res.status(200).json({
        message: "Payment updated successfully",
        checkout,
      });
    } else {
      return res.status(400).json({ message: "Payment not marked as 'paid'" });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
// @route   POST /api/checkout/:id/finalize
// @desc    Finalize checkout & create order
// @access  Private
// ================================
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout not paid yet" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    let counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const paddedNumber = String(counter.value).padStart(7, "0"); // e.g., "01", "02"
    const orderId = `FLOP_${paddedNumber}`;

    const finalOrder = await Order.create({
      orderId: `#${orderId}`,
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      totalAmount: checkout.totalPrice,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentStatus: "Paid",
      paymentDetails: checkout.paymentDetails,
    });

    // ✅ Mark checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // ✅ Delete cart (optional but good)
    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json({
      message: "Order placed successfully",
      order: finalOrder,
    });
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
