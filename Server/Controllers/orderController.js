import ErrorHandler from "../Middlewares/errorMiddlewares.js";
import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import database from "../Config/db.js";
import {generatePaymentIntent} from '../Utils/generatePaymentIntent.js';

export const placeNewOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { full_name, state, city, country, address, pincode, phone, orderedItems } = req.body;
        if(!full_name || !state || !city || !country || !address || !pincode || !phone) {
            return next(new ErrorHandler('Please provide all the required fields', 400));
        }

        const items = Array.isArray(orderedItems) ? orderedItems : JSON.parse(orderedItems);
        if(!items || items.length === 0) {
            return next(new ErrorHandler('No Items in Cart!', 400));
        }

        const productIds = items.map(item => item.product.id);
        const {rows: products} = await database.query(`
            SELECT id, price, stock, name FROM products WHERE id = ANY($1::uuid[])
        `, [productIds]);

        let totalPrice = 0;
        const values = [];
        const placeholders = [];

        items.forEach((item, index) => {
            const product = products.find(p => p.id === item.product.id);
            if(!product) {
                return next(new ErrorHandler(`Product not found for ID: ${item.product.id}`), 404);
            }

            if(item.quantity > product.stock) {
                return next(new ErrorHandler(`Only ${product.stock} items available for product ${product.name}`), 400);
            }

            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            values.push(
                null, 
                product.id, 
                item.quantity, 
                product.price, 
                item.product.images[0].url || '', 
                product.name
            );

            const offset = index * 6;

            placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`);

        });

        const tax_price = 0.18;
        const shipping_price = totalPrice >= 50 ? 0 : 2;
        totalPrice = Math.round((totalPrice + totalPrice * tax_price + shipping_price));

        const orderResult = await database.query(`
            INSERT INTO orders (buyer_id, total_price, tax_price, shipping_price) VALUES ($1, $2, $3, $4) RETURNING *
        `, [req.user.id, totalPrice, tax_price, shipping_price]);

        const orderId = orderResult.rows[0].id;
        
        // Replace only the order_id positions (every 6th position starting from 0)
        for(let i = 0; i < items.length; i++) {
            values[i * 6] = orderId;
        }

        await database.query(`
            INSERT INTO order_items (order_id, product_id, quantity, price, image, title) VALUES ${placeholders.join(', ')} RETURNING *`, values
        );

        await database.query(`
            INSERT INTO shipping_info (order_id, full_name, state, city, country, address, pincode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [orderId, full_name, state, city, country, address, pincode, phone]
        );

        const paymentResponse = await generatePaymentIntent(orderId, totalPrice);
        if(!paymentResponse.success) {
            return next(new ErrorHandler('Payment Failed, Try Again!'), 500);
        }

        res.status(200).json({
            success: true,
            message: 'Order Placed Successfully. Please proceed to payment.',
            paymentIntent: paymentResponse.clientSecret,
            totalPrice
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error placing order: ' + (error.message || error)
        });
    }
});


export const fetchSingleOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const result = await database.query(`
            SELECT o.*, 
                COALESCE(
                    json_agg(
                        json_build_object(
                            'order_item_id', oi.id,
                            'order_id', oi.order_id,
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                ) AS order_items,
                json_build_object(
                    'full_name', s.full_name,
                    'state', s.state,
                    'city', s.city,
                    'country', s.country,
                    'address', s.address,
                    'pincode', s.pincode,
                    'phone', s.phone
                ) AS shipping_info
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN shipping_info s ON o.id = s.order_id
            WHERE o.id = $1
            GROUP BY o.id, s.id;
        `, [orderId]);

        if (result.rows.length === 0) {
            return next(new ErrorHandler('Order not found!', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Order Fetched!',
            order: result.rows[0]
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error fetching order: ${error.message || error}`
        });
    }
});


export const fetchMyOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const result = await database.query(`
            SELECT o.*, COALESCE(
                json_agg(
                    json_build_object(
                        'order_item_id', oi.id,
                        'order_id', oi.order_id,
                        'product_id', oi.product_id,
                        'quantity', oi.quantity,
                        'price', oi.price,
                        'image', oi.image,
                        'title', oi.title
                    ) 
                ) FILTER (WHERE oi.id IS NOT NULL), '[]'
            ) AS order_items,
            json_build_object(
                'full_name', s.full_name,
                'state', s.state,
                'city', s.city,
                'country', s.country,
                'address', s.address,
                'pincode', s.pincode,
                'phone', s.phone
            ) AS shipping_info 
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN shipping_info s ON o.id = s.order_id
            WHERE o.buyer_id = $1
            GROUP BY o.id, s.id
        `, [req.user.id]);

        res.status(200).json({
            success: true,
            message: 'All Your Orders Fetched!',
            myOrders: result.rows
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error fetching My Orders: ${error.message || error}`
        });
    }
});


export const fetchAllOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const result = await database.query(`
            SELECT o.*,
                COALESCE(json_agg(
                    json_build_object(
                        'order_item_id', oi.id,
                        'order_id', oi.order_id,
                        'product_id', oi.product_id,
                        'quantity', oi.quantity,
                        'price', oi.price,
                        'image', oi.image,
                        'title', oi.title
                    )
                ) FILTER (WHERE oi.id IS NOT NULL), '[]' ) 
                AS order_items, json_build_object(
                    'full_name', s.full_name,
                    'state', s.state,
                    'city', s.city,
                    'country', s.country,
                    'address', s.address,
                    'pincode', s.pincode,
                    'phone', s.phone 
                ) AS shipping_info
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                LEFT JOIN shipping_info s ON o.id = s.order_id
                GROUP BY o.id, s.id
            `, []
        );

        if(result.rows.length === 0) {
            return next(new ErrorHandler('Orders not found!', 404));
        }

        res.status(200).json({
            success: true,
            message: 'All Orders Fetched!',
            allOrders: result.rows
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: `Error fetching all orders: ${error.message || error}`
        });
    }
});


export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    try {
        const { status } = req.body;
        if(!status) {
            return next(new ErrorHandler('Please provide a valid status for order!', 400));
        }

        const {orderId} = req.params;

        const results = await database.query(`
            SELECT * FROM orders WHERE id = $1
        `, [orderId]);
        if(results.rows.length === 0) {
            return next(new ErrorHandler('Order not found!', 404));
        }

        const updatedOrder = await database.query(`
            UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *`, [status, orderId]
        );

        res.status(200).json({
            success: true,
            message: 'Order Updated!',
            updatedOrder: updatedOrder.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error updating order status: ${error.message || error}`
        });
    }
});


export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const {orderId} = req.params;
        const results = await database.query(`
            DELETE FROM orders WHERE id = $1 RETURNING *`, [orderId]
        );

        if(results.rows.length === 0) {
            return next(new ErrorHandler('Order not found!', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Order Deleted!',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error deleting order: ${error.message || error}`
        });
    }
});