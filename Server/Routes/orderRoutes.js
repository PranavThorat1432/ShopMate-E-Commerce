import express from 'express';
import { isAuth, authorizedRoles } from '../Middlewares/isAuth.js';
import { deleteOrder, fetchAllOrders, fetchMyOrders, fetchSingleOrder, placeNewOrder, updateOrderStatus } from '../Controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', isAuth, placeNewOrder);
orderRouter.get('/fetch/:orderId', isAuth, fetchSingleOrder);
orderRouter.get('/my-orders', isAuth, fetchMyOrders);
orderRouter.get('/all-orders', isAuth, authorizedRoles('Admin'), fetchAllOrders);
orderRouter.put('/update-orders/:orderId', isAuth, authorizedRoles('Admin'), updateOrderStatus);
orderRouter.delete('/delete-orders/:orderId', isAuth, authorizedRoles('Admin'), deleteOrder);

export default orderRouter;