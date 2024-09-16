// routes/food.js
const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    // Check if both global variables are defined
    if (global.fooditems && global.foodcategory) {
      console.log('Food Items:', global.fooditems);
      console.log('Food Categories:', global.foodcategory);

      // Send both as an object
      res.status(200).json({ fooditems: global.fooditems, foodcategory: global.foodcategory });
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
