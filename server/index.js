const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routers/userRoutes');
const fundraiserRoutes = require('./routers/fundraiserRoutes');
const listingRoutes = require('./routers/listingRoutes');
const orderRoutes = require('./routers/orderRoutes');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
connectDB();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Welcome to Krishi Coin 🪙🧑‍🌾🌱');
});

app.use('/api/users', userRoutes);
app.use('/api/fundraisers', fundraiserRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
