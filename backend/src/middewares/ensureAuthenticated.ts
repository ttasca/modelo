import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

// interface do token criado pelo usuario para quardar as informaçoes. 
interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
  }

export default function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
    ): void{
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT Token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload; // forancando que o decoded é do tipo de variavek TokenPayload

        //Um Hack:  Tive que adcionar um tipo (ou subistituir) no caso a variavel user no request do express pois não existia.
        // Então crie uma pasta @types com o arquivo express.d.ts adicionando ao TS a variavel ao request para sumir com o erro. 
        // Isso para colocar o ID do usuario no request. 
        request.user = {
            id: sub,
        };

        return next();
    }catch {
        throw new AppError('Invalid JWT token', 401);
    }
    
   
}