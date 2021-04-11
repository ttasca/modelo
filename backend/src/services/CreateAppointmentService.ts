import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; 

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{
   
    public async execute({date, provider_id}: Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const  findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
        console.log(findAppointmentInSameDate);
        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked.');
        }

        const appointment = appointmentsRepository.create({provider_id, date: appointmentDate});

        await appointmentsRepository.save(appointment);

        return appointment;
    
    }
}

export default CreateAppointmentService;

/* Antes de usar o Typeorm: 
import { startOfHour } from 'date-fns';


import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date, provider}: Request): Appointment{
        const appointmentDate = startOfHour(date);

        const  findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error('this appointment is already booked.');
        }

        const appointment = this.appointmentsRepository.create({provider, date: appointmentDate});

        return appointment;
    
    }
}

export default CreateAppointmentService;

*/