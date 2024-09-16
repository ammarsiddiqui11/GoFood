const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  
  // Check if email is provided
  if (!req.body.email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  await data.splice(0, 0, { Order_date: req.body.order_date });

  try {
    // Check if an order already exists for this email
    let eId = await Order.findOne({ email: req.body.email });
    
    if (eId === null) {
      // If no order exists, create a new one
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.status(200).json({ success: true });
    } else {
      // If an order exists, update it with new order data
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
