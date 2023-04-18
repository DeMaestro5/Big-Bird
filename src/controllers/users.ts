import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { deleteUserById, getUserById, getUsers } from '../DB/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();

        return res.status(StatusCodes.OK).json(users);

    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);
        return res.json(deleteUser);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);

    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
try {
    console.log(req.params)
    const { id } = req.params
 const {username} = req.body;
 
 if (!username) {
    return res.sendStatus(400);
 }
 const user = await getUserById(id);
 if (user) {
    user.username = username;
  }
 await user?.save();
 return res.status(200).json(user).end();

} catch (error) {
    console.log(error);
    return res.sendStatus(400);
}
}