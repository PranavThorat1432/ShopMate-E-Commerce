import express from 'express';
import { authorizedRoles, isAuth } from '../Middlewares/isAuth.js';
import { createProduct, deleteProduct, deleteReview, fetchAllProducts, fetchSingleProduct, postProductReview, updateProduct } from '../Controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/admin/create-product', isAuth, authorizedRoles('Admin'), createProduct);
productRouter.get('/', fetchAllProducts);
productRouter.put('/admin/update-product/:productId', isAuth, authorizedRoles('Admin'), updateProduct);
productRouter.delete('/admin/delete-product/:productId', isAuth, authorizedRoles('Admin'), deleteProduct);
productRouter.get('/single-product/:productId', fetchSingleProduct);
productRouter.put('/post-review/:productId', isAuth, postProductReview);
productRouter.delete('/delete-review/:productId', isAuth, deleteReview);

export default productRouter;