import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(cors()); //Server apenas para requisições atraves do browser. Essa biblioteca evita que sites que não sao confiaveis possam acessar nosso back end. Posso por exemplo falar qual rota do front pode acessar a api tipo http://localhost:3030
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // rota para mostra os arquivos da pasta
app.use(routes);

// FUNÇAO PARA TRATATIVA DE ERROS:
// depois das rotas tratativa de erro das rotas: Criar um midderares para tratar o erro, segue abaixo: 
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    // se o erro é originario da minha classe de erro. Então erro originário da app
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(3333, ()=> {
    console.log('Server started on port 3333.');
}); 