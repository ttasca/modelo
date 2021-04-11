import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter); // Agendamentos
routes.use('/appointments', appointmentsRouter); // Agendamentos
routes.use('/users', usersRouter); // Usuários

export default routes;