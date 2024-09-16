const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/gofoodmern';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');

    // Access the "fooditems" collection
    const fetched_data = mongoose.connection.db.collection('fooditems');
    const foodCategory = mongoose.connection.db.collection('foodcategory');

    // Fetch data from the collection
    const items = await fetched_data.find({}).toArray();
    const category = await foodCategory.find({}).toArray();

    // Assign the fetched items to a global variable
    global.fooditems = items;
    global.foodcategory = category;

    // Log the fetched items to verify
    console.log('Fetched food items:', global.fooditems);
    console.log('Fetched food categories:', global.foodcategory);

  } catch (error) {
    console.error('Error connecting to MongoDB or fetching data:', error);
  }
};

module.exports = mongoDB;
