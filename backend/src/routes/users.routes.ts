import { request, response, Router } from 'express';

// upload de arquivos: 
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    //console.log(name);
    //return response.send('hahahaha');
    
    const createUser = new CreateUserService();
    const user = await createUser.execute({
        name,
        email,
        password,
    });

    // delete user.password; // Para não retornar na lista o password do usuário. Segue abaixo a mudança. 
    // Com a atualização do TypeScript, isso se faz necessário para não ficar mostrando erro.
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
    //return response.send();
    
});

usersRouter.patch(
  '/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  async (request, response) =>{
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.json(userWithoutPassword);
    
    //console.log(request.file);
    //return response.json({ok: true});
  }
);

export default usersRouter;