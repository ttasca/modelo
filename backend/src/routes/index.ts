import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import leiloesRouter from './leiloes.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter); // Agendamentos
routes.use('/appointments', appointmentsRouter); // Agendamentos
routes.use('/users', usersRouter); // Usuários
routes.use('/leiloes', leiloesRouter); // lista Generica para testes do leiloes web

export default routes;