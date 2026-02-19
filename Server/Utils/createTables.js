import { createUserTable } from '../Models/userTable.js';
import { createOrderItemTable } from '../Models/orderItemsTable.js';
import { createOrdersTable } from '../Models/ordersTable.js';
import { createPaymentsTable } from '../Models/paymentsTable.js';
import { createProductReviewsTable } from '../Models/productReviewsTable.js';
import { createProductsTable } from '../Models/productsTable.js';
import { createShippingInfoTable } from '../Models/shippinginfoTable.js';




export const createTables = async () => {
    try {
        await createUserTable();
        await createProductsTable();
        await createOrdersTable();
        await createOrderItemTable();
        await createPaymentsTable();
        await createProductReviewsTable();
        await createShippingInfoTable();

        console.log('All Tables Created Successfully!');

    } catch (error) {
        console.log(`Failed to creating tables: ${error}`);
    } 
};