const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Function to get the cart for a user or guest
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get or create cart
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (productIndex > -1) {
        // If the product is already in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        cart.products.push({
          productId: product._id,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color: color,
          size: size,
          quantity: quantity,
        });
      }

      // Update total price
      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId: product._id,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            color: color,
            size: size,
            quantity: quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      await cart.save();
      return res.status(201).json(cart);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//@route PUT /api/cart
// @desc Update product quantity in cart
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Get the cart for the user or guest
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (productIndex > -1) {
      // Update the quantity of the product
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        // If quantity is 0, remove the product from the cart
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product in cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/cart
// @desc    Remove product from cart
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    // Get the cart for the user or guest
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (productIndex > -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);

      // Update total price
      cart.totalPrice = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/cart
// @desc    Get cart for user or guest
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest Cart is empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If product already exists, update quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // If product does not exist, add it
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);

        await userCart.save();

        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }

        res.status(200).json(userCart);
      } else {
        // If user cart does not exist, create it
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; // Remove guestId
        await guestCart.save();
        res.status(201).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "No guest cart found" });
    }
  } catch (error) {
    console.error("Error merging carts:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
