const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

env.config()
const mongoUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.qro4t.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
app.use(cors())
try {
   mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
   })
   console.log('database connected');
}
catch (e) {
   console.log('error while connecting database');
}

const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const taskRoute = require('./routes/taskRoute');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/tasks', taskRoute);
app.listen(process.env.PORT, () => {
   console.log(`server is running at port localhost:${process.env.PORT}`)
})