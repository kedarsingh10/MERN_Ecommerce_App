import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use('/', (req, res, next) => {
    console.log(req.path);
    next();
});

app.get('/', (req, res) => {
    res.send('API is Running...');
});

app.use('/api/products', productRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}` ))