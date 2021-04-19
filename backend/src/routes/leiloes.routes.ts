import 'reflect-metadata';

import { Router } from 'express';

const leiloesRouter = Router();

leiloesRouter.get('/', async (request, response) => {
    return response.json({
        "status": true,
        "totalItem": 20,
        "totalPage": 2,
        "pageSize": "10",
        "currentPage": "1",
        "data": [
          {
            "id": 18,
            "title": "Bebinca",
            "img": "../tmp/foto1.jpeg",
            "category": "Desserts",
            "status": "PROCESSED",
            "statusColor": "secondary",
            "description": "Homemade cheesecake with fresh berries and mint",
            "sales": 574,
            "stock": 16,
            "date": "01.04.2021"
          },
          {
            "id": 8,
            "title": "Cheesecake",
            "img": "../tmp/foto1.jpeg",
            "category": "Cakes",
            "status": "ON HOLD",
            "statusColor": "primary",
            "description": "Delicious vegan chocolate cake",
            "sales": 887,
            "stock": 21,
            "date": "06.04.2021"
          },
          {
            "id": 3,
            "title": "Chocolate Cake",
            "img": "../tmp/foto1.jpeg",
            "category": "Cakes",
            "status": "PROCESSED",
            "statusColor": "secondary",
            "description": "Homemade cheesecake with fresh berries and mint",
            "sales": 1080,
            "stock": 57,
            "date": "02.04.2021"
          },
          {
            "id": 19,
            "title": "Cremeschnitte",
            "img": "../tmp/foto1.jpeg",
            "category": "Desserts",
            "status": "ON HOLD",
            "statusColor": "primary",
            "description": "Cheesecake with chocolate cookies and Cream biscuits",
            "sales": 562,
            "stock": 18,
            "date": "31.03.2021"
          },
          {
            "id": 2,
            "title": "Fat Rascal",
            "img": "../tmp/foto1.jpeg",
            "category": "Cupcakes",
            "status": "PROCESSED",
            "statusColor": "secondary",
            "description": "Cheesecake with chocolate cookies and Cream biscuits",
            "sales": 1240,
            "stock": 48,
            "date": "05.04.2021"
          },
        ]
    });
});

export default leiloesRouter;