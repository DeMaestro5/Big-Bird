import express from 'express';
import router from '.';

import { deleteProduct, getAllProducts, updateProduct} from '../controllers/product';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/product', isAuthenticated, getAllProducts);
    router.delete('/product/:id',isAuthenticated, isOwner, deleteProduct);
    router.patch('/product/:id', isAuthenticated, isOwner, updateProduct);
}