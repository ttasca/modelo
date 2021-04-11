import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> { // Uso User pois estou retornando o usuário. Void seria vazio.
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if(user.avatar){

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // caminho
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // traz o status de um arquivo caso ele exista. usei promises para garantir que vou esperar a resposta. Assim posso usar o await. 

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user); // cria ou atualiza um usuário. se tem id atualiza.

        return user;
    }
}

export default UpdateUserAvatarService;