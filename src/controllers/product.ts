import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { deleteProductById, getProductById, getProducts } from '../DB/products';
import { deleteUserById, getUserById, getUsers } from '../DB/users';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try{
        const Product = await getProducts();

        return res.status(StatusCodes.OK).json(Product);

    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;

        const deleteProduct = await deleteProductById(id);
        return res.json(deleteProduct);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);

    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
try {
    console.log(req.params)
    const { id } = req.params
 const {username} = req.body;
 
 if (!username) {
    return res.sendStatus(400);
 }
 const Product = await getProductById(id);
 if (Product) {
    Product.id = id;
  }
 await Product?.save();
 return res.status(200).json(Product).end();

} catch (error) {
    console.log(error);
    return res.sendStatus(400);
}
}