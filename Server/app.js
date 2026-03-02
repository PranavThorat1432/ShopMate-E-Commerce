import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { createTables } from './Utils/createTables.js';
import { errorMiddleware } from './Middlewares/errorMiddlewares.js';
import authRouter from './Routes/authRoutes.js';
import productRouter from './Routes/productsRoutes.js';
import adminRouter from './Routes/adminRoutes.js';
import Stripe from 'stripe';
import database from './Config/db.js';
import orderRouter from './Routes/orderRoutes.js';

const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173', process.env.DASHBOARD_URL || 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload({
    tempFileDir: './Temp',
    useTempFiles: true
}));

app.post('/api/payment/webhook', express.raw({type: 'application/json'}), async(req, res) => {
    const signature = req.headers['stripe-signature'];

    let event;
    try {
        event = Stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message || error}`);
    }

    // Handling the event
    if(event.type === 'payment_intent.succeeded') {
        const paymentIntent_client_secret = event.data.object.client_secret;
        try {
            // Finding and Updating Payment
            const updatedPaymentStatus = 'Paid';
            const paymentTableUpdateResult = await database.query('UPDATE payments SET payment_status = $1 WHERE payment_intent_id = $2 RETURNING *', [updatedPaymentStatus, paymentIntent_client_secret]);
            
            await database.query('UPDATE orders SET paid_at = NOW() WHERE id = $1 RETURNING *', [paymentTableUpdateResult.rows[0].order_id]);

            // Reduce stock for each product
            const orderId = paymentTableUpdateResult.rows[0].order_id;

            const {rows: orderedItems} = await database.query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [orderId]);

            // For each ordered item, reduce the stock
            for(const item of orderedItems) {
                await database.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
            }
            
        } catch (error) {
            return res.status(500).send('Error updating payment status: ' + (error.message || error));
        }
    }

    res.status(200).send({received: true});
});

// Routes | API Endpoints
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/orders', orderRouter);

createTables();

app.use(errorMiddleware)

export default app; 