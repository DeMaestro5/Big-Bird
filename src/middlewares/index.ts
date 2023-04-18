import express from 'express';
import {get, merge} from 'lodash';
import { SetExpressionOperator } from 'mongoose';
import { nextTick } from 'process';

import { getUserBySessionToken } from '../DB/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown;
    if (currentUserId !== undefined) {
      const userIdString = currentUserId as string;
    } else {
      return undefined
    };

    if(!currentUserId) {
      return res.sendStatus(403)
    }
    if (currentUserId.toString() !== id){
      return res.sendStatus(403);
    }
    next();
  } catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const sessionToken = req.cookies['BIG-BIRD-AUTH'];

      if(!sessionToken) {
        console.log('no session token')
        return res.sendStatus(403);
      }

      const existingUser = await getUserBySessionToken(sessionToken);

      if(!existingUser) {
        console.log('no existing user token')
        return res.sendStatus(403);
      }

      merge(req, {identity: existingUser});

      return next()
    } catch(error) {
    console.log(error);
    return res.sendStatus(400);
    }
}